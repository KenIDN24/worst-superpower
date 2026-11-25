import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I can summon a perfect cup of coffee at will, but it always appears exactly one inch inside a wall — a skill I use daily, and cry about.";

if (LINE.length < 1 || LINE.length > 140) {
  console.error(`entry must be 1-140 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE !== LINE.trim()) {
  console.error("entry must not have leading or trailing whitespace");
  process.exit(1);
}
for (const ch of LINE) {
  if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
    console.error("entry must not contain control characters");
    process.exit(1);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE + "\n") {
  console.error("read-back mismatch: file on disk does not match the line");
  process.exit(1);
}
console.log(`wrote /output/entry.txt (${LINE.length} chars)`);
