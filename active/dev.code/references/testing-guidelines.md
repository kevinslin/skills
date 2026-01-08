# Testing Guidelines

This reference provides comprehensive guidance on writing effective tests and testing strategies.

## Testing Philosophy

### Prefer Integration Tests

**Integration tests should be your primary testing strategy.** Integration tests:
- Test the full application as a real user would interact with it
- Catch issues that unit tests might miss (import problems, config issues, integration bugs)
- Provide confidence that the actual user experience works correctly
- Are easier to maintain as the codebase evolves
- Test behavior, not implementation details

**Unit tests should be used sparingly** - only for complex logic that needs isolated testing or when integration tests are impractical.

### Why Test?
1. **Confidence** - Know your code works as intended
2. **Documentation** - Tests describe how code should behave
3. **Regression Prevention** - Catch bugs when refactoring
4. **Design Feedback** - Hard-to-test code often indicates poor design
5. **Faster Development** - Find bugs early when they're cheaper to fix

### Testing Principles
1. **Test behavior, not implementation** - Tests should survive refactoring
2. **Test as users would interact** - Run the actual application/CLI, don't import functions directly
3. **Write tests that fail for the right reasons** - Clear, specific failures
4. **Keep tests simple and readable** - Tests are documentation
5. **Make tests deterministic** - No flaky tests
6. **Mock sparingly** - Only when necessary for isolation

## Types of Tests

### Integration Tests (Primary Strategy)
Test how the full application works by running it as users would.

**Characteristics:**
- Test the complete application flow
- Run actual processes/commands, don't import functions
- May involve databases, APIs, file system
- Primary type in your test suite
- Reasonably fast (seconds) with proper setup

**For CLI applications:**
```javascript
describe('init command', () => {
  let testDir;

  beforeEach(async () => {
    // Create temporary test directory
    testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-'));
  });

  afterEach(async () => {
    // Clean up test directory
    await fs.remove(testDir);
  });

  it('creates configuration file', async () => {
    // Run the actual CLI process
    const result = await execCli(['init', '--preset', 'default'], {
      cwd: testDir,
    });

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Initialization complete');

    // Verify file system changes
    const configPath = path.join(testDir, 'config.json');
    expect(await fs.pathExists(configPath)).toBe(true);

    const config = await fs.readJson(configPath);
    expect(config.preset).toBe('default');
  });
});
```

**For web applications:**
```javascript
describe('User Registration', () => {
  it('creates user and sends welcome email', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'SecurePass123'
    };

    // Test through the API/service layer, not individual functions
    const response = await request(app)
      .post('/api/register')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe(userData.email);

    // Verify side effects
    const user = await db.users.findByEmail(userData.email);
    expect(user).toBeDefined();

    const emails = await emailQueue.getSent();
    expect(emails).toContainEqual(
      expect.objectContaining({
        to: userData.email,
        subject: 'Welcome!'
      })
    );
  });
});
```

### Unit Tests (Use Sparingly)
Test individual functions or methods in isolation.

**When to use unit tests:**
- Complex algorithms or business logic that's difficult to test through integration tests
- Pure functions with no dependencies
- Utilities that are called from many places
- Performance-critical code that needs fast test feedback

**When NOT to use unit tests:**
- Simple functions that are better tested through integration tests
- Code that's tightly coupled to external dependencies
- Implementation details that might change during refactoring

**Example:**
```javascript
// Unit test for complex calculation logic
describe('calculateTax', () => {
  it('calculates tax for single tax bracket', () => {
    expect(calculateTax(50000, 'single')).toBe(6617.50);
  });

  it('handles multiple tax brackets correctly', () => {
    expect(calculateTax(200000, 'married')).toBe(32089.50);
  });

  it('applies standard deduction', () => {
    expect(calculateTax(15000, 'single')).toBe(0);
  });
});
```

### End-to-End (E2E) Tests
Test complete user workflows through the UI.

**Characteristics:**
- Slowest (seconds to minutes)
- Test entire system from user perspective
- Most brittle but highest confidence
- Fewest in test suite

**Example:**
```javascript
describe('E2E: User Login', () => {
  it('allows user to login and see dashboard', async () => {
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'user@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    await expect(page.locator('h1')).toHaveText('Dashboard');
  });
});
```

