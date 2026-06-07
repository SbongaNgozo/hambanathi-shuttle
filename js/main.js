/* HAMBANATHI — Main JS */

// ── Navbar scroll state ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
}, { passive: true });

// ── Mobile nav toggle ──
const toggle = document.getElementById('navToggle');
const menu   = document.getElementById('navMenu');

const closeMenu = () => {
    if (menu)   menu.classList.remove('open');
    if (toggle) {
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('no-scroll');
};

const openMenu = () => {
    if (menu)   menu.classList.add('open');
    if (toggle) {
        toggle.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
    }
    document.body.classList.add('no-scroll');
};

if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close on any nav link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Close when clicking the overlay background (not on links)
if (menu) {
    menu.addEventListener('click', (e) => {
        // If they clicked the overlay itself (not a child link), close
        if (e.target === menu) closeMenu();
    });
}

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (menu && menu.classList.contains('open')) {
        if (!menu.contains(e.target) && toggle && !toggle.contains(e.target)) {
            closeMenu();
        }
    }
});

// Reset on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
}, { passive: true });

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
        if (window.scrollY >= section.offsetTop - 140) current = section.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}, { passive: true });