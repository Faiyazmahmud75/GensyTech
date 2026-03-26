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
                    value: ['#FF5722', '#E64A19', '#FF8A65', '#9E9E9E']
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
                    color: '#FF5722',
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

    // ===========================
    // PREMIUM BOOKING SYSTEM (Timezone Aware)
    // ===========================
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        const calendarDates = document.getElementById('calendarDates');
        const currentMonthStr = document.getElementById('currentMonthStr');
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        const timeSlotsContainer = document.getElementById('timeSlots');
        const selectedDateDisplay = document.getElementById('selectedDateDisplay');
        const goToStep2Btn = document.getElementById('goToStep2');
        const bookingForm = document.getElementById('bookingForm');
        const step1 = document.getElementById('step1');
        const step2 = document.getElementById('step2');
        const step3 = document.getElementById('step3');
        const backToStep1 = document.getElementById('backToStep1');
        const finalSelectedDateTime = document.getElementById('finalSelectedDateTime');
        const resetBooking = document.getElementById('resetBooking');
        const timezoneSelect = document.getElementById('timezone');

        let currentDate = new Date();
        let selectedDate = null;
        let selectedTimeSlot = null; // Store as { dhakaHour, localDisplay }
        let selectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Dhaka Availability (All 24 hours)
        const dhakaSlots = Array.from({ length: 24 }, (_, i) => i);

        // Major Timezones
        const majorTimezones = [
            "UTC", "Asia/Dhaka", "Asia/Dubai", "Asia/Hong_Kong", "Asia/Kolkata", "Asia/Singapore", 
            "Asia/Tokyo", "Australia/Sydney", "Europe/Berlin", "Europe/London", "Europe/Paris", 
            "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Sao_Paulo"
        ];

        function initTimezoneSelect() {
            // Add detected timezone if not in major list
            if (!majorTimezones.includes(selectedTimezone)) {
                majorTimezones.push(selectedTimezone);
            }
            majorTimezones.sort();
            
            timezoneSelect.innerHTML = majorTimezones.map(tz => 
                `<option value="${tz}" ${tz === selectedTimezone ? 'selected' : ''}>${tz.replace('_', ' ')}</option>`
            ).join('');

            timezoneSelect.addEventListener('change', (e) => {
                selectedTimezone = e.target.value;
                selectedTimeSlot = null;
                goToStep2Btn.disabled = true;
                renderTimeSlots();
            });
        }

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            currentMonthStr.textContent = `${months[month]} ${year}`;

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const today = new Date();
            today.setHours(0,0,0,0);

            calendarDates.innerHTML = '';
            for (let i = 0; i < firstDay; i++) {
                calendarDates.appendChild(document.createElement('div'));
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dateObj = new Date(year, month, day);
                const cell = document.createElement('div');
                cell.className = 'date-cell';
                cell.textContent = day;

                if (dateObj < today) {
                    cell.classList.add('disabled');
                } else {
                    if (dateObj.getTime() === today.getTime()) cell.classList.add('today');
                    if (selectedDate && dateObj.getTime() === selectedDate.getTime()) cell.classList.add('selected');
                    cell.addEventListener('click', () => selectDate(dateObj));
                }
                calendarDates.appendChild(cell);
            }
        }

        function selectDate(date) {
            selectedDate = date;
            selectedTimeSlot = null;
            goToStep2Btn.disabled = true;
            
            const options = { weekday: 'long', day: 'numeric', month: 'short' };
            selectedDateDisplay.textContent = date.toLocaleDateString('en-US', options);
            
            renderCalendar();
            renderTimeSlots();
        }

        function formatInTimezone(dhakaHour, targetTimezone) {
            // 1. Create a Date object set to 01/01/2026 @ dhakaHour in Dhaka time
            // Dhaka is UTC+6. So UTC time is dhakaHour - 6.
            const date = new Date(Date.UTC(2026, 0, 1, dhakaHour - 6, 0, 0));
            
            return date.toLocaleTimeString('en-US', {
                timeZone: targetTimezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }

        function renderTimeSlots() {
            timeSlotsContainer.innerHTML = '';
            if (!selectedDate) {
                timeSlotsContainer.innerHTML = '<p class="text-center py-4 opacity-50">Please select a date first</p>';
                return;
            }

            dhakaSlots.forEach(hour => {
                const displayTime = formatInTimezone(hour, selectedTimezone);
                const slot = document.createElement('div');
                slot.className = 'time-slot';
                slot.textContent = displayTime;
                
                if (selectedTimeSlot && selectedTimeSlot.dhakaHour === hour) {
                    slot.classList.add('selected');
                }
                
                slot.addEventListener('click', () => {
                    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                    slot.classList.add('selected');
                    selectedTimeSlot = { dhakaHour: hour, localDisplay: displayTime };
                    goToStep2Btn.disabled = false;
                });
                timeSlotsContainer.appendChild(slot);
            });
        }

        function switchStep(from, to) {
            from.classList.remove('active');
            setTimeout(() => to.classList.add('active'), 300);
        }

        // Navigation
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        goToStep2Btn.addEventListener('click', () => {
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            finalSelectedDateTime.textContent = `${selectedDate.toLocaleDateString('en-US', options)} @ ${selectedTimeSlot.localDisplay} (${selectedTimezone})`;
            switchStep(step1, step2);
        });

        backToStep1.addEventListener('click', () => switchStep(step2, step1));

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            
            // Generate Dhaka-based ISO time for backend recording
            const bookingDateDhaka = new Date(selectedDate);
            bookingDateDhaka.setHours(selectedTimeSlot.dhakaHour, 0, 0, 0);

            const data = {
                selectedDate: selectedDate.toISOString().split('T')[0],
                selectedTime: selectedTimeSlot.localDisplay,
                visitorTimezone: selectedTimezone,
                dhakaAppointmentTime: bookingDateDhaka.toISOString(), // Correct UTC for Google Cal
                dhakaHour: selectedTimeSlot.dhakaHour,
                name: formData.get('name'),
                email: formData.get('email'),
                website: formData.get('website'),
                message: formData.get('message')
            };

            const WEBHOOK_URL = 'https://hook.eu1.make.com/78olndbocmp1vm6menrjl0qeqg31rsuy';
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Processing...</span>';
            submitBtn.disabled = true;

            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => {
                if (res.ok) {
                    switchStep(step2, step3);
                    bookingForm.reset();
                } else {
                    alert('Booking failed. Please try again.');
                }
            })
            .catch(() => alert('Network error. Please try again.'))
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });

        resetBooking.addEventListener('click', () => {
            selectedDate = null;
            selectedTimeSlot = null;
            goToStep2Btn.disabled = true;
            switchStep(step3, step1);
            renderCalendar();
            renderTimeSlots();
        });

        // Init
        initTimezoneSelect();
        renderCalendar();
        renderTimeSlots();
    }

});