## TypeScript/JavaScript: Use Jest

For TypeScript and JavaScript projects, **use Jest** as the testing framework.

### Jest Setup for TypeScript

**Install dependencies:**
```bash
npm install --save-dev jest @types/jest ts-jest @jest/globals
```

**jest.config.cjs** (for ESM projects):
```javascript
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testTimeout: 10000, // 10 seconds for integration tests
};
```

**package.json scripts:**
```json
{
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "test:watch": "npm test -- --watch",
    "test:coverage": "npm test -- --coverage"
  }
}
```

### Test File Structure

Organize tests to match the integration-first philosophy:

```
project/
├── src/
│   ├── commands/
│   │   ├── init.ts
│   │   └── sync.ts
│   └── utils/
│       └── calculator.ts
└── tests/
    ├── integration/          # Integration tests (primary)
    │   ├── init.test.ts
    │   └── sync.test.ts
    ├── unit/                 # Unit tests (sparingly)
    │   └── calculator.test.ts
    └── helpers/              # Test utilities (optional)
        ├── setup.ts          # Test setup helpers
        └── cli.ts            # CLI execution helpers
```

### Integration Test Template (TypeScript)

```typescript
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('my command', () => {
  let testDir: string;

  beforeEach(async () => {
    // Create temporary test directory
    testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-'));
  });

  afterEach(async () => {
    // Clean up test directory
    await fs.remove(testDir);
  });

  it('should process files correctly', async () => {
    // Arrange - Set up test files
    const inputFile = path.join(testDir, 'input.txt');
    await fs.writeFile(inputFile, 'test content');

    // Act - Run the actual CLI/application process
    const result = await execCli(['my-command', '--flag'], {
      cwd: testDir,
    });

    // Assert - Check exit code and outputs
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Success');

    // Assert - Verify file system changes
    const outputPath = path.join(testDir, 'output.txt');
    expect(await fs.pathExists(outputPath)).toBe(true);

    const content = await fs.readFile(outputPath, 'utf-8');
    expect(content).toContain('processed');
  });

  it('should handle errors gracefully', async () => {
    // Test without required input
    const result = await execCli(['my-command'], {
      cwd: testDir,
    });

    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain('Error');
  });
});
```

### Test Helper: CLI Execution (Optional)

Create a helper to execute the CLI as a real process:

**tests/helpers/cli.ts:**
```typescript
import { spawn } from 'child_process';
import path from 'path';

export interface CliResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export async function execCli(
  args: string[],
  options: { cwd: string }
): Promise<CliResult> {
  return new Promise((resolve) => {
    // Path to your compiled CLI entry point
    const cliPath = path.join(__dirname, '../../dist/cli.js');

    const child = spawn('node', [cliPath, ...args], {
      cwd: options.cwd,
      env: { ...process.env, NODE_ENV: 'test' },
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      resolve({
        exitCode: code ?? 1,
        stdout,
        stderr,
      });
    });
  });
}
```

### Common Integration Test Patterns

**Testing configuration files:**
```typescript
it('creates config with correct preset', async () => {
  const testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-'));

  await execCli(['init', '--preset', 'default'], {
    cwd: testDir,
  });

  const config = await fs.readJson(
    path.join(testDir, 'config.json')
  );
  expect(config.preset).toBe('default');

  await fs.remove(testDir);
});
```

**Testing file generation:**
```typescript
it('generates output files', async () => {
  const testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-'));

  await execCli(['build'], { cwd: testDir });

  const files = await fs.readdir(path.join(testDir, 'dist'));
  expect(files).toContain('index.js');
  expect(files).toContain('index.d.ts');

  await fs.remove(testDir);
});
```

**Testing flags:**
```typescript
it('respects --dry-run flag', async () => {
  const testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-'));

  const result = await execCli(['deploy', '--dry-run'], {
    cwd: testDir,
  });

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain('Dry run');

  // Verify nothing was actually deployed
  const deployLog = path.join(testDir, '.deploy.log');
  expect(await fs.pathExists(deployLog)).toBe(false);

  await fs.remove(testDir);
});
```

