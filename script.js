document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Progress Bar & Scroll-To-Top Button Logic ---
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    const updateScrollProgress = () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
        
        // Show/Hide Scroll-To-Top Button
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // --- Mobile Menu Toggle Logic ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    // Ensure you use the ID of your <nav> element, which is likely 'navbar' from your CSS
    const navbar = document.getElementById('navbar'); 
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : []; // Check if navMenu exists
    
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
            if (navMenu.classList.contains('active')) {
                // Remove the 'active' class on both menu and toggle to close it
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active'); 
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // --- Navbar Scroll Shadow Logic ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }
    });
    
    // --- Active Link Highlight Logic ---
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Use window.scrollY > sectionTop - (Height of nav + some offset)
            if (window.scrollY >= sectionTop - 100) { 
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
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
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
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
                // Card width + a bit of gap (assuming 2.5rem gap is about 40px)
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

        // NOTE: The current setup relies on native **touch/swipe support** // provided by the browser when 'overflow-x: auto' is used in the CSS, 
        // so no extra 'touchstart/touchmove' event listeners are needed!
        // This is the most mobile-friendly way.
        
        // The complex auto-scroll logic (startAutoScroll, stopAutoScroll) 
        // has been removed for better mobile performance and compatibility.
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
