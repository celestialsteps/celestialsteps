// Immediately show a skeleton header to prevent flash
const headerPlaceholder = document.getElementById('header-placeholder');
if (headerPlaceholder && headerPlaceholder.innerHTML.trim() === '') {
    headerPlaceholder.innerHTML = `
        <header class="header">
            <nav class="nav-container">
                <a href="index.html" class="logo">Celestialsteps.com</a>
                <div class="header-loader" style="
                    width: 100%;
                    height: 2px;
                    background: rgba(255,255,255,0.2);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    overflow: hidden;
                ">
                    <div style="
                        width: 100%;
                        height: 100%;
                        background: #ffcc00;
                        animation: headerLoading 1.5s ease-in-out infinite;
                        position: absolute;
                    "></div>
                </div>
            </nav>
        </header>
    `;
}

// Keyframes for loading animation
const style = document.createElement('style');
style.textContent = `
    @keyframes headerLoading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    // Load full header
    loadFullHeader();
    
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

function loadFullHeader() {
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
                            <a href="index.html" class="logo">Celestialsteps.com</a>
                            <ul class="nav-menu">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="services.html">Services</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                            <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">☰</button>
                        </nav>
                    </header>
                `;
                initializeMobileMenu();
                setActiveNavItem();
            });
    }
}

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