**Testing error conditions:**
```typescript
it('fails with helpful error for missing config', async () => {
  const testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-'));

  const result = await execCli(['build'], {
    cwd: testDir,
  });

  expect(result.exitCode).toBe(1);
  expect(result.stderr).toContain('config.json not found');
  expect(result.stderr).toContain('Run "init" first');

  await fs.remove(testDir);
});
```

### Handling ESM Modules in Jest

Some dependencies (chalk, ora, etc.) use ESM-only syntax. If you encounter:
```
SyntaxError: Cannot use import statement outside a module
```

**Solutions:**

1. **Mock the module** (preferred for unit tests):
```typescript
jest.unstable_mockModule('../../src/utils/logger.js', () => ({
  info: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
}));
```

2. **Use integration tests instead** - they run compiled code, avoiding ESM issues

3. **Skip the test** if redundant with integration tests:
```typescript
it.skip('test description', async () => {
  // Test code
});
```

### Running Jest Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- init.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="creates config"

# Watch mode (re-run on changes)
npm run test:watch

# Run with coverage
npm run test:coverage

# Update snapshots
npm test -- -u

# Run with verbose output
npm test -- --verbose
```

### Debugging Integration Tests

**Inspect test directory state:**
```typescript
it('should do something', async () => {
  const testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-'));
  try {
    await execCli(['my-command'], { cwd: testDir });

    // Debug: see what files exist
    console.log('Files:', await fs.readdir(testDir));

    // Debug: read file contents
    const config = await fs.readFile(
      path.join(testDir, 'config.json'),
      'utf-8'
    );
    console.log('Config:', config);
  } finally {
    await fs.remove(testDir);
  }
});
```

**Keep test directory for manual inspection:**
```typescript
const testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-'));
console.log('Test directory at:', testDir);
await execCli(['my-command'], { cwd: testDir });
// Comment out cleanup to inspect manually:
// await fs.remove(testDir);
```

## Test Structure

### AAA Pattern (Arrange, Act, Assert)

```javascript
test('user can update profile', async () => {
  // Arrange - Set up test data and conditions
  const user = await createTestUser({ name: 'John' });

  // Act - Perform the action being tested
  const updatedUser = await userService.updateProfile(user.id, {
    name: 'Jane'
  });

  // Assert - Verify the expected outcome
  expect(updatedUser.name).toBe('Jane');
});
```

### Given-When-Then (BDD Style)

```javascript
describe('Shopping Cart', () => {
  describe('when adding an item', () => {
    it('increases the cart count', () => {
      // Given
      const cart = new ShoppingCart();
      const item = { id: 1, name: 'Book', price: 10 };

      // When
      cart.addItem(item);

      // Then
      expect(cart.itemCount()).toBe(1);
    });
  });
});
```

## What to Test

### Happy Path
Test the expected, successful flow:
```javascript
test('successful user registration', async () => {
  const result = await register({
    email: 'user@example.com',
    password: 'ValidPass123'
  });

  expect(result.success).toBe(true);
  expect(result.user.email).toBe('user@example.com');
});
```

### Edge Cases
Test boundary conditions:
```javascript
test('handles empty input', () => {
  expect(calculateTotal([])).toBe(0);
});

test('handles single item', () => {
  expect(calculateTotal([{ price: 5, quantity: 1 }])).toBe(5);
});

test('handles large quantities', () => {
  expect(calculateTotal([{ price: 1, quantity: 1000000 }])).toBe(1000000);
});
```

### Error Cases
Test how code handles failures:
```javascript
test('throws error for invalid email', async () => {
  await expect(
    register({ email: 'invalid', password: 'pass123' })
  ).rejects.toThrow('Invalid email format');
});

test('handles network timeout', async () => {
  mockAPI.get('/users').timeout();

  await expect(fetchUsers()).rejects.toThrow('Request timeout');
});
```

### Error Messages
Test that error messages are helpful:
```javascript
test('provides helpful error for missing field', async () => {
  const result = await register({ email: 'user@example.com' });

  expect(result.error).toBe('Password is required');
});
```

## Testing Best Practices

### 1. Test Names Should Be Descriptive

```javascript
// ❌ Poor test name
test('test1', () => { /* ... */ });

