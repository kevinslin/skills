# Security Guidelines

This reference provides detailed security considerations for common vulnerabilities and secure coding practices.

## OWASP Top 10 Vulnerabilities

### 1. Injection Attacks

**SQL Injection:**
```javascript
// ❌ VULNERABLE
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ SECURE - Use parameterized queries
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

**Command Injection:**
```javascript
// ❌ VULNERABLE
exec(`convert ${userFile} output.pdf`);

// ✅ SECURE - Validate input and use arrays
const allowedFiles = /^[a-zA-Z0-9_-]+\.(jpg|png)$/;
if (!allowedFiles.test(userFile)) throw new Error('Invalid file');
execFile('convert', [userFile, 'output.pdf']);
```

**NoSQL Injection:**
```javascript
// ❌ VULNERABLE
db.users.find({ username: req.body.username });

// ✅ SECURE - Type check and validate
db.users.find({ username: String(req.body.username) });
```

### 2. Cross-Site Scripting (XSS)

**Reflected XSS:**
```javascript
// ❌ VULNERABLE
res.send(`<h1>Search results for: ${req.query.search}</h1>`);

// ✅ SECURE - Escape HTML
const escapeHtml = (text) => text
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');
res.send(`<h1>Search results for: ${escapeHtml(req.query.search)}</h1>`);
```

**DOM-based XSS:**
```javascript
// ❌ VULNERABLE
element.innerHTML = userContent;

// ✅ SECURE - Use textContent or sanitize
element.textContent = userContent;
// Or use a sanitization library like DOMPurify
element.innerHTML = DOMPurify.sanitize(userContent);
```

### 3. Path Traversal

```javascript
// ❌ VULNERABLE
const filePath = path.join(__dirname, 'uploads', req.params.filename);

// ✅ SECURE - Validate and normalize paths
const filename = path.basename(req.params.filename);
const filePath = path.join(__dirname, 'uploads', filename);
if (!filePath.startsWith(path.join(__dirname, 'uploads'))) {
  throw new Error('Invalid path');
}
```

### 4. Insecure Deserialization

```javascript
// ❌ VULNERABLE
const obj = eval(userInput);

// ✅ SECURE - Use JSON.parse and validate
try {
  const obj = JSON.parse(userInput);
  // Validate structure and types
  if (!isValidObject(obj)) throw new Error('Invalid data');
} catch (e) {
  // Handle error
}
```

### 5. Authentication & Session Management

**Password Storage:**
```javascript
// ❌ VULNERABLE - Plain text or weak hashing
user.password = md5(password);

// ✅ SECURE - Use bcrypt/argon2
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 12); // 12+ rounds
```

**Session Management:**
```javascript
// ✅ SECURE session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // Strong random secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,      // HTTPS only
    httpOnly: true,    // No JavaScript access
    sameSite: 'strict', // CSRF protection
    maxAge: 3600000    // 1 hour timeout
  }
}));
```

### 6. Sensitive Data Exposure

```javascript
// ❌ VULNERABLE - Exposing sensitive data
res.json({ user: userFromDb }); // May contain password hash, etc.

// ✅ SECURE - Filter sensitive fields
const sanitizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email
  // Omit password, salt, tokens, etc.
});
res.json({ user: sanitizeUser(userFromDb) });
```

**Environment Variables:**
```javascript
// ❌ VULNERABLE - Hardcoded secrets
const apiKey = 'sk_live_abc123...';

// ✅ SECURE - Use environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error('API_KEY not configured');
```

### 7. Cross-Site Request Forgery (CSRF)

```javascript
// ✅ SECURE - Use CSRF tokens
const csrf = require('csurf');
app.use(csrf({ cookie: true }));

app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/action', (req, res) => {
  // Token automatically validated by middleware
  // Process request...
});
```

### 8. Server-Side Request Forgery (SSRF)

```javascript
// ❌ VULNERABLE - Unvalidated URL fetch
const response = await fetch(req.body.url);

// ✅ SECURE - Whitelist allowed domains
const allowedDomains = ['api.example.com', 'cdn.example.com'];
const url = new URL(req.body.url);
if (!allowedDomains.includes(url.hostname)) {
  throw new Error('Domain not allowed');
}
// Also block internal IPs
const response = await fetch(url);
```

## Input Validation Best Practices

### Validation Principles
1. **Whitelist, don't blacklist** - Define what's allowed, not what's forbidden
2. **Validate on the server** - Never trust client-side validation alone
3. **Validate type, length, format, and range**
4. **Fail securely** - Reject invalid input, don't try to fix it

### Example Validation
```javascript
const validateUsername = (username) => {
  // Type check
  if (typeof username !== 'string') return false;

  // Length check
  if (username.length < 3 || username.length > 20) return false;

  // Format check (alphanumeric and underscore only)
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return false;

  return true;
};
```

## Authentication Best Practices

1. **Password Requirements:**
   - Minimum 8 characters (12+ recommended)
   - Support passphrases and long passwords
   - Don't impose maximum length limits
   - Check against common password lists

2. **Multi-Factor Authentication (MFA):**
   - Implement MFA for sensitive operations
   - Support TOTP (Time-based One-Time Password)
   - Provide backup codes

3. **Rate Limiting:**
```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again later'
});

