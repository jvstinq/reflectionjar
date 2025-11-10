let reflections = JSON.parse(localStorage.getItem("reflections")) || [];
let streak = localStorage.getItem("streak") || 0;

const jar = document.getElementById("jar");
const writeBtn = document.getElementById("write-btn");
const reflectionInput = document.getElementById("reflection-input");
const submitBtn = document.getElementById("submit-reflection");
const textArea = document.getElementById("reflection-text");
const streakDisplay = document.getElementById("streak-count");

streakDisplay.textContent = streak;
renderJar();

writeBtn.addEventListener("click", () => {
  reflectionInput.classList.toggle("hidden");
});

submitBtn.addEventListener("click", () => {
  const text = textArea.value.trim();
  if (text === "") return;

  reflections.push({ text, date: new Date().toISOString() });
  localStorage.setItem("reflections", JSON.stringify(reflections));

  addToken();
  updateStreak();
  textArea.value = "";
  reflectionInput.classList.add("hidden");
});

function addToken() {
  const token = document.createElement("div");
  token.classList.add("token");
  jar.appendChild(token);
}

function renderJar() {
  jar.innerHTML = "";
  reflections.forEach(() => addToken());
}

function updateStreak() {
  streak++;
  localStorage.setItem("streak", streak);
  streakDisplay.textContent = streak;
}
