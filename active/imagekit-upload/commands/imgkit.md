---
description: Upload images to ImageKit CDN with shortcuts for common workflows
---

# ImageKit Upload Command

Handle the following subcommands:

## upload recent

Find the most recent image file in ~/Downloads and upload it to ImageKit.

Steps:
1. Find the most recent image file in ~/Downloads (supports: jpg, jpeg, png, gif, webp, svg)
2. Use the imagekit-upload script to upload it
3. Display the resulting URL prominently to the user

Example command to find recent image:
```bash
find ~/Downloads -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" -o -iname "*.svg" \) -print0 | xargs -0 ls -t | head -1
```

Example command to upload:
```bash
node ~/.claude/skills/imagekit-upload/scripts/upload.js --file "<path-to-file>"
```

## upload <filepath>

Upload the specified file to ImageKit.

Example:
```bash
node ~/.claude/skills/imagekit-upload/scripts/upload.js --file "<filepath>"
```

## upload clipboard

Upload an image from the clipboard to ImageKit.

Example:
```bash
node ~/.claude/skills/imagekit-upload/scripts/upload.js --clipboard
```

## Output Format

After successful upload, display:
- The CDN URL prominently (this is what users typically want to copy)
- File name
- File size
- Thumbnail URL (if available)
