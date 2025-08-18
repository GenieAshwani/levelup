const fs = require("fs");

// Read the questions data
const questions = JSON.parse(
  fs.readFileSync("practiceQuestions.json", "utf-8")
);

// Group patterns by topic
const topicPatterns = {};
questions.forEach((q) => {
  if (!topicPatterns[q.topic]) {
    topicPatterns[q.topic] = new Set();
  }
  topicPatterns[q.topic].add(q.pattern);
});

// Compare with TOPIC_PATTERN_MAP
const TOPIC_PATTERN_MAP = {
  Array: [
    "General",
    "Two Pointers",
    "Sliding Window",
    "Prefix Sum",
    "Prefix/Suffix Products",
    "Kadane / Subarray",
    "Binary Search",
    "Binary Search on Answer",
    "Sorting & Partitioning",
    "Monotonic Stack",
    "Monotonic Queue",
    "Heap / Priority Queue",
    "Order Statistics (Quickselect)",
    "Greedy",
    "Hash Map / Set",
    "Bit Manipulation",
    "Two Heaps (Median maintenance)",
    "Difference Array",
    "Merge Sort",
    "Boyer–Moore Voting (Majority)",
    "Range Queries (Segment Tree)",
    "LIS / Patience Sorting",
    "Fast & Slow Pointers",
    "Fenwick Tree (BIT)",
  ],
  "2D Array": [
    "Matrix Manipulation",
    "Prefix Sum",
    "Binary Search",
    "Sorting & Partitioning",
    "Greedy",
    "Monotonic Stack",
    "DFS",
    "BFS",
    "Dynamic Programming",
    "Backtracking",
    "Trie / Prefix Tree",
    "Hash Map / Set",
  ],
  Strings: [
    "Sliding Window",
    "Two Pointers",
    "Hash Map / Set",
    "String Matching (KMP / Z / Rabin–Karp)",
    "Trie / Prefix Tree",
    "Rolling Hash",
    "DP on Strings",
  ],
  "Linked List": [
    "Two Pointers",
    "Fast & Slow Pointers",
    "Hash Map / Set",
    "Heap / Priority Queue",
    "Recursion / Divide & Conquer",
    "Stack",
  ],
};

// Find missing patterns
Object.keys(topicPatterns).forEach((topic) => {
  if (!TOPIC_PATTERN_MAP[topic]) {
    console.log(`MISSING TOPIC: ${topic} not found in TOPIC_PATTERN_MAP`);
    return;
  }

  console.log(`\n=== ${topic} ===`);
  console.log("Patterns found in questions:");
  const actualPatterns = Array.from(topicPatterns[topic]).sort();
  actualPatterns.forEach((pattern) => console.log(`- ${pattern}`));

  console.log("\nMissing from TOPIC_PATTERN_MAP:");
  const missingPatterns = actualPatterns.filter(
    (p) => !TOPIC_PATTERN_MAP[topic].includes(p)
  );
  if (missingPatterns.length === 0) {
    console.log("None - all patterns are included");
  } else {
    missingPatterns.forEach((p) => console.log(`- ${p}`));
  }

  console.log("\nExtra in TOPIC_PATTERN_MAP (not used in questions):");
  const extraPatterns = TOPIC_PATTERN_MAP[topic].filter(
    (p) => !actualPatterns.includes(p)
  );
  if (extraPatterns.length === 0) {
    console.log("None - all mapped patterns are used");
  } else {
    extraPatterns.forEach((p) => console.log(`- ${p}`));
  }
});
