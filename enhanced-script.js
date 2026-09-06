// Full-screen Loading Animation (Brittany Chiang style)
document.addEventListener('DOMContentLoaded', () => {
    // Create loader container
    const loaderContainer = document.createElement('div');
    loaderContainer.className = 'loader-container';
    
    // Create loader content wrapper
    const loaderContent = document.createElement('div');
    loaderContent.className = 'loader-content';
    
    // Create logo container
    const logoContainer = document.createElement('div');
    logoContainer.className = 'loader-logo';
    
    // Create SVG logo with text "Edree0x"
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 100');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '100');
    
    // Create text element for "Edree0x"
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '10');
    text.setAttribute('y', '65');
    text.setAttribute('font-family', 'Roboto Mono, monospace');
    text.setAttribute('font-size', '40');
    text.setAttribute('font-weight', '700');
    text.setAttribute('class', 'logo-text');
    text.textContent = 'Edree0x';
    
    svg.appendChild(text);
    logoContainer.appendChild(svg);
    
    // Create loader details
    const loaderDetails = document.createElement('div');
    loaderDetails.className = 'loader-details';
    loaderDetails.innerHTML = 'Designed & Built by <br>Edree0x';
    
    // Create progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'loader-progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'loader-progress-bar';
    progressContainer.appendChild(progressBar);
    
    // Assemble loader elements
    loaderContent.appendChild(logoContainer);
    loaderContent.appendChild(loaderDetails);
    loaderContent.appendChild(progressContainer);
    loaderContainer.appendChild(loaderContent);
    document.body.appendChild(loaderContainer);
    
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';
    
    // Hide loader after animation completes
    setTimeout(() => {
        loaderContainer.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Remove loader from DOM after transition
        setTimeout(() => {
            loaderContainer.remove();
        }, 500);
        
        // Start page content animations and theme setup after loader
        initPageAnimations();
    }, 2500);
});

// Initialize page animations and theme after loader
function initPageAnimations() {
    // Custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Change cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .tab-button, .nav-links li, .social-icons a, .email-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.hero, .about, .experience, .projects, .contact');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
      // Theme Toggler
    const themeToggleButton = document.getElementById('theme-toggle');
    const mobileThemeToggleButton = document.getElementById('mobile-theme-toggle');
    const body = document.body;
    
    // Sync both theme toggles
    function syncToggles(isLight) {
        if (themeToggleButton) themeToggleButton.checked = isLight;
        if (mobileThemeToggleButton) mobileThemeToggleButton.checked = isLight;
    }    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            syncToggles(true);
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            syncToggles(false);
            localStorage.setItem('theme', 'dark');
        }
    }// Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
    applyTheme(savedTheme);

    function toggleTheme() {
        if (body.classList.contains('light-theme')) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleButton) {
        mobileThemeToggleButton.addEventListener('click', toggleTheme);
    }
}

