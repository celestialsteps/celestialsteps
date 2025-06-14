// includes/components.js
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('./includes/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header-placeholder').innerHTML = html;
            // Initialize mobile menu functionality after header loads
            initializeMobileMenu();
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load footer
    fetch('./includes/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-placeholder').innerHTML = html;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Initialize card animations (your existing code)
    initializeCardAnimations();
});

// Mobile menu toggle functionality (your existing function)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Initialize all mobile menu functionality
function initializeMobileMenu() {
    // Smooth scrolling for internal anchor links only (your existing code)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu after clicking
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside (your existing code)
    document.addEventListener('click', function(e) {
        const navMenu = document.querySelector('.nav-menu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && toggle && !navMenu.contains(e.target) && !toggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Add animation delay to cards (your existing code)
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.8s ease forwards';
    });
}

// Optional: Set active navigation item based on current page
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}
