---
name: icon-gen
description: Generate project icons with a paired general icon and inline icon asset. Use when the user asks to create or refresh a logo, mascot icon, emoji-like icon, or small inline brand mark for a repo, README, docs, or CLI. Saves outputs into the current project's `assets/` directory and defaults to the `chibi` style.
dependencies:
- imagegen
---

# Icon Gen

## Overview

Generate one primary icon with `imagegen`, then derive a deterministic inline icon by trimming transparent padding. The general icon and inline icon may share the same art style, but the inline icon should be optimized for small text-adjacent usage.

## Workflow

1. Set paths from the current project root:
   - `ROOT_DIR=$(pwd)`
   - `ASSETS_DIR="$ROOT_DIR/assets"`
   - `mkdir -p "$ASSETS_DIR"`
2. Choose the style:
   - Default to `chibi`.
   - Read `references/style-chibi.md` for the default style.
   - For any other style, read `references/style-<style>.md`. If that file does not exist, say the style is unavailable and fall back to `chibi` unless the user says otherwise.
3. Build the generation spec:
   - Use the user's subject, brand, or mascot request.
   - Keep transparent background, simple silhouette, and clean edges.
   - Treat the deliverable as two outputs:
     - General icon: full icon asset for docs, avatars, or larger display.
     - Inline icon: trimmed transparent icon meant to sit beside text.
4. Generate the general icon with the `imagegen` dependency:
   - Use `logo-brand` unless another `imagegen` taxonomy is clearly better.
   - Write the general icon to `$ASSETS_DIR/<slug>.png`.
   - Keep filenames stable and descriptive.
5. Create the inline icon:
   - Run `scripts/prepare_inline_icon.sh "$ASSETS_DIR/<slug>.png" "$ASSETS_DIR/<slug>-inline.png"`.
   - This trims transparent padding to make HTML inline alignment deterministic.
6. Validate outputs:
   - Open both files.
   - Confirm the general icon reads well at normal size.
   - Confirm the inline icon is tightly cropped and suitable for `<img ... style="vertical-align: text-bottom;" />`.
7. Report the final assets and the style used.

## Output contract

- Save outputs under the current project's `assets/` directory, not under `output/`.
- Produce at least:
  - `<slug>.png`
  - `<slug>-inline.png`
- Prefer transparent PNG for both files.
- Do not hand-edit HTML alignment per image unless the user explicitly asks. Normalize the inline asset instead.

## Prompt rules

- Start from the selected style reference in `references/style-<style>.md`.
- Preserve the user's requested subject and brand identity.
- Avoid backgrounds, scenes, mockups, or text unless the user explicitly asks for them.
- Prefer a compact silhouette with readable eyes, face, or key shape details when the style supports it.
- Keep the inline icon visually centered but tightly trimmed.

## References

- Default style: `references/style-chibi.md`
- Add new styles as `references/style-<style>.md`
- Inline icon normalization: `scripts/prepare_inline_icon.sh`
