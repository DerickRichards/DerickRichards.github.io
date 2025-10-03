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

  // Scroll Progress Bar
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";

  // Scroll-to-Top Button
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
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

// Scroll-to-Top Button functionality
const scrollTopBtn = document.getElementById("scrollTopBtn");
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dark/Light mode toggle with localStorage & system preference
const toggleThemeBtn = document.getElementById("toggleTheme");
const bodyEl = document.body;

function setToggleButtonIcon(isDark) {
  if (toggleThemeBtn) {
    toggleThemeBtn.textContent = isDark ? "☀️" : "🌙";
    toggleThemeBtn.setAttribute("aria-pressed", String(isDark));
    toggleThemeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    toggleThemeBtn.title = isDark ? "Light mode" : "Dark mode";
  }
}

function applyTheme(theme) {
  if (theme === "dark") {
    bodyEl.classList.add("dark-mode");
    setToggleButtonIcon(true);
  } else {
    bodyEl.classList.remove("dark-mode");
    setToggleButtonIcon(false);
  }
}

// Determine initial theme:
// 1. localStorage if available
// 2. else default to 'dark' mode
const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = saved ? saved : 'dark';

applyTheme(initialTheme); // apply on load

// Toggle handler
if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener("click", () => {
    const isDark = bodyEl.classList.toggle("dark-mode");
    const newTheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setToggleButtonIcon(isDark);
  });
}

// Ensure button has ARIA defaults in case JS loads later
if (toggleThemeBtn && !toggleThemeBtn.hasAttribute("aria-pressed")) {
  toggleThemeBtn.setAttribute("aria-pressed", String(bodyEl.classList.contains("dark-mode")));
  toggleThemeBtn.setAttribute("aria-label", bodyEl.classList.contains("dark-mode") ? "Switch to light theme" : "Switch to dark theme");
}