// ❌ Vague test name
test('it works', () => { /* ... */ });

// ✅ Clear, descriptive test name
test('returns 400 when email is missing from registration request', () => {
  /* ... */
});
```

### 2. One Assertion Per Test (Generally)

```javascript
// ❌ Multiple unrelated assertions
test('user operations', () => {
  expect(user.create()).toBeTruthy();
  expect(user.delete()).toBeTruthy();
  expect(user.list()).toHaveLength(0);
});

// ✅ Focused tests
test('creates user successfully', () => {
  expect(user.create()).toBeTruthy();
});

test('deletes user successfully', () => {
  expect(user.delete()).toBeTruthy();
});

test('lists users', () => {
  expect(user.list()).toHaveLength(0);
});
```

### 3. Don't Test Implementation Details

```javascript
// ❌ Testing implementation (brittle)
test('calls internal helper method', () => {
  const spy = jest.spyOn(calculator, '_add');
  calculator.calculate(2, 3);
  expect(spy).toHaveBeenCalled();
});

// ✅ Testing behavior (resilient)
test('calculates sum correctly', () => {
  expect(calculator.calculate(2, 3)).toBe(5);
});
```

### 4. Use Test Fixtures and Factories

```javascript
// Test factory
function createTestUser(overrides = {}) {
  return {
    id: Math.random(),
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    ...overrides
  };
}

// Usage
test('updates user name', () => {
  const user = createTestUser({ name: 'Old Name' });
  const updated = updateUser(user.id, { name: 'New Name' });
  expect(updated.name).toBe('New Name');
});
```

### 5. Clean Up After Tests

```javascript
describe('Database tests', () => {
  beforeEach(async () => {
    await db.migrate.latest();
  });

  afterEach(async () => {
    await db.migrate.rollback();
  });

  test('creates record', async () => {
    const record = await db.records.create({ name: 'Test' });
    expect(record.name).toBe('Test');
  });
});
```

### 6. Mock External Dependencies

```javascript
// Mock HTTP requests
jest.mock('axios');

test('fetches user data', async () => {
  axios.get.mockResolvedValue({
    data: { id: 1, name: 'John' }
  });

  const user = await fetchUser(1);

  expect(user.name).toBe('John');
  expect(axios.get).toHaveBeenCalledWith('/api/users/1');
});
```

### 7. Test Async Code Properly

```javascript
// ✅ Using async/await
test('fetches data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});

// ✅ Using promises
test('fetches data', () => {
  return fetchData().then(data => {
    expect(data).toBeDefined();
  });
});

// ✅ Using done callback (older style)
test('fetches data', (done) => {
  fetchData().then(data => {
    expect(data).toBeDefined();
    done();
  });
});
```

## Testing Strategies

### Test-Driven Development (TDD)

1. **Red** - Write a failing test
2. **Green** - Write minimal code to pass
3. **Refactor** - Improve code while keeping tests green

```javascript
// 1. RED - Write failing test
test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5); // Function doesn't exist yet
});

// 2. GREEN - Make it pass
function add(a, b) {
  return a + b;
}

// 3. REFACTOR - Improve if needed
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  return a + b;
}
```

### Test Coverage

**What to track:**
- Line coverage - % of lines executed
- Branch coverage - % of code branches tested
- Function coverage - % of functions called

**Coverage guidelines:**
- Integration tests naturally provide good coverage
- Aim for 80%+ coverage through integration tests
- 100% coverage doesn't guarantee bug-free code
- Focus on testing user-visible behavior and critical paths
- Don't write unit tests just to increase coverage
- Add unit tests only for complex logic not covered by integration tests

**Check coverage:**
```bash
npm test -- --coverage
```

### Mutation Testing

Tests your tests by introducing bugs to see if tests catch them.

```bash
npm install --save-dev stryker
npx stryker run
```

## Common Testing Patterns

### Testing Exceptions

```javascript
test('throws error for invalid input', () => {
  expect(() => divide(10, 0)).toThrow('Division by zero');
});

test('async function throws', async () => {
  await expect(fetchUser(-1)).rejects.toThrow('Invalid user ID');
});
```

### Testing with Timers

```javascript
jest.useFakeTimers();

