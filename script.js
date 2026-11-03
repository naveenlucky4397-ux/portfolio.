const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector("#nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.innerHTML = open ? 'Menu <span>＋</span>' : 'Close <span>−</span>';
    links.classList.toggle("open", !open);
  });
  links.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = 'Menu <span>＋</span>';
    links.classList.remove("open");
  }));
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
