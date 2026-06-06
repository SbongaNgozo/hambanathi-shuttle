/* HAMBANATHI - Main JS */

// ── Navbar scroll state ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
}, { passive: true });

// ── Mobile nav toggle ──
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');

const closeMenu = (e) => {
    if (e) e.stopPropagation();
    
    // Remove active classes
    if (menu) menu.classList.remove('open');
    if (toggle) toggle.classList.remove('open');
    
    // Explicitly reset body scroll
    document.body.style.overflow = '';
};

// Toggle handler
if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        
        // Smoothly toggle scroll lock
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking ANY link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu(e);
        });
    });
}

// Anti-freeze: Close menu if user clicks outside the menu or toggle
document.addEventListener('click', (e) => {
    if (menu && menu.classList.contains('open')) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            closeMenu();
        }
    }
});

// Safeguard: Reset if window resizes (tablet to desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu && menu.classList.contains('open')) {
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