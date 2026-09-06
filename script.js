document.addEventListener('DOMContentLoaded', function() {
    // Mobile detection
    const isMobile = window.innerWidth <= 768;
    const isTouch = 'ontouchstart' in window;
    
    // Header scroll effect
    const header = document.querySelector('header');
    let scrollTimer = null;
    
    window.addEventListener('scroll', () => {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        
        scrollTimer = setTimeout(() => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 10);
    }, { passive: true });

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    
    // Create overlay if it doesn't exist
    if (!overlay) {
        const newOverlay = document.createElement('div');
        newOverlay.className = 'overlay';
        document.body.appendChild(newOverlay);
    }
    
    function toggleMenu() {
        const isOpen = hamburger.classList.contains('active');
        
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.querySelector('.overlay').classList.toggle('open');
        body.classList.toggle('no-scroll');
        
        // Accessibility
        hamburger.setAttribute('aria-expanded', !isOpen);
        mobileMenu.setAttribute('aria-hidden', isOpen);
        
        // Focus management
        if (!isOpen) {
            mobileMenu.querySelector('a').focus();
        } else {
            hamburger.focus();
        }
    }
    
    hamburger.addEventListener('click', toggleMenu);
    document.querySelector('.overlay').addEventListener('click', toggleMenu);
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            toggleMenu();
            // Smooth scroll for mobile
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            toggleMenu();
        }
    });

    // Experience tabs with touch support
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const panel = document.getElementById(tabId);
            if (panel) {
                panel.classList.add('active');
            }
            
            // Scroll active tab into view on mobile
            if (isMobile) {
                button.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest', 
                    inline: 'center' 
                });
            }
        });
    });
    
    // Responsive image loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Touch gesture support for project cards
    if (isTouch) {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            let startY = 0;
            let startX = 0;
            
            card.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
                startX = e.touches[0].clientX;
            }, { passive: true });
            
            card.addEventListener('touchend', (e) => {
                const endY = e.changedTouches[0].clientY;
                const endX = e.changedTouches[0].clientX;
                const diffY = startY - endY;
                const diffX = startX - endX;
                
                // Simple swipe detection
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    // Horizontal swipe - could add navigation between projects
                    card.style.transform = diffX > 0 ? 'translateX(-10px)' : 'translateX(10px)';
                    setTimeout(() => {
                        card.style.transform = 'translateX(0)';
                    }, 200);
                }
            }, { passive: true });
        });
    }
    
    // Viewport height fix for mobile browsers
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 100);
    });
    
    // Performance optimization for mobile
    if (isMobile) {
        // Reduce animations on mobile for better performance
        document.body.classList.add('mobile-optimized');
        
        // Lazy load non-critical elements
        setTimeout(() => {
            const nonCriticalElements = document.querySelectorAll('.social-sidebar, .email-sidebar');
            nonCriticalElements.forEach(el => {
                el.style.display = 'none';
            });
        }, 1000);
    }
});