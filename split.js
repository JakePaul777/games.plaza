// split-two.js
const fs = require('fs');
const path = require('path');

function splitIntoTwoParts(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const buffer = fs.readFileSync(filePath);
  const midpoint = Math.floor(buffer.length / 2);

  const part1 = buffer.subarray(0, midpoint);
  const part2 = buffer.subarray(midpoint);

  fs.writeFileSync(`${filePath}.part001`, part1);
  fs.writeFileSync(`${filePath}.part002`, part2);

  console.log(`✅ Successfully split "${path.basename(filePath)}" into two parts:`);
  console.log(` - ${filePath}.part001 (${(part1.length / 1024 / 1024).toFixed(2)} MB)`);
  console.log(` - ${filePath}.part002 (${(part2.length / 1024 / 1024).toFixed(2)} MB)`);
}

// Usage: node split-two.js john.mp3
const targetFile = process.argv[2];
if (!targetFile) {
  console.error("Please specify a file to split. Example: node split-two.js john.mp3");
  process.exit(1);
}

splitIntoTwoParts(targetFile);