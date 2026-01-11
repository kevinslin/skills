# Beads Setup and Troubleshooting

## Quick check

```bash
bd status || echo "bd not installed"
```

## Install (preferred method)

Note: `npm install -g @beads/bd` and `go install` often fail in cloud or restricted
environments. Use the direct download method:

```bash
# Detect platform
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)
[ "$ARCH" = "x86_64" ] && ARCH="amd64"
[ "$ARCH" = "aarch64" ] && ARCH="arm64"

# Get latest version from GitHub
BD_VERSION=$(curl -sI https://github.com/steveyegge/beads/releases/latest | \
  grep -i "^location:" | sed 's/.*tag\///' | tr -d '\r\n')

# Download and install the binary
curl -fsSL -o /tmp/beads.tar.gz \
  "https://github.com/steveyegge/beads/releases/download/${BD_VERSION}/beads_${BD_VERSION#v}_${OS}_${ARCH}.tar.gz"
tar -xzf /tmp/beads.tar.gz -C /tmp
mkdir -p ~/.local/bin
cp /tmp/bd ~/.local/bin/
chmod +x ~/.local/bin/bd
export PATH="$HOME/.local/bin:$PATH"
bd prime
```

For troubleshooting, see https://github.com/steveyegge/beads/releases

## No beads database

```bash
bd init
bd prime
```

## Health check

```bash
bd doctor
bd doctor --fix
```

## Sync branch configuration

- Do not use `main` as the sync branch. Prefer `beads-sync`.

Check and set:

```bash
bd config get sync.branch
bd config set sync.branch beads-sync
bd daemon stop && bd daemon start
```

For new projects, add to `.beads/config.yaml`:

```yaml
sync-branch: 'beads-sync'
```

If you see "fatal: 'main' is already used by worktree":

```bash
rm -rf .git/beads-worktrees .git/worktrees/beads-*
git worktree prune
bd config set sync.branch beads-sync
bd daemon stop && bd daemon start
```

## Git merge driver (per clone)

```bash
git config merge.beads.driver "bd merge %A %O %A %B"
git config merge.beads.name "bd JSONL merge driver"
```

Verify:

```bash
bd doctor | grep "Git Merge Driver"
```

## SQLite WAL error

If you see `failed to enable WAL mode: sqlite3: locking protocol`:

```bash
echo "no-db: true" >> .beads/config.yaml
```
