const fs = require('fs');
const path = require('path');

function splitFile(filePath, numParts) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const buffer = fs.readFileSync(filePath);
  const chunkSize = Math.ceil(buffer.length / numParts);

  console.log(`✅ Successfully split "${path.basename(filePath)}" into ${numParts} parts:`);

  for (let i = 0; i < numParts; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, buffer.length);
    const partBuffer = buffer.subarray(start, end);

    // Creates zero-padded extensions like .part001, .part002, etc.
    const partNumStr = String(i + 1).padStart(3, '0');
    const partFilename = `${filePath}.part${partNumStr}`;

    fs.writeFileSync(partFilename, partBuffer);
    console.log(` - ${partFilename} (${(partBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
  }
}

// Usage: node split.js john.mp3 3  (or just node split.js john.mp3 for 2 parts)
const targetFile = process.argv[2];
const numParts = parseInt(process.argv[3], 10) || 2;

if (!targetFile) {
  console.error("Please specify a file to split. Example: node split.js john.mp3 3");
  process.exit(1);
}

splitFile(targetFile, numParts);