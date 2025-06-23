
function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder || headerPlaceholder.dataset.loaded) return;
    
    // Mark as loading to prevent duplicate requests
    headerPlaceholder.dataset.loading = 'true';
    
    fetch('./includes/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            headerPlaceholder.innerHTML = html;
            headerPlaceholder.dataset.loaded = 'true';
            headerPlaceholder.removeAttribute('data-loading');
            initializeMobileMenu();
            setActiveNavItem();
        })
        .catch(error => {
            console.error('Error loading header:', error);
            headerPlaceholder.removeAttribute('data-loading');
            
            // Fallback: Show a simple header if the fetch fails
            headerPlaceholder.innerHTML = `
                <header class="header">
                    <nav class="nav-container">
                        <a href="index.html" class="logo">Celestialsteps.com</a>
                        <ul class="nav-menu">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="services.html">Services</a></li>
                            <li><a href="blog.html">Blog</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                        <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">☰</button>
                    </nav>
                </header>
            `;
            headerPlaceholder.dataset.loaded = 'true';
            initializeMobileMenu();
            setActiveNavItem();
        });
}

function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder || footerPlaceholder.dataset.loaded) return;
    
    footerPlaceholder.dataset.loading = 'true';
    
    fetch('./includes/footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            footerPlaceholder.innerHTML = html;
            footerPlaceholder.dataset.loaded = 'true';
            footerPlaceholder.removeAttribute('data-loading');
            
            // Hide the fallback footer if we successfully loaded the dynamic one
            const mainFooter = document.getElementById('main-footer');
            if (mainFooter) mainFooter.style.display = 'none';
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            footerPlaceholder.removeAttribute('data-loading');
        });
}

// Mobile menu toggle function - make it global
window.toggleMobileMenu = function() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) navMenu.classList.toggle('active');
};

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
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Card animations
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        // Only animate if not already animated
        if (!card.dataset.animated) {
            card.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s forwards`;
            card.dataset.animated = 'true';
        }
    });
}
