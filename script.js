(function () {
  const themeToggle = document.querySelector(".theme-toggle");
  const yearEl = document.getElementById("copyright-year");
  const sectionIds = ["about", "skills", "projects"];
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const storageKey = "profile-theme";

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("theme-dark", isDark);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.textContent = isDark ? "Use light theme" : "Use dark theme";
    }
  }

  function preferredTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  applyTheme(preferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const next = document.body.classList.contains("theme-dark")
        ? "light"
        : "dark";
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const sections = sectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            const isCurrent = link.getAttribute("href") === "#" + id;
            if (isCurrent) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();

console.log("JavaScript connected");