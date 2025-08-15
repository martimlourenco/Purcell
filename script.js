// Modern Purcell Website - Simplified and Functional
// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const counters = document.querySelectorAll('.counter');
const contactForm = document.querySelector('.contact-form');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initCounters();
    initContactForm();
    initScrollEffects();
    initAnimations();
    
    // Hide loading screen after a delay
    setTimeout(() => {
        hideLoadingScreen();
    }, 1500);
});

// Loading Screen
function hideLoadingScreen() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 500);
    }
}

// Navigation
function initNavigation() {
    if (!mobileMenuButton || !mobileMenu) return;
    
    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const hamburger = this.querySelector('.hamburger');
        if (hamburger) {
            hamburger.classList.toggle('active');
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu
            mobileMenu.classList.add('hidden');
            const hamburger = mobileMenuButton.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class
        if (scrollTop > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Counter Animation
function initCounters() {
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseFloat(counter.getAttribute('data-target') || '0');
    const duration = 2000;
    const start = performance.now();
    
    function updateCounter(timestamp) {
        const progress = Math.min((timestamp - start) / duration, 1);
        const current = progress * target;
        
        if (target === 99.99) {
            counter.textContent = current.toFixed(2);
        } else if (target >= 1000) {
            counter.textContent = Math.floor(current).toLocaleString();
        } else {
            counter.textContent = Math.floor(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Contact Form
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        if (!submitButton) return;
        
        const buttonText = submitButton.querySelector('span');
        if (!buttonText) return;
        
        const originalText = buttonText.textContent;
        
        // Loading state
        buttonText.textContent = 'ENVIANDO...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
            buttonText.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Notification System
function showNotification(message) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification fixed top-8 right-8 z-50 p-6 bg-black border border-yellow-400 text-white max-w-md transform translate-x-full transition-transform duration-500';
    notification.innerHTML = `
        <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
            <p class="text-sm font-light">${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 4000);
}

// Scroll Effects
function initScrollEffects() {
    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 z-50 transform scale-x-0 origin-left transition-transform duration-100';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        progressBar.style.transform = `scaleX(${scrollPercent})`;
    });
}

// Basic Animations
function initAnimations() {
    // Fade in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    const elementsToAnimate = document.querySelectorAll('.service-item, .stat-item, .process-content-left, .process-content-right, .section-title, .section-subtitle');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const hamburger = mobileMenuButton.querySelector('.hamburger');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .loading {
        position: fixed;
        inset: 0;
        background: #000;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    }
    
    .loading-content {
        text-align: center;
    }
    
    .loading-bar {
        width: 16rem;
        height: 0.25rem;
        background: #1f2937;
        border-radius: 9999px;
        overflow: hidden;
        margin-bottom: 1rem;
    }
    
    .loading-progress {
        height: 100%;
        background: linear-gradient(to right, #fbbf24, #f59e0b);
        border-radius: 9999px;
        width: 100%;
        animation: loading-fill 1.5s ease-in-out;
    }
    
    @keyframes loading-fill {
        0% { width: 0%; }
        100% { width: 100%; }
    }
    
    #navbar.scrolled {
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(251, 191, 36, 0.2);
    }
    
    .hamburger {
        transition: transform 0.3s ease;
    }
    
    .hamburger.active {
        transform: rotate(180deg);
    }
`;
document.head.appendChild(style);

// Add loading screen if it doesn't exist
if (!document.querySelector('.loading')) {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
            <p class="text-yellow-400 text-sm font-light">CARREGANDO REFINARIA PURCELL</p>
        </div>
    `;
    document.body.appendChild(loading);
}
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('svg').style.transform = 'rotate(0deg)';
        });
    });
    
    // Active navigation highlighting
    updateActiveNavigation();
    
    // Add navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
        
        updateActiveNavigation();
    });


function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('#home');
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const speed = scrolled * 0.5;
            hero.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.service-card, .stat-card, .process-step, .contact-info-card').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initCounters() {
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseFloat(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on target
        if (target === 99.99) {
            counter.textContent = current.toFixed(2);
        } else if (target >= 1000) {
            counter.textContent = Math.floor(current).toLocaleString();
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
}

// Particle System
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 5000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroSubtitle = document.querySelector('#home p');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.borderRight = '2px solid #fbbf24';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroSubtitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after page loads
        setTimeout(typeWriter, 1000);
    }
}

// Gold Particles for Service Cards
function initGoldParticles() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createGoldParticles(this);
        });
    });
}

function createGoldParticles(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #fbbf24;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const animation = particle.animate([
            { 
                transform: 'translateY(0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translateY(-${Math.random() * 100 + 50}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }
}

// Custom Cursor Effect
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-4 h-4 bg-yellow-400 rounded-full pointer-events-none z-50 mix-blend-difference opacity-0 transition-opacity duration-300';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Smooth cursor movement
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 8 + 'px';
        cursor.style.top = cursorY - 8 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Scale cursor on hover
    document.querySelectorAll('a, button, .service-card, .stat-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Intersection Observer for Advanced Animations
const advancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Staggered animation for service cards
            if (element.classList.contains('service-card')) {
                const cards = Array.from(document.querySelectorAll('.service-card'));
                const index = cards.indexOf(element);
                
                setTimeout(() => {
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                }, index * 100);
            }
            
            // Process timeline animation
            if (element.classList.contains('process-step')) {
                element.querySelector('.process-number').style.animation = 'pulse-glow 2s infinite';
                element.querySelector('.process-content').style.transform = 'scale(1)';
                element.querySelector('.process-content').style.opacity = '1';
            }
            
            advancedObserver.unobserve(element);
        }
    });
}, { threshold: 0.2 });

// Observe elements for advanced animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card, .process-step').forEach(el => {
        // Set initial state
        if (el.classList.contains('service-card')) {
            el.style.transform = 'translateY(50px)';
            el.style.opacity = '0';
            el.style.transition = 'all 0.6s ease-out';
        }
        
        if (el.classList.contains('process-step')) {
            const content = el.querySelector('.process-content');
            if (content) {
                content.style.transform = 'scale(0.8)';
                content.style.opacity = '0';
                content.style.transition = 'all 0.6s ease-out';
            }
        }
        
        advancedObserver.observe(el);
    });
});

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle scroll events
const throttledScrollHandler = debounce(() => {
    updateActiveNavigation();
}, 10);

window.addEventListener('scroll', throttledScrollHandler);

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
        'https://unpkg.com/aos@2.3.1/dist/aos.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();
