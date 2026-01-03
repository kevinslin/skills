#!/usr/bin/env node

/**
 * Update Speculate documentation framework
 *
 * This script updates the docs/general/ folder with latest Speculate
 * documentation while preserving:
 * - docs/development.md (project-specific)
 * - docs/project/ (all project-specific content)
 */

const fs = require('fs');
const path = require('path');

// Source: assets folder in this skill
const SKILL_DIR = path.dirname(__dirname);
const SOURCE_DOCS = path.join(SKILL_DIR, 'assets', 'docs');

// Target: current working directory
const TARGET_DIR = process.cwd();
const TARGET_DOCS = path.join(TARGET_DIR, 'docs');

/**
 * Recursively delete directory
 */
function deleteDirRecursive(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      deleteDirRecursive(fullPath);
    } else {
      fs.unlinkSync(fullPath);
    }
  }

  fs.rmdirSync(dirPath);
}

/**
 * Recursively copy directory
 */
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      const relPath = path.relative(TARGET_DOCS, destPath);
      console.log(`  ✅ Updated: ${relPath}`);
    }
  }
}

/**
 * Main update function
 */
function update() {
  console.log('🔄 Updating Speculate documentation framework...\n');

  // Check if source docs exist
  if (!fs.existsSync(SOURCE_DOCS)) {
    console.error('❌ Error: Speculate docs not found in skill assets folder.');
    console.error(`   Expected location: ${SOURCE_DOCS}`);
    console.error('   Run the setup script first to copy docs to assets.');
    process.exit(1);
  }

  // Check if target docs exist
  if (!fs.existsSync(TARGET_DOCS)) {
    console.error('❌ Error: docs/ folder not found in current directory.');
    console.error('   Run install.js first to initialize the documentation.');
    process.exit(1);
  }

  console.log(`📁 Target directory: ${TARGET_DIR}\n`);

  // Update docs-overview.md (always update this)
  console.log('📋 Updating overview...\n');
  const srcOverview = path.join(SOURCE_DOCS, 'docs-overview.md');
  const destOverview = path.join(TARGET_DOCS, 'docs-overview.md');
  if (fs.existsSync(srcOverview)) {
    fs.copyFileSync(srcOverview, destOverview);
    console.log('  ✅ Updated: docs-overview.md\n');
  }

  // Update docs/general/ (all cross-project docs)
  console.log('📚 Updating general documentation...\n');
  const srcGeneral = path.join(SOURCE_DOCS, 'general');
  const destGeneral = path.join(TARGET_DOCS, 'general');

  if (fs.existsSync(destGeneral)) {
    console.log('  🗑️  Removing old general/ folder...');
    deleteDirRecursive(destGeneral);
  }

  if (fs.existsSync(srcGeneral)) {
    copyDirRecursive(srcGeneral, destGeneral);
  }

  console.log('\n✨ Update complete!\n');

  // Preserved files notice
  console.log('✅ Preserved your customizations:');
  console.log('   - docs/development.md');
  console.log('   - docs/project/ (all project-specific content)');
  console.log('');

  console.log('📚 Updated:');
  console.log('   - docs/docs-overview.md');
  console.log('   - docs/general/ (all cross-project rules, shortcuts, templates)');
  console.log('');
}

// Run update
try {
  update();
} catch (error) {
  console.error('❌ Update failed:', error.message);
  process.exit(1);
}
