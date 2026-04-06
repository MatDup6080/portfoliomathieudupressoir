// ─── 1. THÈME CLAIR / SOMBRE ────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-theme')) {
            icon?.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon?.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Restaurer le thème sauvegardé
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        const icon = themeToggle?.querySelector('i');
        icon?.classList.replace('fa-moon', 'fa-sun');
    }
});


// ─── 2. MENU MOBILE ─────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.add('active');
    document.body.style.overflow = 'hidden';
});

menuClose?.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
    mobileMenu?.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fermer sur clic d'un lien mobile
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Fermer en cliquant hors du menu (sur l'overlay)
mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
});


// ─── 3. DÉFILEMENT FLUIDE (ANCRES) ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// ─── 4. TYPING EFFECT — PORTFOLIO ───────────────────────────
const typingText = document.getElementById('typingText');

if (typingText) {
    const texts = [
        'Etudiant BTS SIO,',
        'Passionné par la cybersécurité: ',
        'La sécurité des applications',
        'La sécurité des réseaux '
        
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];

        typingText.textContent = isDeleting
            ? currentText.substring(0, charIndex - 1)
            : currentText.substring(0, charIndex + 1);

        isDeleting ? charIndex-- : charIndex++;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;       // pause avant suppression
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;       // pause avant nouveau mot
        }

        setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 1000);
}


// ─── 5. HIGHLIGHT DU MENU AU SCROLL ─────────────────────────
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.getAttribute('id');
        }
    });

    ['.nav-link', '.mobile-nav-link'].forEach(selector => {
        document.querySelectorAll(selector).forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href')?.substring(1) === current
            );
        });
    });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });


// ─── 6. BARRE DE PROGRESSION DE LECTURE ─────────────────────
const progressBar = document.getElementById('readingProgress');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
}


// ─── 7. ANIMATIONS AU SCROLL (INTERSECTION OBSERVER) ────────
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
        }
    });
}, observerOptions);

const animatedSelectors = [
    '.project-card',
    '.skill-item',
    '.tech-item',
    '.contact-item',
    '.about-block',
    '.timeline-item'
];

document.querySelectorAll(animatedSelectors.join(', ')).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
});

// Ajouter la classe CSS qui déclenche l'animation
document.head.insertAdjacentHTML('beforeend', `
<style>
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
</style>
`);


// ─── 8. HOVER INTERACTIF SUR LES CARTES PROJET ──────────────
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.card-arrow')?.style.setProperty('transform', 'translateX(8px)');
        card.querySelector('.card-overlay')?.style.setProperty('opacity', '1');
    });
    card.addEventListener('mouseleave', () => {
        card.querySelector('.card-arrow')?.style.setProperty('transform', 'translateX(0)');
        card.querySelector('.card-overlay')?.style.setProperty('opacity', '0');
    });
});


// ─── 9. FILTRE DES PROJETS PAR CATÉGORIE ────────────────────
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card[data-category]');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        projectCards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.style.display = match ? '' : 'none';
        });
    });
});


// ─── 10. COMPTEUR ANIMÉ (STATISTIQUES) ──────────────────────
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = current.toLocaleString('fr-FR');
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => {
    counterObserver.observe(el);
});


// ─── 11. FORMULAIRE DE CONTACT ───────────────────────────────
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('[type="submit"]');
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Validation simple
        if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
            showFormMessage('Veuillez remplir tous les champs.', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            showFormMessage('Adresse e-mail invalide.', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi…';

        try {
            // Remplacez l'URL par votre endpoint réel
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                showFormMessage('Message envoyé avec succès ! 🎉', 'success');
                contactForm.reset();
            } else {
                throw new Error('Réponse serveur non OK');
            }
        } catch {
            showFormMessage('Une erreur est survenue. Réessayez plus tard.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer';
        }
    });
}

function showFormMessage(msg, type) {
    let msgEl = document.getElementById('formMessage');
    if (!msgEl) {
        msgEl = document.createElement('p');
        msgEl.id = 'formMessage';
        contactForm.appendChild(msgEl);
    }
    msgEl.textContent = msg;
    msgEl.className = `form-message form-message--${type}`;
    setTimeout(() => { msgEl.textContent = ''; }, 5000);
}


// ─── 12. COPIER L'E-MAIL AU CLIC ────────────────────────────
document.querySelectorAll('[data-copy-email]').forEach(el => {
    el.addEventListener('click', () => {
        const email = el.dataset.copyEmail;
        navigator.clipboard.writeText(email).then(() => {
            const original = el.textContent;
            el.textContent = 'Copié !';
            setTimeout(() => { el.textContent = original; }, 2000);
        });
    });
});


// ─── 13. NAVBAR : OMBRE AU SCROLL ───────────────────────────
const navbar = document.querySelector('nav, header, .navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
}


// ─── 14. CHARGEMENT ─────────────────────────────────────────
window.addEventListener('load', () => {
    console.log('Portfolio chargé avec succès !');
    document.body.classList.add('page-loaded');

    // Retirer l'écran de chargement s'il existe
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.4s ease';
        setTimeout(() => loader.remove(), 400);
    }
});