---
name: dev.add-license
description: This skill should be used when the user wants to add a LICENSE file to their repository. Currently supports Apache License 2.0 with automatic copyright information detection from git configuration. Also updates package.json license field if the file exists.
---

# Add License

## Overview

Add an open source license file to a repository with automatically populated copyright information. Also updates the license field in package.json if present.

## Usage

When the user requests to add a license to their repository, follow this workflow:

### 1. Determine target location

Identify the project root directory. If the user is in a subdirectory of a git repository, check if they want the LICENSE file in the current directory or the repository root.

### 2. Extract copyright information

Extract copyright owner information from git configuration:

```bash
git config user.name
```

If git config is not available or the user prefers, ask for the copyright owner name explicitly.

For the copyright year, use the current year.

### 3. Create LICENSE file

Copy the Apache 2.0 license template from `assets/LICENSE-APACHE-2.0` to `LICENSE` in the target directory.

Then append the copyright notice to the end of the LICENSE file:

```
Copyright [YEAR] [COPYRIGHT OWNER NAME]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

Replace `[YEAR]` with the current year and `[COPYRIGHT OWNER NAME]` with the name extracted from git config.

### 4. Update package.json (if present)

Check if a `package.json` file exists in the target directory:

```bash
ls package.json
```

If `package.json` exists:
1. Read the package.json file
2. Update or add the `"license"` field to `"Apache-2.0"`
3. Write the updated package.json back to disk, preserving formatting

If the license field already exists, replace it. If it doesn't exist, add it to the JSON object.

### 5. Confirm completion

Inform the user that the LICENSE file has been created and confirm the copyright information used. If package.json was updated, mention that as well.

## Example Workflows

**User request:** "Add an Apache license to this project"

**Actions:**
1. Check current directory is a git repository
2. Run `git config user.name` to get copyright owner
3. Get current year
4. Read `assets/LICENSE-APACHE-2.0`
5. Write to `LICENSE` file with full license text
6. Append copyright notice with populated year and owner name
7. Check if `package.json` exists
8. If package.json exists, read it, update the `"license"` field to `"Apache-2.0"`, and write it back
9. Confirm: "Created LICENSE file with Apache 2.0 license. Copyright 2025 John Doe. Updated package.json with Apache-2.0 license."

## Resources

### assets/LICENSE-APACHE-2.0

Full text of the Apache License 2.0, used as the template for generating LICENSE files.
