const RJ_INVENTORY_KEY = "rj_inventory";

// --- Helpers ---

function getReflectionCount() {
  try {
    const stored = JSON.parse(localStorage.getItem("reflections") || "[]");
    return Array.isArray(stored) ? stored.length : 0;
  } catch (e) {
    return 0;
  }
}

function getInventory() {
  try {
    const inv = JSON.parse(localStorage.getItem(RJ_INVENTORY_KEY) || "[]");
    return Array.isArray(inv) ? inv : [];
  } catch (e) {
    return [];
  }
}

function setInventory(inv) {
  localStorage.setItem(RJ_INVENTORY_KEY, JSON.stringify(inv));
}

function getTokens() {
  return parseInt(localStorage.getItem("totalTokens") || "0");
}

function setTokens(amount) {
  localStorage.setItem("totalTokens", amount);
}

function updateTokenDisplay() {
  const el = document.getElementById("tokenDisplay");
  if (el) {
    el.textContent = `Tokens: ${getTokens()}`;
  }
}

function markOwnedItems() {
  const inv = getInventory();
  document.querySelectorAll(".shop-item").forEach(card => {
    const name = card.dataset.name;
    const btn = card.querySelector(".buy-btn");
    if (!btn) return;

    if (inv.includes(name)) {
      btn.textContent = "OWNED";
      btn.disabled = true;
    } else {
      btn.textContent = "BUY";
      btn.disabled = false;
    }
  });
}

// --- Purchase Handling ---

document.querySelectorAll(".buy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".shop-item");
    if (!card) return;

    const name = card.dataset.name;
    const cost = parseInt(card.dataset.cost, 10) || 1;

    const available = getTokens();
    if (available < cost) {
      alert("Not enough tokens to buy this item.");
      return;
    }

    //deduct tokens
    setTokens(available - cost);

    //add item to inventory
    const inv = getInventory();
    if (!inv.includes(name)) {
      inv.push(name);
      setInventory(inv);
    }

    //refresh UI
    updateTokenDisplay();
    markOwnedItems();
  });
});

// --- Back Button ---

const backBtn = document.getElementById("backBtn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// --- Init on load ---

updateTokenDisplay();
markOwnedItems();