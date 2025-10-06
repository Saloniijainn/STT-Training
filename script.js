document.addEventListener('DOMContentLoaded', () => {
    // Get the Navbar, Menu, and Toggle Button elements
    const navbar = document.querySelector('nav');
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : []; // Select all links in the menu

    // --- Scroll Progress Bar & Scroll-To-Top Button Logic ---
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    const updateScrollProgress = () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + '%';
        }

        // Show/Hide Scroll-To-Top Button
        if (scrollToTopBtn) {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    };

    window.addEventListener('scroll', updateScrollProgress);

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Mobile Menu Toggle Logic ---
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // Toggling 'active' on menuToggle will enable the CSS burger animation
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                // Remove the 'active' class on both menu and toggle to close it
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // --- Navbar Scroll Shadow Logic ---
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // --- Active Link Highlight Logic (UPDATED) ---
    const sections = document.querySelectorAll('section[id]');
    // Use the already defined navLinks to ensure all menu links are checked
    const allNavLinks = navLinks; 

    const highlightActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Determine current section with a 100px offset for the fixed header
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section's ID
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Run once on load to highlight the initial section (usually 'hero')

    // --- Typing Animation Logic ---
    const typedTextElement = document.getElementById('typed-text');
    const texts = [
        'Full Stack Data Science Developer',
        'AI Enthusiast',
        'Machine Learning Engineer',
        'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
        if (!typedTextElement) return;

        const currentText = texts[textIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingDelay = 500;
        }

        setTimeout(type, typingDelay);
    }

    if (typedTextElement) {
        setTimeout(type, 1000);
    }

    // --- Scroll Reveal Animation Logic ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            // Activate element if its top is within 100px of the bottom of the viewport
            // and it hasn't scrolled past the top of the viewport
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load to catch elements already in view

    // ----------------------------------------------------------------------
    // --- MOBILE-FRIENDLY PROJECTS HORIZONTAL SCROLL LOGIC (Simplified) ---
    // ----------------------------------------------------------------------
    const projectsContainer = document.getElementById('projectsContainer');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (projectsContainer && scrollLeftBtn && scrollRightBtn) {

        // This calculates the distance to scroll by (e.g., width of one card + gap)
        const getScrollDistance = () => {
            // Get the width of one card or 90% of the visible container width
            const card = projectsContainer.querySelector('.project-card');
            if (card) {
                // Card width + the CSS gap value (which is 2.5rem, roughly 40px)
                return card.offsetWidth + 40; 
            }
            // Fallback to 90% of viewport width
            return projectsContainer.clientWidth * 0.9;
        };

        scrollLeftBtn.addEventListener('click', () => {
            projectsContainer.scrollBy({
                left: -getScrollDistance(),
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            projectsContainer.scrollBy({
                left: getScrollDistance(),
                behavior: 'smooth'
            });
        });
    }
    // ----------------------------------------------------------------------

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Subtract 80px for the fixed navigation bar
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
