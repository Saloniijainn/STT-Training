document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('a');
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const typedTextElement = document.getElementById('typed-text');
    const revealElements = document.querySelectorAll('.reveal');
    const typingCursor = document.querySelector('.typing-cursor');

    // --- Typing Effect Logic ---
    const texts = [
        'Full Stack Data Science Developer',
        'AI Enthusiast',
        'Machine Learning Engineer',
        'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingDelay = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            // End of word: pause and start deleting
            typingDelay = 2000;
            isDeleting = true;
            typingCursor.style.animation = 'none'; // Stop cursor blink on full text
        } else if (isDeleting && charIndex === 0) {
            // End of deletion: move to next word and start typing
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingDelay = 500;
            typingCursor.style.animation = 'blink 1s infinite'; // Resume cursor blink
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Start the typing effect after a short delay
    setTimeout(type, 1000);


    // --- Mobile Menu Toggle ---
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // --- Scroll Event Handler (Progress Bar, Nav Shadow, Active Link, Scroll to Top Visibility) ---
    const updateScrollState = () => {
        // Scroll Progress
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';

        // Navbar Shadow
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll to Top Button Visibility
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        // Active Navigation Link
        let current = '';
        sections.forEach(section => {
            // Subtracting 200px offset for smoother transition
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', updateScrollState);
    updateScrollState(); // Call once on load to set initial state


    // --- Scroll To Top Button Click ---
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Smooth Anchor Scrolling for all links (Overwrites default) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjusting scroll position by 80px to account for fixed navbar height
                const offsetTop = targetElement.offsetTop - 80; 
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Reveal On Scroll Animation Logic ---
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            // Activate element if it's visible in the viewport (with a 100px buffer)
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Call once on load to reveal elements already in view
});