app.post('/login', loginLimiter, (req, res) => {
  // Login logic...
});
```

4. **Account Lockout:**
   - Lock accounts after repeated failed attempts
   - Implement temporary lockout (15-30 minutes)
   - Log and alert on suspicious activity

## Authorization Best Practices

1. **Principle of Least Privilege:**
   - Grant minimum necessary permissions
   - Default to deny access
   - Require explicit permission grants

2. **Access Control Checks:**
```javascript
// ✅ Check authorization for every protected operation
const deletePost = async (postId, userId) => {
  const post = await db.posts.findById(postId);

  // Verify ownership
  if (post.authorId !== userId) {
    throw new Error('Unauthorized');
  }

  await db.posts.delete(postId);
};
```

3. **Avoid Insecure Direct Object References (IDOR):**
```javascript
// ❌ VULNERABLE
app.get('/user/:id', (req, res) => {
  const user = db.users.findById(req.params.id);
  res.json(user);
});

// ✅ SECURE - Check authorization
app.get('/user/:id', authenticate, (req, res) => {
  if (req.params.id !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const user = db.users.findById(req.params.id);
  res.json(sanitizeUser(user));
});
```

## Cryptography Best Practices

1. **Use established libraries** - Don't roll your own crypto
2. **Use strong algorithms:**
   - AES-256 for symmetric encryption
   - RSA-2048+ or ECC for asymmetric encryption
   - SHA-256+ for hashing (not for passwords)
   - bcrypt/argon2 for password hashing

3. **Key Management:**
   - Generate cryptographically secure random keys
   - Rotate keys regularly
   - Store keys securely (HSM, key management service)
   - Never commit keys to version control

4. **TLS/SSL:**
   - Use TLS 1.2 or higher
   - Use strong cipher suites
   - Implement HSTS (HTTP Strict Transport Security)
   - Use certificate pinning for mobile apps

## Logging & Monitoring

**What to Log:**
- Authentication attempts (success and failure)
- Authorization failures
- Input validation failures
- Security-relevant configuration changes
- High-value transactions

**What NOT to Log:**
- Passwords or password hashes
- Session tokens
- Credit card numbers
- Personal identification numbers
- Encryption keys

**Log Securely:**
```javascript
// ❌ Don't log sensitive data
logger.info(`Login attempt: ${username} with password ${password}`);

// ✅ Log relevant, non-sensitive information
logger.info(`Login attempt for user: ${username}`, {
  ip: req.ip,
  userAgent: req.headers['user-agent'],
  timestamp: new Date().toISOString()
});
```

## Security Headers

Implement security headers to protect against common attacks:

```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));
```

## Dependency Security

1. **Keep dependencies updated:**
```bash
npm audit
npm audit fix
```

2. **Review dependencies before adding:**
   - Check for known vulnerabilities
   - Verify package authenticity
   - Review package permissions and scope
   - Consider alternatives with better security track records

3. **Use lock files:**
   - Commit package-lock.json / yarn.lock
   - Ensures reproducible builds
   - Prevents supply chain attacks

4. **Monitor for vulnerabilities:**
   - Use GitHub Dependabot or Snyk
   - Set up alerts for security advisories
   - Have a process for patching vulnerabilities

## Quick Security Checklist

Before deploying code, verify:

- [ ] All user inputs are validated and sanitized
- [ ] No SQL injection, XSS, or command injection vulnerabilities
- [ ] Sensitive data is not exposed in responses or logs
- [ ] Authentication and authorization are properly implemented
- [ ] Passwords are hashed with bcrypt/argon2 (12+ rounds)
- [ ] Session management is secure (httpOnly, secure, sameSite)
- [ ] CSRF protection is enabled for state-changing operations
- [ ] Security headers are configured (CSP, HSTS, X-Frame-Options)
- [ ] Rate limiting is implemented for authentication endpoints
- [ ] Dependencies are up to date with no known vulnerabilities
- [ ] Secrets are stored in environment variables, not code
- [ ] TLS/HTTPS is enforced
- [ ] Error messages don't reveal sensitive information
- [ ] Logging doesn't include sensitive data
- [ ] File uploads are validated and stored securely
