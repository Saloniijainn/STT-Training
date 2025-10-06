document.addEventListener('DOMContentLoaded', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    const updateScrollProgress = () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
        
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
    
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('a');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) { 
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
    
    setTimeout(type, 1000);
    
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
    revealOnScroll();
    
    // --- PROJECTS HORIZONTAL AUTO-SCROLL LOGIC ---
    const projectsContainer = document.getElementById('projectsContainer');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (projectsContainer && scrollLeftBtn && scrollRightBtn) {
        let scrollInterval;
        const scrollSpeed = 60; // seconds for one full scroll cycle

        // Function to start the continuous auto-scroll animation
        function startAutoScroll() {
            const totalContentWidth = projectsContainer.scrollWidth;
            const visibleWidth = projectsContainer.clientWidth;
            const maxScrollLeft = totalContentWidth - visibleWidth;

            // Only scroll if content exceeds the container width
            if (maxScrollLeft <= 0) return; 

            // 1. Reset scroll position to 0 
            projectsContainer.scrollLeft = 0;

            // 2. Set the CSS transition for a smooth, slow animation
            projectsContainer.style.transition = `transform ${scrollSpeed}s linear`;

            // 3. Apply the transform to scroll to the end
            projectsContainer.style.transform = `translateX(-${maxScrollLeft}px)`;

            // 4. Set a timeout to reset and loop the animation when it finishes
            scrollInterval = setTimeout(() => {
                // Remove transition for an instant jump back
                projectsContainer.style.transition = 'none';
                projectsContainer.style.transform = 'translateX(0)';

                // Restart the scroll cycle immediately after the instant jump
                setTimeout(startAutoScroll, 50); // Small delay to re-apply transition
            }, scrollSpeed * 1000);
        }

        // Function to stop the automatic scroll (on user interaction)
        function stopAutoScroll() {
            clearTimeout(scrollInterval);
            
            // Capture the current visual position to avoid a jump when removing the transition
            const currentTransform = window.getComputedStyle(projectsContainer).transform;
            
            // Remove the transition and reset transform, then re-apply the position
            projectsContainer.style.transition = 'none';
            projectsContainer.style.transform = currentTransform; 
        }

        // Manual Scroll Buttons (Override Auto-Scroll)
        const handleManualScroll = (distance) => {
            stopAutoScroll(); // Stop automatic scroll on user click
            projectsContainer.scrollBy({
                left: distance,
                behavior: 'smooth'
            });
            // Auto-scroll will not resume automatically after manual scroll
        };

        scrollLeftBtn.addEventListener('click', () => handleManualScroll(-450));
        scrollRightBtn.addEventListener('click', () => handleManualScroll(450));

        // Touch/swipe support for mobile (Also overrides Auto-Scroll)
        projectsContainer.addEventListener('touchstart', stopAutoScroll); // Stop on touch
        
        let startX;
        projectsContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        projectsContainer.addEventListener('touchmove', (e) => {
            if (!startX) return;
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            projectsContainer.scrollLeft += diff;
            startX = currentX;
        });

        // Start the automatic scroll when the page loads
        startAutoScroll();
    }
    // --- END AUTO-SCROLL LOGIC ---

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Adjusted for fixed navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
