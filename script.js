// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  // Toggle menu on button click
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Optional: close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });
});
