document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon between menu and x
            const icon = menuToggle.querySelector('i');
            if (icon) {
                const isMenu = icon.getAttribute('data-lucide') === 'menu';
                icon.setAttribute('data-lucide', isMenu ? 'x' : 'menu');
                lucide.createIcons(); // Re-render Lucide icons
            }
        });

        // Close mobile menu when a nav link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // 3. Scroll Active Link Highlight & Header Shrink
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        // Shrink Header on scroll
        if (header) {
            if (scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.background = 'rgba(11, 10, 18, 0.85)';
            } else {
                header.style.padding = '0';
                header.style.background = 'rgba(11, 10, 18, 0.7)';
            }
        }

        // Highlight active link
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for sticky header
            const sectionId = current.getAttribute('id');
            const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (activeLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // 4. Contact Form Submission simulation
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('contact-success-msg');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('msg-reset-btn');

    if (contactForm && successMsg && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Mock submission delay
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i data-lucide="loader" class="spin"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();

            setTimeout(() => {
                // Hide form, show success message
                contactForm.classList.add('hidden');
                successMsg.classList.remove('hidden');
                
                // Reset button status
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, 1500);
        });
    }

    if (resetBtn && contactForm && successMsg) {
        resetBtn.addEventListener('click', () => {
            // Reset form fields
            contactForm.reset();
            
            // Show form, hide success message
            successMsg.classList.add('hidden');
            contactForm.classList.remove('hidden');
        });
    }

    // 5. Dynamic Footer Year Update
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