test('executes callback after delay', () => {
  const callback = jest.fn();

  setTimeout(callback, 1000);

  jest.advanceTimersByTime(1000);

  expect(callback).toHaveBeenCalled();
});
```

### Testing with Dates

```javascript
test('creates timestamp', () => {
  const mockDate = new Date('2024-01-01');
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  const result = createRecord();

  expect(result.createdAt).toBe(mockDate);
});
```

### Snapshot Testing

**For Jest tests with deterministic output, prefer to also add snapshot tests.** Snapshots provide excellent regression protection and are easy to maintain.

Snapshots capture the entire output of a test and save it to a file. Future test runs compare against the saved snapshot to detect unexpected changes.

**Example for CLI output:**
```javascript
test('init command creates correct config', async () => {
  const result = await execCli(['init', '--preset', 'default'], {
    cwd: testDir,
  });

  expect(result.exitCode).toBe(0);

  // Also use snapshot for deterministic output
  expect(result.stdout).toMatchSnapshot();

  const config = await fs.readJson(path.join(testDir, 'config.json'));
  expect(config).toMatchSnapshot();
});
```

**Example for generated file content:**
```javascript
test('build generates correct output files', async () => {
  await execCli(['build'], { cwd: testDir });

  const outputFile = await fs.readFile(
    path.join(testDir, 'dist', 'index.js'),
    'utf-8'
  );

  // Snapshot the entire file content for deterministic builds
  expect(outputFile).toMatchSnapshot();
});
```

**Example for JSON/data structures:**
```javascript
test('formats user data correctly', () => {
  const formatted = formatUserData(testUser);

  // Use specific assertions for key properties
  expect(formatted.id).toBe(123);

  // Also snapshot the entire structure
  expect(formatted).toMatchSnapshot();
});
```

**When to use snapshots:**
- **Deterministic output** - Output is the same every run (no timestamps, random IDs, etc.)
- **CLI stdout/stderr** - Command line output that should be consistent
- **Generated file content** - Files produced by build/transform processes
- **Configuration files** - JSON, YAML, or other config output
- **JSON/XML API responses** - Structured data output
- **React/Vue component rendering** - UI component output
- **Error messages** - Consistent error output format

**When NOT to use snapshots:**
- **Non-deterministic output** - Contains timestamps, random values, absolute paths
- **Snapshots are too large** - Difficult to review in pull requests (>100 lines)
- **Output changes frequently** - Requires constant snapshot updates
- **External API responses** - Use mocks with deterministic data instead

**Updating snapshots when making changes:**

When you modify code that affects test output:
1. **Review the snapshot diff** - Ensure changes are expected
2. **Update snapshots** - Run `npm test -- -u` to update all snapshots
3. **Commit updated snapshots** - Include snapshot changes in your commit
4. **Review in PR** - Snapshot diffs should be reviewed like code changes

```bash
# Update all snapshots
npm test -- -u

# Update snapshots for specific test file
npm test -- -u init.test.ts

# Review snapshot changes before committing
git diff tests/**/__snapshots__/
```

**Best practices:**
- **Combine with specific assertions** - Use both snapshots and targeted assertions
- **Keep snapshots readable** - If too large, consider testing smaller pieces
- **Review snapshot diffs carefully** - Don't blindly approve snapshot updates
- **Use inline snapshots for small values** - `expect(value).toMatchInlineSnapshot()`
- **Clean deterministic data** - Strip timestamps/random values before snapshotting

**Example of cleaning non-deterministic data:**
```javascript
test('creates log file with correct format', async () => {
  await execCli(['run'], { cwd: testDir });

  const logContent = await fs.readFile(
    path.join(testDir, 'app.log'),
    'utf-8'
  );

  // Remove timestamps before snapshotting
  const normalized = logContent.replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g, 'TIMESTAMP');
  expect(normalized).toMatchSnapshot();
});
```

## Testing Anti-Patterns

### 1. Testing Private Methods

```javascript
// ❌ Don't test private methods directly
test('internal calculation method', () => {
  expect(calculator._internalAdd(2, 3)).toBe(5);
});

