const menuToggle = document.querySelector("[data-menu-toggle]");
const navMenu = document.querySelector("#primary-navigation");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  if (!menuToggle || !navMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navMenu.classList.remove("is-open");
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navMenu.classList.toggle("is-open", !isOpen);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });
}

// Update the copyright year automatically.
const yearElement = document.querySelector("#current-year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Reveal content as it enters the viewport. Content remains visible
// automatically in browsers that do not support IntersectionObserver.
const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && revealItems.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}
