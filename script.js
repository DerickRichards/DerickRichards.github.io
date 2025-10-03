// =======================
// PORTFOLIO MAIN SCRIPT
// =======================

// Navbar
const navbar = document.getElementById("navbar");

// Smooth scrolling with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      const offset = navbar ? navbar.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset - 10;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      obs.unobserve(entry.target); // Stop observing after animation
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card, .skill-card, .fade-in").forEach(el => {
  observer.observe(el);
});

// Scroll-to-top button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dark/Light mode toggle with localStorage
const toggleThemeBtn = document.getElementById("toggleTheme");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}

// Toggle theme
toggleThemeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