// ✅ Test through public interface
test('calculator adds numbers', () => {
  expect(calculator.calculate(2, 3)).toBe(5);
});
```

### 2. Excessive Mocking

```javascript
// ❌ Mocking everything (you're just testing mocks)
test('process order', () => {
  const order = { id: 1 };
  const mockValidate = jest.fn().mockReturnValue(true);
  const mockCharge = jest.fn().mockReturnValue(true);
  const mockShip = jest.fn().mockReturnValue(true);

  processOrder(order, mockValidate, mockCharge, mockShip);

  expect(mockValidate).toHaveBeenCalled();
  expect(mockCharge).toHaveBeenCalled();
  expect(mockShip).toHaveBeenCalled();
});

// ✅ Mock only external dependencies
test('process order', async () => {
  mockPaymentAPI.charge.mockResolvedValue({ success: true });

  const result = await processOrder({ id: 1 });

  expect(result.status).toBe('completed');
});
```

### 3. Testing Framework Code

```javascript
// ❌ Don't test that libraries work
test('express app has get method', () => {
  expect(typeof app.get).toBe('function');
});

// ✅ Test your code that uses the library
test('GET /users returns user list', async () => {
  const response = await request(app).get('/users');
  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(5);
});
```

### 4. Flaky Tests

```javascript
// ❌ Flaky test (depends on timing)
test('updates after delay', (done) => {
  updateValue();
  setTimeout(() => {
    expect(getValue()).toBe('updated'); // Might fail randomly
    done();
  }, 100);
});

// ✅ Deterministic test
test('updates after delay', async () => {
  jest.useFakeTimers();
  updateValue();
  jest.advanceTimersByTime(100);
  expect(getValue()).toBe('updated');
});
```

## Testing Tools

### JavaScript/TypeScript
- **Jest** - **Recommended** - Full-featured testing framework with excellent TypeScript support
- **Vitest** - Alternative for Vite-based projects
- **Mocha + Chai** - Alternative flexible testing library
- **Playwright/Cypress** - E2E testing for web applications
- **Testing Library** - User-centric component testing for React/Vue

### Python
- **pytest** - Popular testing framework
- **unittest** - Built-in testing module
- **pytest-cov** - Coverage plugin
- **hypothesis** - Property-based testing

### Other Languages
- **Go** - `testing` package (built-in)
- **Rust** - `cargo test` (built-in)
- **Java** - JUnit, TestNG
- **C#** - xUnit, NUnit, MSTest

## Test Execution

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test user.test.js

# Run tests matching pattern
npm test --testNamePattern="user registration"

# Watch mode (re-run on changes)
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run only changed files
npm test -- --onlyChanged
```

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
```

## Quick Testing Checklist

When writing tests:

- [ ] **Integration test written first** - Tests the full application/CLI
- [ ] Test describes what is being tested clearly from user perspective
- [ ] Test runs the actual application, not individual functions
- [ ] Happy path is tested (successful user flow)
- [ ] Edge cases are covered
- [ ] Error cases handled gracefully with helpful messages
- [ ] Test is deterministic (not flaky)
- [ ] Test setup/cleanup happens properly (beforeEach/afterEach)
- [ ] File system changes are verified
- [ ] Exit codes and output messages are checked
- [ ] Assertions are specific and meaningful
- [ ] Test would fail if the user-facing behavior is broken
- [ ] **Snapshot tests added for deterministic output** (Jest)
- [ ] Unit tests added only for complex logic (if needed)

When changing code:

- [ ] Integration tests added for new user-facing behavior
- [ ] Existing integration tests still pass
- [ ] Modified tests reflect changed behavior
- [ ] Removed tests for removed functionality
- [ ] Test coverage remains high (primarily through integration tests)
- [ ] **Snapshots reviewed and updated if output changed** (`npm test -- -u`)
- [ ] **Snapshot diffs reviewed to ensure changes are expected**

**For TypeScript/JavaScript:**
- [ ] Using Jest as the testing framework
- [ ] Tests organized in tests/integration/ and tests/unit/ (sparingly)
- [ ] Temporary test directories created and cleaned up properly
- [ ] ESM modules handled properly (mock or use integration tests)
- [ ] Snapshot tests added for deterministic CLI output, configs, and generated files
