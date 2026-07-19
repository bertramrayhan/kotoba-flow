// toast.js
const ICONS = {
  success: "check_circle",
  error: "error",
  info: "info",
};

let toastTimeout;

export function showToast(message, type = "success", duration = 2500) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  // Remove existing toast if any (avoid stacking)
  const existing = container.querySelector(".toast");
  if (existing) {
    existing.remove();
    clearTimeout(toastTimeout);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined toast-icon text-[20px]">${ICONS[type] || ICONS.info}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Auto-dismiss
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 250);
  }, duration);
}