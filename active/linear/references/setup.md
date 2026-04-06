# One-Time Setup

Follow this only when `command -v linear-cli` fails.

## Install

Prefer the upstream release binary when Cargo is unavailable.

### macOS or Linux via release asset

1. Find the latest release asset for the current platform at:
   - `https://github.com/Finesssee/linear-cli/releases/latest`
2. Download the matching archive.
3. Install the extracted binary into `~/.local/bin`.
4. Verify with:

```bash
command -v linear-cli
linear-cli --version
linear-cli --help
```

Example for macOS Apple Silicon:

```bash
mkdir -p "$HOME/.local/bin"
curl -fsSL \
  https://github.com/Finesssee/linear-cli/releases/latest/download/linear-cli-aarch64-apple-darwin.tar.gz \
  -o /tmp/linear-cli.tar.gz
tar -xzf /tmp/linear-cli.tar.gz -C /tmp
install -m 0755 /tmp/linear-cli "$HOME/.local/bin/linear-cli"
```

### Cargo-based install

Use one of these when Cargo is already available:

```bash
cargo binstall linear-cli
```

or

```bash
cargo install linear-cli
```

## Authenticate

After install, configure auth once:

```bash
linear-cli auth login
```

or

```bash
linear-cli auth oauth
```

Then verify connectivity:

```bash
linear-cli doctor --check-api
linear-cli auth status --output json
```

## Notes

- Keep `~/.local/bin` on `PATH` if installing the release binary there.
- Prefer `linear-cli` over older examples that use `linear` as the executable name.
- If the CLI is already installed, do not reinstall unless the user asks to upgrade or repair it.
