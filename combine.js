const fs = require('fs');
const path = require('path');

function combineFiles(partPath) {
  if (!fs.existsSync(partPath)) {
    console.error(`File not found: ${partPath}`);
    process.exit(1);
  }

  const match = partPath.match(/^(.*)\.part\d+$/);
  if (!match) {
    console.error("Invalid part filename format. Expected something like filename.ext.part001");
    process.exit(1);
  }

  const originalFilePath = match[1];
  const dir = path.dirname(originalFilePath);
  const baseName = path.basename(originalFilePath);

  console.log(`Looking for parts belonging to: ${baseName}...`);

  let partIndex = 1;
  const partBuffers = [];

  while (true) {
    const partNumStr = String(partIndex).padStart(3, '0');
    const currentPartPath = `${originalFilePath}.part${partNumStr}`;

    if (fs.existsSync(currentPartPath)) {
      console.log(` - Found: ${path.basename(currentPartPath)}`);
      partBuffers.push(fs.readFileSync(currentPartPath));
      partIndex++;
    } else {
      break;
    }
  }

  if (partBuffers.length === 0) {
    console.error(`❌ No parts found for ${baseName}`);
    process.exit(1);
  }

  const combinedBuffer = Buffer.concat(partBuffers);
  fs.writeFileSync(originalFilePath, combinedBuffer);

  console.log(`\nSuccessfully combined ${partBuffers.length} parts into: "${originalFilePath}" (${(combinedBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
}

const targetPart = process.argv[2];

if (!targetPart) {
  console.error("Please specify a part file. Example: node combine.js john.mp3.part001");
  process.exit(1);
}

combineFiles(targetPart);