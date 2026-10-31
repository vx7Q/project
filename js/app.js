const translations = {
  th: "เว็บทดลอง",
  en: "Test Website",
  zh: "测试网站",
};

document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");
  const desc = document.getElementById("desc");
  const langBtns = document.querySelectorAll(".lang-btn");
  const themeBtn = document.getElementById("themeBtn");
  const particles = document.getElementById("particles");
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");

  // Click to enter
  if (intro) {
    intro.addEventListener("click", () => {
      intro.classList.add("hidden");
      setTimeout(() => {
        if (main) {
          main.classList.remove("hidden");
          main.classList.add("visible");
        }
        document.body.style.overflow = "auto";
      }, 400);
    });
  }

  // Language switching
  function setLanguage(lang) {
    langBtns.forEach((b) => b.classList.remove("active"));
    const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
    if (activeBtn) activeBtn.classList.add("active");
    if (desc && translations[lang]) {
      desc.style.opacity = "0";
      setTimeout(() => {
        desc.textContent = translations[lang];
        desc.style.opacity = "1";
      }, 200);
    }
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    localStorage.setItem("lang", lang);
  }

  langBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });

  const savedLang = localStorage.getItem("lang") || "th";
  setLanguage(savedLang);

  // Theme toggle
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeBtn) themeBtn.textContent = "Dark";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      themeBtn.textContent = isDark ? "Dark" : "Light";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // Floating particles
  if (particles) {
    for (let i = 0; i < 15; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = 3 + Math.random() * 4;
      p.style.width = p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "vw";
      p.style.animationDelay = Math.random() * 12 + "s";
      p.style.animationDuration = (8 + Math.random() * 6) + "s";
      particles.appendChild(p);
    }
  }

  // Scroll progress bar
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = progress + "%";
  }, { passive: true });

  // Back to top button
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) backToTop.classList.add("visible");
      else backToTop.classList.remove("visible");
    }, { passive: true });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});