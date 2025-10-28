// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  
  // --- Set current year in footer ---
  const currentYearEl = document.getElementById("current-year");
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById("theme-toggle");
  const bodyEl = document.body;

  // Function to update sun/moon icon visibility
  function updateToggleIcons(isDarkMode) {
      const sunIcon = document.querySelector('.sun-icon');
      const moonIcon = document.querySelector('.moon-icon');
      if (!sunIcon || !moonIcon) return; // Exit if icons not found

      if (isDarkMode) {
          // Dark Mode Active: Show Sun icon, hide Moon icon
          moonIcon.style.transform = 'scale(0) rotate(90deg)';
          moonIcon.style.opacity = '0';
          sunIcon.style.transform = 'scale(1) rotate(0)';
          sunIcon.style.opacity = '1';
      } else {
          // Light Mode Active: Show Moon icon, hide Sun icon
          sunIcon.style.transform = 'scale(0) rotate(-90deg)';
          sunIcon.style.opacity = '0';
          moonIcon.style.transform = 'scale(1) rotate(0)';
          moonIcon.style.opacity = '1';
      }
  }

  // On page load, set theme based on localStorage or default to dark
  let isDarkModeOnLoad = false;
  if (localStorage.theme === "light") {
    bodyEl.classList.remove("dark");
    bodyEl.classList.add("light");
    isDarkModeOnLoad = false;
  } else {
    // Default to dark if 'light' not set or no setting exists
    bodyEl.classList.remove("light"); // Ensure light is removed
    bodyEl.classList.add("dark");
    isDarkModeOnLoad = true;
    if (!localStorage.theme) {
        localStorage.theme = "dark"; // Set default in storage if none exists
    }
  }
  
  // Update toggle icon visibility on initial load
  updateToggleIcons(isDarkModeOnLoad);

  // Add click listener for the theme toggle button
  themeToggle.addEventListener("click", () => {
    let isNowDark;
    if (bodyEl.classList.contains("dark")) {
      // Switch to Light
      bodyEl.classList.remove("dark");
      bodyEl.classList.add("light");
      localStorage.theme = "light";
      isNowDark = false;
    } else {
      // Switch to Dark
      bodyEl.classList.remove("light");
      bodyEl.classList.add("dark");
      localStorage.theme = "dark";
      isNowDark = true;
    }
    // Update visuals after toggle
    updateToggleIcons(isNowDark);
  });
  

  // --- Mobile Menu Toggle Logic ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navMenu = document.getElementById("nav-menu");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("menu-open");
    navMenu.classList.toggle("mobile-menu-open");
  });

  // Close mobile menu when a nav link is clicked
  const mobileNavLinks = document.querySelectorAll("#nav-menu .nav-link");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("mobile-menu-open")) {
        mobileMenuBtn.classList.remove("menu-open");
        navMenu.classList.remove("mobile-menu-open");
      }
    });
  });

  // --- Typed.js Logic (Hero Section Subtitle) ---
  const typedElement = document.getElementById("typed-text");
  if (typedElement) {
      const typed = new Typed("#typed-text", {
        strings: [
          "Python Developer.",
          "Full-Stack Developer.",
          "Data Analyst.",
          "Flutter Developer.",
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
        smartBackspace: true
      });
  }


  // --- Active Nav Link & Header Scroll Logic ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link"); // Target links inside nav-menu
  const header = document.getElementById("header");
  let lastScrollY = window.scrollY;
  const headerHeight = header.offsetHeight;

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const currentScrollY = window.scrollY;

    // Header Shadow on Scroll
    if (window.scrollY > 10) {
      header.classList.add("header-shadow");
    } else {
      header.classList.remove("header-shadow");
    }
    
    // Header Auto-Hide Logic
    if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
        header.classList.add("header-hidden");
    } else {
        header.classList.remove("header-hidden");
    }
    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY; 


    // Determine Current Section for Nav Highlight
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 50; 
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (currentScrollY >= sectionTop && currentScrollY < sectionBottom) {
        currentSectionId = section.getAttribute("id");
      }
    });
    
    // Fallback for when at the very top
    if (currentScrollY < 300) { 
        currentSectionId = "home";
    }


    // Update 'active' class on Navigation Links
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSectionId) {
        link.classList.add("active");
      }
    });
  });

  // --- Intersection Observer for Scroll Animations (Simple Fade-in) ---
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing
        }
      });
    },
    {
      rootMargin: "0px 0px -50px 0px", // Start animation a bit early
      threshold: 0.1, 
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

}); // End DOMContentLoaded