/* ================================================
   GENSYTECH — INTERACTIVE SCRIPTS
   Particles.js, Scroll Animations, Counters,
   FAQ Accordion, Chatbot Demo, Mobile Nav
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // PARTICLES.JS CONFIGURATION
    // ===========================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },
                color: {
                    value: ['#F7931E', '#FF3C3C', '#FF7043', '#ffffff']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.8,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 160,
                    color: '#F7931E',
                    opacity: 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 180,
                        line_linked: {
                            opacity: 0.35
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }

    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavbar() {
        const scroll = window.pageYOffset;
        if (scroll > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
        lastScroll = scroll;
    }

    window.addEventListener('scroll', handleNavbar, { passive: true });

    // ===========================
    // MOBILE SIDEBAR LOGIC
    // ===========================
    const hamburger = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarLinks = document.querySelectorAll('.sidebar__link');

    function toggleSidebar(open) {
        if (open) {
            sidebar.classList.add('active');
            hamburger.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            sidebar.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            const isOpen = sidebar.classList.contains('active');
            toggleSidebar(!isOpen);
        });
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            toggleSidebar(false);
        });
    }

    // Close sidebar on link click
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleSidebar(false);
        });
    });

    // Close on click outside (on the sidebar background)
    sidebar.addEventListener('click', (e) => {
        if (e.target === sidebar) {
            toggleSidebar(false);
        }
    });

    // ===========================
    // SCROLL REVEAL ANIMATIONS
    // ===========================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===========================
    // ANIMATED STAT COUNTERS
    // ===========================
    const statNumbers = document.querySelectorAll('.stat-card__number');
    let statsCounted = false;

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const statsSection = document.getElementById('social-proof');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsCounted) {
                    statsCounted = true;
                    statNumbers.forEach(el => animateCounter(el));
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // ===========================
    // FAQ ACCORDION
    // ===========================
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===========================
    // CHATBOT DEMO
    // ===========================
    const chatBody = document.getElementById('chatBody');
    const chatOptions = document.getElementById('chatOptions');

    if (chatOptions) {
        const optionButtons = chatOptions.querySelectorAll('.demo__chat-option');

        optionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                const answer = btn.getAttribute('data-answer');

                // Add user message
                const userMsg = document.createElement('div');
                userMsg.className = 'demo__msg demo__msg--user';
                userMsg.innerHTML = `<p>${question}</p>`;
                chatBody.appendChild(userMsg);

                // Disable button
                btn.style.opacity = '0.5';
                btn.style.pointerEvents = 'none';

                // Auto scroll
                chatBody.scrollTop = chatBody.scrollHeight;

                // Add typing indicator
                const typingMsg = document.createElement('div');
                typingMsg.className = 'demo__msg demo__msg--bot';
                typingMsg.innerHTML = `<p style="opacity:0.6">Typing...</p>`;
                chatBody.appendChild(typingMsg);
                chatBody.scrollTop = chatBody.scrollHeight;

                // Bot reply after delay
                setTimeout(() => {
                    typingMsg.remove();
                    const botMsg = document.createElement('div');
                    botMsg.className = 'demo__msg demo__msg--bot';
                    botMsg.innerHTML = `<p>${answer}</p>`;
                    chatBody.appendChild(botMsg);
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1200);
            });
        });
    }

    // ===========================
    // SMOOTH SCROLL FOR ANCHORS
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===========================
    // ACTIVE SECTION HIGHLIGHTING
    // ===========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // We use isIntersecting but also check if it's more than 10% visible
            // to avoid flickering on section boundaries
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Only highlight if the id is in our nav menu
                const link = document.querySelector(`.navbar__link[href="#${id}"]`);
                if (link) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }, {
        // Look at the middle 40% of the viewport
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0
    });

    sections.forEach(section => sectionObserver.observe(section));

    // ===========================
    // HERO CURSOR GLOW EFFECT
    // ===========================
    const hero = document.getElementById('hero');
    const cursorGlow = document.getElementById('cursorGlow');

    if (hero && cursorGlow) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            cursorGlow.style.left = `${x}px`;
            cursorGlow.style.top = `${y}px`;
            cursorGlow.classList.add('active');
        });

        hero.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
        });
    }

});
