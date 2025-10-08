const fs = require('fs');
const path = require('path');

const scriptContent = `<script src="/dashboard-console-capture.js"></script>`;

function injectScript(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    return;
  }
  
  const updatedContent = content.replace(
    '</head>',
    `  ${scriptContent}\n  </head>`
  );
  
  fs.writeFileSync(filePath, updatedContent);
  console.log(`Injected console capture script into ${filePath}`);
}

const outDir = path.join(process.cwd(), '.next', 'server', 'pages');

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

walkDir(outDir);
console.log('Console capture script injection complete');