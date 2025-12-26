const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PUBLIC_DIR = path.join(__dirname, 'public');
const IMG_SRC = path.join(__dirname, 'img');
const IMG_DEST = path.join(PUBLIC_DIR, 'img');
const HTML_SRC = path.join(__dirname, 'View', 'tailwind.html');
const HTML_DEST = path.join(PUBLIC_DIR, 'index.html'); // Rename to index.html for Netlify
const CSS_SRC = path.join(__dirname, 'Dising', 'tailwin.css');
const CSS_OUTPUT = path.join(PUBLIC_DIR, 'View', 'output.css'); // Maintain relative path structure for CSS

// 1. Clean/Create public directory
console.log('Cleaning public directory...');
if (fs.existsSync(PUBLIC_DIR)) {
    fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });
}
fs.mkdirSync(PUBLIC_DIR);
fs.mkdirSync(path.join(PUBLIC_DIR, 'View')); // Create View folder inside public to match relative CSS path

// 2. Build Tailwind CSS
console.log('Building Tailwind CSS...');
try {
    execSync(`npx @tailwindcss/cli -i "${CSS_SRC}" -o "${CSS_OUTPUT}" --minify`, { stdio: 'inherit' });
} catch (error) {
    console.error('Error building CSS:', error);
    process.exit(1);
}

// 3. Copy HTML
console.log('Copying HTML...');
let htmlContent = fs.readFileSync(HTML_SRC, 'utf8');
// Fix CSS path in HTML: The HTML expects "View/output.css" relative to itself if it was in View folder.
// But now HTML is at root of public, and CSS is at public/View/output.css.
// So "View/output.css" is actually CORRECT relative to the new index.html.
// However, let's verify image paths.
// In source: src="../img/photo.jpg"
// In prod (public/index.html): src="../img/photo.jpg" -> This would look for public/../img which is WRONG.
// We need to replace "../img/" with "img/" because img folder is now a sibling of index.html.
htmlContent = htmlContent.replace(/\.\.\/img\//g, 'img/');

fs.writeFileSync(HTML_DEST, htmlContent);

// 4. Copy Images
console.log('Copying Images...');
// Helper to copy directory recursively
function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
    }
}
copyDir(IMG_SRC, IMG_DEST);

console.log('Build completed successfully!');
