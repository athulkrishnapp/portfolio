// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'dark') {
    document.body.classList.add('dark');
} else {
    document.body.classList.remove('dark');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
const allLinks = document.querySelectorAll('a[href^="#"]');
allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 64; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
const navHeader = document.getElementById('nav-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 20) {
        navHeader.classList.add('scrolled');
    } else {
        navHeader.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll('.section, .project-card, .skill-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Prevent hero section from being animated
const heroSection = document.querySelector('.hero-section .hero-content');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}

// --- NEW: Typed.js Logic (Hero Section Title) ---
document.addEventListener("DOMContentLoaded", function () {
    const heroNameTyped = document.getElementById("hero-name");
    if (heroNameTyped) {
        const typed = new Typed("#hero-name", {
            strings: ["Athulkrishna PP"],
            typeSpeed: 70, // Speed of typing
            backSpeed: 50, // Speed of erasing
            backDelay: 2000, // Pause before erasing (2 seconds)
            loop: true, // Set to true to loop infinitely
            showCursor: true, // Show the typing cursor
            cursorChar: '|',
            autoInsertCss: true // Let Typed.js handle the cursor blinking
        });
    }
});