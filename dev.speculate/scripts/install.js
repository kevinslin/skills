#!/usr/bin/env node

/**
 * Install Speculate documentation framework into current project
 *
 * This script copies the Speculate docs/ folder structure to the current
 * working directory, preserving any existing customizations.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Source: assets folder in this skill
const SKILL_DIR = path.dirname(__dirname);
const SOURCE_DOCS = path.join(SKILL_DIR, 'assets', 'docs');

// Target: current working directory
const TARGET_DIR = process.cwd();
const TARGET_DOCS = path.join(TARGET_DIR, 'docs');

/**
 * Recursively copy directory, preserving existing files
 */
function copyDirRecursive(src, dest, options = {}) {
  const { preserve = [], skipIfExists = false } = options;

  // Create destination if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath, options);
    } else {
      // Check if this file should be preserved
      const relPath = path.relative(TARGET_DOCS, destPath);
      const shouldPreserve = preserve.some(pattern => {
        if (typeof pattern === 'string') {
          return relPath === pattern;
        }
        return pattern.test(relPath);
      });

      // Skip if file exists and should be preserved
      if (shouldPreserve && fs.existsSync(destPath)) {
        console.log(`  ⏭️  Skipping (preserved): ${relPath}`);
        continue;
      }

      // Skip if file exists and skipIfExists is true
      if (skipIfExists && fs.existsSync(destPath)) {
        console.log(`  ⏭️  Skipping (exists): ${relPath}`);
        continue;
      }

      // Copy file
      fs.copyFileSync(srcPath, destPath);
      console.log(`  ✅ Copied: ${relPath}`);
    }
  }
}

/**
 * Main installation function
 */
function install() {
  console.log('🚀 Installing Speculate documentation framework...\n');

  // Check if source docs exist
  if (!fs.existsSync(SOURCE_DOCS)) {
    console.error('❌ Error: Speculate docs not found in skill assets folder.');
    console.error(`   Expected location: ${SOURCE_DOCS}`);
    console.error('   Run the setup script first to copy docs to assets.');
    process.exit(1);
  }

  // Check current directory
  console.log(`📁 Target directory: ${TARGET_DIR}\n`);

  // Copy docs with preservation rules
  console.log('📋 Copying documentation files...\n');

  const preservePatterns = [
    'development.md',           // User's project-specific setup
    /^project\//,               // All project-specific docs
  ];

  copyDirRecursive(SOURCE_DOCS, TARGET_DOCS, {
    preserve: preservePatterns,
    skipIfExists: false  // Overwrite general docs to ensure latest version
  });

  console.log('\n✨ Installation complete!\n');

  // Check if development.md exists
  const devMdPath = path.join(TARGET_DOCS, 'development.md');
  if (!fs.existsSync(devMdPath)) {
    console.log('⚠️  IMPORTANT: Create your docs/development.md file');
    console.log('   This file should contain your project-specific setup:');
    console.log('   - Build commands');
    console.log('   - Test commands');
    console.log('   - Lint/format commands');
    console.log('   - Deployment workflows');
    console.log('');
    console.log('   See docs/development.npm.sample.md for an example.');
    console.log('');
  }

  console.log('📚 Next steps:');
  console.log('   1. Review docs/docs-overview.md for an overview');
  console.log('   2. Customize docs/development.md for your project');
  console.log('   3. Start using shortcuts from the dev.shortcuts skill');
  console.log('');
  console.log('🎯 To update docs later, run:');
  console.log('   node ~/.claude/skills/dev.speculate/scripts/update.js');
  console.log('');
}

// Run installation
try {
  install();
} catch (error) {
  console.error('❌ Installation failed:', error.message);
  process.exit(1);
}
