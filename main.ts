// Weirdest Job Title — make.fun entry.
// One fixed job title, written to /output/entry.txt. Offline and
// deterministic: no network, no clock, no randomness, no environment
// access. The program only emits the title.
import * as fs from "node:fs";

const TITLE = "Professional Mourner for Strangers' Goldfish";

// Guard the sealed gate ourselves: 1-60 characters, not blank, one line,
// no leading or trailing whitespace (the judge reads the title exactly
// as submitted, so padding would only dilute it).
// Fail loudly instead of ever writing an entry the scorer would reject.
if (
  TITLE.length < 1 ||
  TITLE.length > 60 ||
  !TITLE.trim() ||
  TITLE !== TITLE.trim() ||
  TITLE.includes("\n")
) {
  throw new Error(
    `job title violates the 1-60 char single-line gate (${TITLE.length} chars)`,
  );
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", TITLE, "utf8");

// Verify the written file round-trips exactly: same bytes, one line,
// and still inside the 1-60 char gate after the write.
const written = fs.readFileSync("/output/entry.txt", "utf8");
if (written !== TITLE) {
  throw new Error("entry.txt does not match the job title");
}
if (Buffer.byteLength(written, "utf8") > 60) {
  throw new Error("entry.txt exceeds 60 bytes");
}
