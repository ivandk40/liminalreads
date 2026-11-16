import fs from 'fs';

const htmlPath = 'dist/index.html';
if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  html = html.replace(/(src="\/assets\/[^"]+\.js)(")/g, `$1?v=${Date.now()}$2`);
  fs.writeFileSync(htmlPath, html);
  console.log('Cache-busting query param added to dist/index.html');
}
