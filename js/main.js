/* HAMBANATHI - Main JS */

// ── Navbar scroll state ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile nav toggle ──
const toggle = document.getElementById('navToggle');
const menu   = document.getElementById('navMenu');

const closeMenu = () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    document.body.style.overflow = '';
};

toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

// Close menu when clicking ANY link inside it (including the Book A Ride CTA)
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Safeguard: Reset body scroll constraints if window scales wide while open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu.classList.contains('open')) {
        closeMenu();
    }
});

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        if (targetId === `#${current}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}, { passive: true });