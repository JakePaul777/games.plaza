const fs = require('fs');
const path = require('path');

function combineFiles(partPath) {
  if (!fs.existsSync(partPath)) {
    console.error(`File not found: ${partPath}`);
    process.exit(1);
  }

  // Match pattern like "john.mp3.part001" to extract the base file name "john.mp3"
  const match = partPath.match(/^(.*)\.part\d+$/);
  if (!match) {
    console.error("Invalid part filename format. Expected something like filename.ext.part001");
    process.exit(1);
  }

  const originalFilePath = match[1];
  const dir = path.dirname(originalFilePath);
  const baseName = path.basename(originalFilePath);

  console.log(`🔍 Looking for parts belonging to: ${baseName}...`);

  // Gather all parts matching the pattern
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
      break; // Stop when the next sequential part doesn't exist
    }
  }

  if (partBuffers.length === 0) {
    console.error(`❌ No parts found for ${baseName}`);
    process.exit(1);
  }

  // Combine all buffers into one and write the restored file
  const combinedBuffer = Buffer.concat(partBuffers);
  fs.writeFileSync(originalFilePath, combinedBuffer);

  console.log(`\n✅ Successfully combined ${partBuffers.length} parts into: "${originalFilePath}" (${(combinedBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
}

// Usage: node combine.js john.mp3.part001
const targetPart = process.argv[2];

if (!targetPart) {
  console.error("Please specify a part file. Example: node combine.js john.mp3.part001");
  process.exit(1);
}

combineFiles(targetPart);