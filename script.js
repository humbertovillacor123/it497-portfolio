const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const animatedItems = document.querySelectorAll(".fade-in, .fade-in-delayed");
const sections = document.querySelectorAll("main section[id], .hero[id]");
const glowOne = document.querySelector(".background-glow-1");
const glowTwo = document.querySelector(".background-glow-2");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -40px 0px",
  }
);

animatedItems.forEach((item) => observer.observe(item));

function setActiveLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href").replace("#", "");
    if (href === current) {
      link.classList.add("active");
    }
  });
}

function animateBackgroundGlow() {
  const scrollY = window.scrollY;

  if (glowOne) {
    glowOne.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
  }

  if (glowTwo) {
    glowTwo.style.transform = `translate3d(0, ${scrollY * -0.06}px, 0)`;
  }
}

window.addEventListener("scroll", () => {
  setActiveLink();
  animateBackgroundGlow();
});

window.addEventListener("load", () => {
  setActiveLink();
  animateBackgroundGlow();
});

console.log("Portfolio loaded");
