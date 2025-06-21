document.addEventListener('DOMContentLoaded', function() {
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('./includes/header.html')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                headerPlaceholder.innerHTML = html;
                initializeMobileMenu();
                setActiveNavItem();
            })
            .catch(error => {
                console.error('Error loading header:', error);
                // Fallback: Show a simple header if the fetch fails
                headerPlaceholder.innerHTML = `
                    <header class="header">
                        <nav class="nav-container">
                            <a href="#" class="logo">Celestialsteps.com</a>
                            <ul class="nav-menu">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="services.html">Services</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </nav>
                    </header>
                `;
            });
    }

    // Load footer (only if footer-placeholder exists and no content yet)
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder && footerPlaceholder.innerHTML.trim() === '') {
        fetch('./includes/footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
                // Hide the fallback footer if we successfully loaded the dynamic one
                const mainFooter = document.getElementById('main-footer');
                if (mainFooter) mainFooter.style.display = 'none';
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }

    // Initialize animations
    initializeCardAnimations();
});

// Mobile menu toggle function
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) navMenu.classList.toggle('active');
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.querySelector('.nav-menu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            (!toggle || !toggle.contains(e.target))) {
            navMenu.classList.remove('active');
        }
    });
}

// Set active navigation item
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });
}

// Card animations
function initializeCardAnimations() {
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s forwards`;
    });
}
