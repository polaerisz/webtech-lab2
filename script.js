
// Returns the remark for a valid score (0 < score <= 100)
function evaluateScore(score) {
  if (score >= 90) return { text: "Excellent", cls: "excellent" };
  else if (score >= 75) return { text: "Passed", cls: "passed" };
  else return { text: "Failed", cls: "failed" };
}

// Returns an error message, or if the score is valid
function validateScore(raw) {
  if (raw === null || raw.trim() === "") return "No score was entered.";
  const n = Number(raw);
  if (isNaN(n)) return "The score must be a number.";
  if (n === 0) return "A score of zero is not accepted.";
  if (n < 0) return "The score cannot be negative.";
  if (n > 100) return "The score cannot be higher than 100.";
  return "";
}

const el = {
  box: document.getElementById("result"),
  name: document.getElementById("resultName"),
  score: document.getElementById("resultScore"),
  remark: document.getElementById("resultRemark"),
  note: document.getElementById("resultNote")
};

function show(name, score, remark, cls, note) {
  el.name.textContent = name;
  el.score.textContent = score;
  el.remark.textContent = remark;
  el.remark.className = "remark " + cls;
  el.note.textContent = note;
  el.box.hidden = false;
}

function run() {
  alert("Welcome to the Score Checker!");

  const name = prompt("Enter your name:");
  if (name === null || name.trim() === "") {
    show("—", "—", "Invalid input", "invalid", "No name was entered. Please try again.");
    return;
  }

  const rawScore = prompt("Enter your score (1–100):");
  const error = validateScore(rawScore);
  if (error) {
    show(name.trim(), "—", "Invalid score", "invalid", error);
    return;
  }
  const score = Number(rawScore);

  if (!confirm("Do you want to continue and see your result?")) {
    show(name.trim(), score, "Cancelled", "invalid", "You chose not to continue.");
    return;
  }

  const r = evaluateScore(score);
  show(name.trim(), score, r.text, r.cls, "Thank you, " + name.trim() + "!");
}

document.getElementById("startBtn").addEventListener("click", run);