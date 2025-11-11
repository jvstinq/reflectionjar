document.getElementById("writeBtn").addEventListener("click", () => {
  document.getElementById("popup").style.display = "flex";
});

document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

document.getElementById("submitBtn").addEventListener("click", () => {
  const reflection = document.getElementById("reflectionText").value;
  if (reflection.trim()) {
    alert("Reflection submitted: " + reflection);
    document.getElementById("reflectionText").value = "";
    document.getElementById("popup").style.display = "none";
  }
});
