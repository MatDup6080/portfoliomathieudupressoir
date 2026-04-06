// Gestion du thème
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Charger le thème depuis le localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// Gestion du menu mobile
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Fermer le menu en cliquant sur un lien
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Effet de défilement fluide pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation de texte dynamique — thème Cybersécurité
const typingText = document.getElementById('typingText');
const texts = [
    'Développeur Full-Stack',
    'Passionné par la cybersécurité et les réseaux',
    'Explorateur des failles, des pare-feux et du chiffrement'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Démarrer l'effet de frappe
setTimeout(typeEffect, 1000);

// Highlight du menu en fonction du défilement
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animation au défilement
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

const elementsToAnimate = document.querySelectorAll('.access-card, .tech-item, .contact-item');
elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Gestion des cartes
const accessCards = document.querySelectorAll('.access-card');
accessCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const arrow = card.querySelector('.card-arrow');
        if (arrow) arrow.style.transform = 'translateX(10px)';
    });

    card.addEventListener('mouseleave', () => {
        const arrow = card.querySelector('.card-arrow');
        if (arrow) arrow.style.transform = 'translateX(0)';
    });
});

// Précharger les ressources importantes
window.addEventListener('load', () => {
    console.log('Veille Cybersécurité chargée avec succès !');
    document.body.classList.add('page-loaded');
});

// Boutons de défilement du menu
document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('navMenu');
    const navScrollLeft = document.getElementById('navScrollLeft');
    const navScrollRight = document.getElementById('navScrollRight');
    const SCROLL_STEP = 200;

    if (!navMenu || !navScrollLeft || !navScrollRight) return;

    function updateScrollButtons() {
        navScrollLeft.disabled = navMenu.scrollLeft <= 0;
        navScrollRight.disabled = navMenu.scrollLeft + navMenu.clientWidth >= navMenu.scrollWidth - 1;
    }

    navScrollLeft.addEventListener('click', () => {
        navMenu.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
        setTimeout(updateScrollButtons, 350);
    });

    navScrollRight.addEventListener('click', () => {
        navMenu.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
        setTimeout(updateScrollButtons, 350);
    });

    navMenu.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons();
});