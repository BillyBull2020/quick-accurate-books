// Quick Accurate Books - GSAP Animations
// Clean, fast implementation

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Detect mobile for animation adjustments
const isMobile = window.innerWidth <= 768;

// // ===== HERO ANIMATIONS - Run immediately =====
if (typeof gsap !== 'undefined') {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
        .to('.hero-title span', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15
        })
        .to('.hero-subtitle', {
            opacity: 1,
            duration: 0.6
        }, '-=0.4')
        .to('.hero-description', {
            opacity: 1,
            duration: 0.6
        }, '-=0.3')
        .to('.hero-buttons', {
            opacity: 1,
            duration: 0.6
        }, '-=0.3')
        .to('.hero-trust-badges', {
            opacity: 1,
            y: 0,
            duration: 0.6
        }, '-=0.3')
        .to('.floating-card', {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15
        }, '-=0.4');

    // ===== SCROLL-TRIGGERED ANIMATIONS =====

    // Certifications Section
    gsap.from('.cert-card', {
        scrollTrigger: {
            trigger: '.certifications',
            start: 'top 75%'
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15
    });

    // Services Section
    gsap.from('.services .section-header', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.6
    });

    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 75%'
        },
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1
    });

    // About Section
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%'
        },
        opacity: 0,
        x: isMobile ? 0 : -50,
        duration: 0.8
    });

    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%'
        },
        opacity: 0,
        x: isMobile ? 0 : 50,
        duration: 0.8
    });

    // Exclusions Section
    gsap.from('.exclusions-text', {
        scrollTrigger: {
            trigger: '.exclusions',
            start: 'top 70%'
        },
        opacity: 0,
        x: -40,
        duration: 0.8
    });

    gsap.from('.focus-badge', {
        scrollTrigger: {
            trigger: '.exclusions',
            start: 'top 70%'
        },
        opacity: 0,
        scale: 0.5,
        rotation: -180,
        duration: 1,
        ease: 'back.out(1.5)'
    });

    // Testimonials Section
    gsap.from('.testimonials .section-header', {
        scrollTrigger: {
            trigger: '.testimonials',
            start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.6
    });

    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 75%'
        },
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.15
    });

    // Location Section
    gsap.from('.location-text', {
        scrollTrigger: {
            trigger: '.location',
            start: 'top 70%'
        },
        opacity: 0,
        x: isMobile ? 0 : -40,
        duration: 0.8
    });

    gsap.from('.map-visual', {
        scrollTrigger: {
            trigger: '.location',
            start: 'top 70%'
        },
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: 'back.out(1.5)'
    });

    // Contact Section
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%'
        },
        opacity: 0,
        x: isMobile ? 0 : -40,
        duration: 0.8
    });

    gsap.from('.contact-card', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%'
        },
        opacity: 0,
        x: isMobile ? 0 : 40,
        duration: 0.8
    });

    // ===== BUTTON HOVER EFFECTS =====
    document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.05, duration: 0.2 });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.2 });
        });
    });

    // ===== SERVICE CARD HOVER =====
    document.querySelectorAll('.service-card').forEach(card => {
        const icon = card.querySelector('.service-icon');
        card.addEventListener('mouseenter', () => {
            gsap.to(icon, { scale: 1.2, rotation: 10, duration: 0.3, ease: 'back.out(1.5)' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3 });
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
console.log('✅ Quick Accurate Books animations loaded');

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent document click from immediately closing
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Support for bfcache so it doesn't get stuck open when returning via the back button
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}


// ===== EXIT INTENT POPUP =====
const exitPopup = document.getElementById('exit-popup');
const exitPopupClose = document.querySelector('.exit-popup-close');
const exitPopupDismiss = document.querySelector('.exit-popup-dismiss');
const exitPopupOverlay = document.querySelector('.exit-popup-overlay');

let hasShownPopup = false;

// Show popup when mouse leaves the viewport (desktop only)
if (window.innerWidth > 768) {
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !hasShownPopup && !localStorage.getItem('exitPopupDismissed')) {
            exitPopup.classList.add('active');
            hasShownPopup = true;
        }
    });
}

// Close popup functions
function closeExitPopup() {
    exitPopup.classList.remove('active');
    localStorage.setItem('exitPopupDismissed', 'true');
}

if (exitPopupClose) {
    exitPopupClose.addEventListener('click', closeExitPopup);
}

if (exitPopupDismiss) {
    exitPopupDismiss.addEventListener('click', closeExitPopup);
}

if (exitPopupOverlay) {
    exitPopupOverlay.addEventListener('click', closeExitPopup);
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Send to Formspree (you'll need to replace with actual form ID)
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                submitBtn.textContent = '✓ Message Sent!';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            submitBtn.textContent = 'Error - Try Again';
            submitBtn.disabled = false;
            setTimeout(() => {
                submitBtn.textContent = originalText;
            }, 3000);
        }
    });
}

// ===== NEWSLETTER FORM HANDLING =====
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[name="newsletter-email"]');
        const submitBtn = newsletterForm.querySelector('button');
        const originalText = submitBtn.textContent;

        // For now, just show success (you can integrate with Mailchimp later)
        submitBtn.textContent = '✓ Subscribed!';
        emailInput.value = '';

        setTimeout(() => {
            submitBtn.textContent = originalText;
        }, 3000);
    });
}

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Loading overlay has been removed for better performance

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== ANIMATED STATS COUNTER =====
function animateCounter(element, target, suffix = '') {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Animate stats when they come into view
const statValues = document.querySelectorAll('.stat-value');
if (statValues.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const hasHr = text.includes('hr');

                let number = parseInt(text.replace(/[^0-9]/g, ''));
                let suffix = '';

                if (hasPlus) suffix = '+';
                if (hasPercent) suffix = '%';
                if (hasHr) suffix = 'hr';

                entry.target.textContent = '0' + suffix;
                animateCounter(entry.target, number, suffix);

                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => statsObserver.observe(stat));
}
