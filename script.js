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
    // LOCALE & TRANSLATIONS
    // ===========================
    const isBengali = document.documentElement.lang === 'bn';
    const locale = isBengali ? 'bn-BD' : 'en-US';

    const strings = {
        en: {
            typing: 'Typing...',
            processing: 'Processing...',
            selectDateFirst: 'Please select a date first',
            bookingFailed: 'Booking failed. Please try again or verify your server configuration.',
            networkError: 'Network error. Please try again.',
            at: '@'
        },
        bn: {
            typing: 'টাইপ করা হচ্ছে...',
            processing: 'প্রসেসিং হচ্ছে...',
            selectDateFirst: 'অনুগ্রহ করে আগে একটি তারিখ নির্বাচন করুন',
            bookingFailed: 'বুকিং ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
            networkError: 'নেটওয়ার্ক সমস্যা। অনুগ্রহ করে আবার চেষ্টা করুন।',
            at: '@'
        }
    };

    const t = isBengali ? strings.bn : strings.en;

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
                typingMsg.innerHTML = `<p style="opacity:0.6">${t.typing}</p>`;
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

            // Localized month and year
            const monthName = currentDate.toLocaleString(locale, { month: 'long' });
            const yearName = currentDate.toLocaleString(locale, { year: 'numeric', useGrouping: false });
            currentMonthStr.textContent = `${monthName} ${yearName}`;

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            calendarDates.innerHTML = '';
            for (let i = 0; i < firstDay; i++) {
                calendarDates.appendChild(document.createElement('div'));
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dateObj = new Date(year, month, day);
                const cell = document.createElement('div');
                cell.className = 'date-cell';
                cell.textContent = day.toLocaleString(locale, { useGrouping: false });

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
            selectedDateDisplay.textContent = date.toLocaleDateString(locale, options);

            renderCalendar();
            renderTimeSlots();
        }

        function formatInTimezone(dhakaHour, targetTimezone) {
            // 1. Create a Date object set to 01/01/2026 @ dhakaHour in Dhaka time
            // Dhaka is UTC+6. So UTC time is dhakaHour - 6.
            const date = new Date(Date.UTC(2026, 0, 1, dhakaHour - 6, 0, 0));

            return date.toLocaleTimeString(locale, {
                timeZone: targetTimezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }

        function renderTimeSlots() {
            timeSlotsContainer.innerHTML = '';
            if (!selectedDate) {
                timeSlotsContainer.innerHTML = `<p class="text-center py-4 opacity-50">${t.selectDateFirst}</p>`;
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
            finalSelectedDateTime.textContent = `${selectedDate.toLocaleDateString(locale, options)} ${t.at} ${selectedTimeSlot.localDisplay} (${selectedTimezone})`;
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

            const webHookBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = webHookBtn.innerHTML;

            webHookBtn.innerHTML = `<span>${t.processing}</span>`;
            webHookBtn.disabled = true;

            // SECURE BACKEND PROXY
            const API_ENDPOINT = '/api/book';

            fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (res.ok) {
                        switchStep(step2, step3);
                        bookingForm.reset();
                    } else {
                        alert(t.bookingFailed);
                    }
                })
                .catch(() => alert(t.networkError))
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

    // ===========================
    // PORTFOLIO FILTERING
    // ===========================
    const filterButtons = document.querySelectorAll('.portfolio__filter');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }, 500); // Match CSS transition duration
                }
            });
        });
    });

    // ===========================
    // DYNAMIC PORTFOLIO SCROLL DURATION
    // ===========================
    function initPortfolioScroll() {
        const images = document.querySelectorAll('.portfolio-card__img');
        const speed = 200; // Target Speed: 400 pixels per second

        images.forEach(img => {
            const handleLoad = () => {
                const rect = img.parentElement.getBoundingClientRect();
                const containerHeight = rect.height;
                const imgWidth = img.offsetWidth;

                // Calculate the actual rendered height of the long screenshot
                // Since it's width: 100%, the rendered height = naturalHeight * (renderedWidth / naturalWidth)
                const renderedHeight = img.naturalHeight * (imgWidth / img.naturalWidth);

                if (renderedHeight > containerHeight) {
                    const scrollDistance = renderedHeight - containerHeight;
                    const duration = (scrollDistance / speed).toFixed(2);
                    img.style.setProperty('--scroll-duration', `${duration}s`);
                }
            };

            if (img.complete) {
                handleLoad();
            } else {
                img.addEventListener('load', handleLoad);
            }
        });
    }

    // Initialize on load and also on window resize (to adjust for container changes)
    initPortfolioScroll();
    window.addEventListener('resize', initPortfolioScroll);

    // ===========================
    // 17. UNIFIED SUPPORT WIDGET LOGIC
    // ===========================
    const supportWidget = document.getElementById('supportWidget');
    const supportFab = document.getElementById('supportFab');
    const supportChatBody = document.getElementById('supportChatBody');

    if (supportFab && supportWidget) {
        supportFab.addEventListener('click', () => {
            supportWidget.classList.toggle('active');

            // If opening, scroll to bottom
            if (supportWidget.classList.contains('active')) {
                setTimeout(() => {
                    supportChatBody.scrollTop = supportChatBody.scrollHeight;
                }, 100);
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && supportWidget.classList.contains('active')) {
                supportWidget.classList.remove('active');
            }
        });

        // Handle Chat Form Submission
        const chatForm = document.getElementById('supportChatForm');
        const chatInput = document.getElementById('supportChatInput');
        const sendBtn = chatForm?.querySelector('.support-send-btn');
        let chatHistory = [];

        if (chatForm) {
            chatForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const text = chatInput.value.trim();
                if (!text) return;

                // Add to UI
                addSupportMessage('user', text);
                chatInput.value = '';
                chatInput.focus();

                // Add to history
                chatHistory.push({ role: 'user', content: text });

                // Show typing indicator
                const typingId = addTypingIndicator();
                sendBtn.disabled = true;

                try {
                    const response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ chatHistory })
                    });

                    removeTypingIndicator(typingId);

                    if (response.ok) {
                        const data = await response.json();
                        const aiReply = data.reply || 'I am sorry, I did not understand that.';
                        // Basic markdown-to-html for bold text or newlines if Make.com returns standard text formatting
                        let formattedReply = aiReply.replace(/\n/g, '<br>');
                        addSupportMessage('bot', formattedReply);
                        chatHistory.push({ role: 'assistant', content: aiReply });
                    } else {
                        addSupportMessage('bot', isBengali ? 'দুঃখিত, কোনো একটি সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।' : 'Sorry, something went wrong. Please try again later.');
                    }
                } catch (err) {
                    removeTypingIndicator(typingId);
                    addSupportMessage('bot', isBengali ? 'নেটওয়ার্ক সমস্যা। অনুগ্রহ করে আপনার ইন্টারনেট চেক করুন।' : 'Network error. Please check your connection.');
                } finally {
                    sendBtn.disabled = false;
                }
            });
        }

        function addTypingIndicator() {
            const msg = document.createElement('div');
            const id = 'typing-' + Date.now();
            msg.id = id;
            msg.className = `support-msg support-msg--bot typing-indicator`;
            msg.innerHTML = `<span></span><span></span><span></span>`;
            supportChatBody.appendChild(msg);
            supportChatBody.scrollTo({ top: supportChatBody.scrollHeight, behavior: 'smooth' });
            return id;
        }

        function removeTypingIndicator(id) {
            const msg = document.getElementById(id);
            if (msg) msg.remove();
        }

        function addSupportMessage(sender, text) {
            const msg = document.createElement('div');
            msg.className = `support-msg support-msg--${sender}`;
            msg.innerHTML = `<p>${text}</p>`;
            supportChatBody.appendChild(msg);

            // Auto scroll
            supportChatBody.scrollTo({
                top: supportChatBody.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

});
