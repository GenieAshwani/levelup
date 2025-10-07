// ====== Curated patterns for each topic ======
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
  Searching: [
    "Binary Search",
    "Binary Search on Answer",
    "Two Pointers",
    "Greedy",
    "Order Statistics (Quickselect)",
  ],
  Sorting: [
    "Sorting & Partitioning",
    "Heap / Priority Queue",
    "Order Statistics (Quickselect)",
    "Two Heaps (Median maintenance)",
    "Two Pointers",
    "Greedy",
  ],
  Recursion: ["Recursion / Divide & Conquer", "Backtracking", "DFS"],
  Stack: ["Stack", "Monotonic Stack"],
  Queue: ["Queue / Deque", "Monotonic Queue", "BFS"],
  "Linked List": [
    "Two Pointers",
    "Fast & Slow Pointers",
    "Hash Map / Set",
    "Heap / Priority Queue",
    "Recursion / Divide & Conquer",
    "Stack",
  ],
  Heap: [
    "Heap / Priority Queue",
    "Two Heaps (Median maintenance)",
    "Order Statistics (Quickselect)",
    "Greedy",
  ],
  Hashing: ["Hash Map / Set", "Prefix Sum", "Boyer–Moore Voting (Majority)"],
  "Binary Tree": [
    "DFS",
    "BFS",
    "Recursion / Divide & Conquer",
    "Tree Traversal",
  ],
  "Binary Search Tree": [
    "BST Properties",
    "BST Operations",
    "Binary Search",
    "Self-Balancing",
  ],
  "Advanced Trees": [
    "Segment Tree",
    "Fenwick Tree (BIT)",
    "Trie / Prefix Tree",
    "Red-Black Tree",
    "AVL Tree",
  ],
  Graph: [
    "BFS",
    "DFS",
    "Topological Sort",
    "Shortest Path (Dijkstra / 0-1 BFS)",
    "Minimum Spanning Tree (Kruskal / Prim)",
    "Union-Find (DSU)",
    "Greedy",
  ],
  DP: [
    "Kadane / Subarray",
    "Recursion / Divide & Conquer",
    "Bitmask DP",
    "DP on Intervals",
    "DP on Trees",
    "Dynamic Programming",
    "DP on Strings",
  ],
  "Greedy Algorithms": [
    "Greedy",
    "Activity Selection",
    "Interval Scheduling",
    "Job Scheduling",
    "Knapsack",
    "Coin Change",
    "Scheduling",
    "Heap / Priority Queue",
    "Sorting",
    "Two Pointers",
    "Array Traversal",
    "Stack",
    "String Manipulation",
    "Circular Array",
  ],
  Backtracking: [
    "Backtracking",
    "Recursion / Divide & Conquer",
    "Trie / Prefix Tree",
    "Bit Manipulation",
  ],
};

// ====== Global State ======
let questionsData = [];
let selectedTopic = "Array";
let selectedPattern = "All Patterns";
let selectedDifficulty = "All";
let doneMap = JSON.parse(localStorage.getItem("practiceDoneMap") || "{}");
let searchTerm = "";

// ====== DOM Elements ======
const topicsList = document.getElementById("topicsList");
const patternsList = document.getElementById("patternsList");
const questionsGrid = document.getElementById("questionsGrid");
const searchInput = document.getElementById("searchInput");

// ====== Topics ======
const topics = Object.keys(TOPIC_PATTERN_MAP);

function getQuestionKey(q) {
  return q.link || q.title;
}

function renderTopics() {
  topicsList.innerHTML = "";
  topics.forEach((topic) => {
    const total = questionsData.filter((q) => q.topic === topic).length;
    const done = questionsData.filter(
      (q) => q.topic === topic && doneMap[getQuestionKey(q)]
    ).length;
    const btn = document.createElement("button");
    btn.className = "topic-btn" + (selectedTopic === topic ? " active" : "");
    btn.innerHTML = `<span>${topic}</span><span>${done}/${total} done</span>`;
    btn.onclick = () => {
      selectedTopic = topic;
      selectedPattern = "All Patterns";
      renderTopics();
      renderPatterns();
      renderQuestions();
    };
    const li = document.createElement("li");
    li.appendChild(btn);
    topicsList.appendChild(li);
  });
}

// ====== Patterns ======
function renderPatterns() {
  patternsList.innerHTML = "";

  const fromData = new Set(
    questionsData
      .filter((q) => q.topic === selectedTopic)
      .map((q) => q.pattern || "General")
  );

  const curated = new Set(TOPIC_PATTERN_MAP[selectedTopic] || []);

  const union = new Set([...fromData, ...curated]);
  const allPatterns = ["All Patterns", ...Array.from(union).sort()];

  allPatterns.forEach((p) => {
    const btn = document.createElement("button");
    btn.className = "pattern-btn" + (selectedPattern === p ? " active" : "");
    btn.textContent = p;
    btn.onclick = () => {
      selectedPattern = p;
      renderPatterns();
      renderQuestions();
    };
    const li = document.createElement("li");
    li.appendChild(btn);
    patternsList.appendChild(li);
  });
}

