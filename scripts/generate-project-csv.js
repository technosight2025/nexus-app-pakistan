const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT_DIR, 'nexus_project_files.csv');

// Folders to exclude
const EXCLUDE_DIRS = new Set([
  'node_modules',
  '.next',
  '.git',
  '.vercel',
  '.legacy_prototype',
  'out',
  'build'
]);

// Helper to escape CSV fields
function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  let str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const fileList = [];

function countLines(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split(/\r?\n/).length;
  } catch (err) {
    return 'N/A'; // Binary file or cannot read
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(ROOT_DIR, fullPath);
    
    // Check exclusion
    if (EXCLUDE_DIRS.has(file)) {
      continue;
    }
    
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      scanDir(fullPath);
    } else {
      const ext = path.extname(file);
      const isText = ['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.json', '.md', '.sql', '.mjs', '.local', '.config'].includes(ext.toLowerCase()) || file.startsWith('.');
      const lines = isText ? countLines(fullPath) : 'Binary';
      
      fileList.push({
        name: file,
        path: relativePath.replace(/\\/g, '/'),
        extension: ext,
        size: stats.size,
        lines: lines
      });
    }
  }
}

// Start scan
try {
  scanDir(ROOT_DIR);

  // Generate CSV string
  const headers = ['File Name', 'Relative Path', 'Extension', 'Size (Bytes)', 'Lines of Code'];
  const csvLines = [headers.join(',')];

  for (const f of fileList) {
    const row = [
      escapeCSV(f.name),
      escapeCSV(f.path),
      escapeCSV(f.extension),
      escapeCSV(f.size),
      escapeCSV(f.lines)
    ];
    csvLines.push(row.join(','));
  }

  fs.writeFileSync(OUTPUT_FILE, csvLines.join('\n'), 'utf8');
  console.log(`SUCCESS: Generated CSV with ${fileList.length} files at: ${OUTPUT_FILE}`);
} catch (error) {
  console.error('ERROR during generation:', error);
}
