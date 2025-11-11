document.getElementById("writeBtn").addEventListener("click", () => {
  document.getElementById("popup").style.display = "flex";
});

document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

let prompts = [];

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    prompts = data.prompts || [];
    console.log("Prompts loaded:", prompts);
  })
  .catch(error => console.error("Error loading prompts:", error));

document.getElementById("promptBtn").addEventListener("click", () => {
  if (prompts.length > 0) {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    document.getElementById("promptText").textContent = randomPrompt;
  } else {
    document.getElementById("promptText").textContent =
      "Loading prompts... please try again.";
  }
});

document.getElementById("submitBtn").addEventListener("click", () => {
  const reflection = document.getElementById("reflectionText").value;
  if (reflection.trim()) {
    alert("Reflection submitted: " + reflection);
    document.getElementById("reflectionText").value = "";
    document.getElementById("popup").style.display = "none";
  }
});