// ====== Questions ======
function renderQuestions() {
  questionsGrid.innerHTML = "";
  questionsData
    .filter((q) => q.topic === selectedTopic)
    .filter(
      (q) =>
        selectedPattern === "All Patterns" ||
        (q.pattern || "General") === selectedPattern
    )
    .filter(
      (q) => selectedDifficulty === "All" || q.difficulty === selectedDifficulty
    )
    .filter(
      (q) =>
        !searchTerm ||
        `${q.title} ${q.topic} ${q.pattern} ${q.difficulty}`
          .toLowerCase()
          .includes(searchTerm)
    )
    .forEach((q) => {
      const card = document.createElement("div");
      card.className = "question-card";
      const qKey = getQuestionKey(q);
      card.innerHTML = `
<div class="top-row">
  <div class="tags">
    <span class="tag ${q.difficulty.toLowerCase()}">${q.difficulty}</span>
    <span class="tag">${q.topic}</span>
  </div>
  <div class="done-container">
    <input type="checkbox" ${
      doneMap[qKey] ? "checked" : ""
    } class="done-checkbox"/>
    <span>Done</span>
  </div>
</div>

<div class="title">${q.title}</div>
<div class="desc">${q.description}</div>
<div class="actions">
  <a href="${q.link}" target="_blank" class="link-btn">Open ↗</a>
</div>

<div class="pattern-bottom">
  ${q.pattern || "General"} 
  ${q.veryImportant ? '<span class="important-label">★ Important</span>' : ""}
</div>

`;

      card.querySelector(".done-checkbox").onchange = (e) => {
        doneMap[qKey] = e.target.checked;
        localStorage.setItem("practiceDoneMap", JSON.stringify(doneMap));
        renderTopics();
      };
      questionsGrid.appendChild(card);
    });
}

// ====== Difficulty Filter ======
document.querySelectorAll(".difficulty-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".difficulty-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedDifficulty = btn.dataset.difficulty;
    renderQuestions();
  });
});

// ====== Search ======
searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.toLowerCase();
  renderQuestions();
});

// ====== Init ======
fetch("practiceQuestions.json")
  .then((res) => res.json())
  .then((data) => {
    questionsData = data;
    renderTopics();
    renderPatterns();
    renderQuestions();
  })
  .catch((err) => {
    console.error("Failed to load questions:", err);
  });

// ====== Mobile Sidebar Toggle ======
const menuToggleBtn = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const sidebarOverlay = document.querySelector(".sidebar-overlay");

// Function to close the mobile sidebar
function closeMobileSidebar() {
  sidebar.classList.remove("mobile-visible");
  sidebarOverlay.classList.remove("active");
  document.body.classList.remove("sidebar-open");
  // Re-enable scrolling by removing fixed positioning
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.style.height = "";
  window.scrollTo(0, parseInt(scrollY || "0"));
}

// Function to toggle the mobile sidebar
function toggleMobileSidebar() {
  const isVisible = sidebar.classList.contains("mobile-visible");

  if (isVisible) {
    closeMobileSidebar();
  } else {
    sidebar.classList.add("mobile-visible");
    sidebarOverlay.classList.add("active");
    document.body.classList.add("sidebar-open");

    // Fix for iOS scroll issue - add touch events
    sidebar.style.WebkitOverflowScrolling = "touch";
    sidebar.style.overflowY = "auto";

    // Force repaint to enable scrolling
    setTimeout(() => {
      sidebar.style.display = "none";
      sidebar.offsetHeight; // Force reflow
      sidebar.style.display = "flex";
      sidebar.style.flexDirection = "column";

      const topicsList = document.getElementById("topicsList");
      if (topicsList) {
        topicsList.style.overflow = "visible";
      }
    }, 50);
  }
}

// Track scroll position to restore it when closing the sidebar
window.addEventListener("scroll", () => {
  document.documentElement.style.setProperty(
    "--scroll-y",
    `${window.scrollY}px`
  );
});

if (menuToggleBtn && sidebar && sidebarOverlay) {
  // Toggle sidebar when menu button is clicked
  menuToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMobileSidebar();
  });

  // Close sidebar when overlay is clicked
  sidebarOverlay.addEventListener("click", closeMobileSidebar);

  // Close sidebar when a topic or pattern is clicked (on mobile only)
  document.addEventListener("click", (e) => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile && sidebar.classList.contains("mobile-visible")) {
      // Check if clicked on a topic or pattern item
      if (
        e.target.closest(".topic-item") ||
        e.target.closest(".pattern-item")
      ) {
        closeMobileSidebar();
      }
    }
  });
}
