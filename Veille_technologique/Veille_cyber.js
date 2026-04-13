document.addEventListener('DOMContentLoaded', () => {

    // ===== THÈME =====
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const icon = themeToggle.querySelector('i');
            if (body.classList.contains('dark-theme')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            const icon = themeToggle.querySelector('i');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // ===== MENU MOBILE =====
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }

    if (menuClose && mobileMenu) {
        menuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        });
    }

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // ===== DÉFILEMENT FLUIDE ANCRES =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ===== EFFET DE FRAPPE =====
    const typingText = document.getElementById('typingText');
    if (typingText) {
        const texts = [
            'Etudiant BTS SIO,',
            'Passionné par la cybersécurité: ',
            'La sécurité des applications',
            'La sécurité des réseaux '
        ];
        let textIndex = 0, charIndex = 0, isDeleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];
            typingText.textContent = isDeleting
                ? currentText.substring(0, charIndex - 1)
                : currentText.substring(0, charIndex + 1);
            isDeleting ? charIndex-- : charIndex++;

            let typeSpeed = isDeleting ? 50 : 100;
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            setTimeout(typeEffect, typeSpeed);
        }
        setTimeout(typeEffect, 1000);
    }

    // ===== HIGHLIGHT MENU SELON LA PAGE COURANTE =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    function setActiveLinks(selector) {
        document.querySelectorAll(selector).forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href').split('/').pop().split('#')[0];
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }

    setActiveLinks('.nav-link');
    setActiveLinks('.mobile-nav-link');

    // ===== ANIMATIONS AU SCROLL =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.access-card, .tech-item, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // ===== CARTES HOVER =====
    document.querySelectorAll('.access-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const arrow = card.querySelector('.card-arrow');
            if (arrow) arrow.style.transform = 'translateX(10px)';
        });
        card.addEventListener('mouseleave', () => {
            const arrow = card.querySelector('.card-arrow');
            if (arrow) arrow.style.transform = 'translateX(0)';
        });
    });

    // ===== BOUTONS DE DÉFILEMENT DU MENU =====
    const navMenu = document.getElementById('navMenu');
    const navScrollLeft = document.getElementById('navScrollLeft');
    const navScrollRight = document.getElementById('navScrollRight');

    if (navMenu && navScrollLeft && navScrollRight) {
        const SCROLL_STEP = 180;

        function updateButtons() {
            navScrollLeft.disabled = navMenu.scrollLeft <= 0;
            navScrollRight.disabled = navMenu.scrollLeft + navMenu.clientWidth >= navMenu.scrollWidth - 1;
        }

        navScrollLeft.addEventListener('click', () => {
            navMenu.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
            setTimeout(updateButtons, 400);
        });

        navScrollRight.addEventListener('click', () => {
            navMenu.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
            setTimeout(updateButtons, 400);
        });

        navMenu.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        updateButtons();
    }

    console.log('Veille Cybersécurité chargée avec succès !');
    body.classList.add('page-loaded');

});