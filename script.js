document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('a');

    // Toggle the menu on button click
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close the menu when a link is clicked (for single-page navigation)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
});