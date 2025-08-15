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
    mobileMenuButton.addEventListener('click', function(e) {
        const hamburger = this.querySelector('.hamburger');
        
        // Create gold burst effect
        createGoldBurst(e.currentTarget);
        
        // Toggle mobile menu
        mobileMenu.classList.toggle('hidden');
        
        // Toggle hamburger animation
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
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class
        if (scrollTop > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Gold Burst Effect Function
function createGoldBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create burst container
    const burst = document.createElement('div');
    burst.className = 'gold-burst';
    burst.style.left = centerX + 'px';
    burst.style.top = centerY + 'px';
    document.body.appendChild(burst);
    
    // Create multiple particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'gold-particle';
        
        // Random direction and distance
        const angle = (i * 30) + Math.random() * 20; // More spread
        const distance = 40 + Math.random() * 60; // Random distance
        const size = 3 + Math.random() * 3; // Random size
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Calculate end position
        const endX = Math.cos(angle * Math.PI / 180) * distance;
        const endY = Math.sin(angle * Math.PI / 180) * distance;
        
        particle.style.setProperty('--end-x', endX + 'px');
        particle.style.setProperty('--end-y', endY + 'px');
        
        // Add particle to burst
        burst.appendChild(particle);
        
        // Trigger animation with delay
        setTimeout(() => {
            particle.classList.add('animate');
            particle.style.transform = `translate(${endX}px, ${endY}px)`;
        }, i * 50);
    }
    
    // Clean up after animation
    setTimeout(() => {
        if (burst.parentNode) {
            burst.remove();
        }
    }, 1500);
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
                
                // Special handling for service cards
                if (entry.target.classList.contains('service-card')) {
                    entry.target.classList.add('animate');
                }
                
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    const elementsToAnimate = document.querySelectorAll('.service-card, .stat-item, .process-content-left, .process-content-right, .section-title, .section-subtitle');
    elementsToAnimate.forEach(el => {
        if (!el.classList.contains('service-card')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        fadeObserver.observe(el);
    });
    
    // Enhanced service card animations
    initServiceCardAnimations();
    
    // Title animations are now handled by CSS automatically
    // No JavaScript needed for PURCELL title animations
}

// Service Card Complex Animations
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        const particles = card.querySelectorAll('.particle');
        const icon = card.querySelector('.service-icon');
        
        // Add entrance animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', () => {
            // Trigger particle animation
            particles.forEach((particle, pIndex) => {
                particle.style.animationDelay = `${pIndex * 0.5}s`;
                particle.style.animation = 'particleFloat 6s ease-in-out infinite';
            });
            
            // Add card 3D transform
            card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(2deg) scale(1.02)';
            card.style.transition = 'transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.boxShadow = '0 20px 40px rgba(251, 191, 36, 0.3)';
            
            // Icon rotation
            if (icon) {
                icon.style.transform = 'rotate(720deg) scale(1.3)';
                icon.style.transition = 'transform 2s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset particle animations
            particles.forEach(particle => {
                particle.style.animation = '';
            });
            
            // Reset card transform
            card.style.transform = '';
            card.style.boxShadow = '';
            
            // Reset icon
            if (icon) {
                icon.style.transform = '';
            }
        });
        
        // Add random floating animation
        setTimeout(() => {
            card.style.animation = `cardFloat 4s ease-in-out infinite`;
            card.style.animationDelay = `${index * 0.5}s`;
        }, 1000);
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
    
    /* Complex Service Card Animations */
    @keyframes particleFloat {
        0% { 
            transform: translateY(0px) rotate(0deg) scale(0.5); 
            opacity: 0; 
        }
        20% {
            opacity: 0.6;
            transform: translateY(-10px) rotate(60deg) scale(0.8);
        }
        40% {
            opacity: 1;
            transform: translateY(-25px) rotate(180deg) scale(1);
        }
        60% {
            opacity: 0.8;
            transform: translateY(-40px) rotate(270deg) scale(1.1);
        }
        80% {
            opacity: 0.6;
            transform: translateY(-55px) rotate(330deg) scale(0.9);
        }
        100% { 
            transform: translateY(-70px) rotate(360deg) scale(0.3); 
            opacity: 0; 
        }
    }
    
    @keyframes cardFloat {
        0%, 100% { 
            transform: translateY(0px); 
        }
        50% { 
            transform: translateY(-12px); 
        }
    }
    
    @keyframes gradientSweep {
        0% { 
            background-position: -200% center; 
        }
        100% { 
            background-position: 200% center; 
        }
    }
    
    .service-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.15), transparent);
        background-size: 200% 100%;
        opacity: 0;
        transition: opacity 0.8s ease;
        pointer-events: none;
        z-index: 1;
    }
    
    .service-card:hover::before {
        opacity: 1;
        animation: gradientSweep 4s ease-in-out infinite;
    }
    
    .service-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 2;
    }
    
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(251, 191, 36, 0.9);
        border-radius: 50%;
        opacity: 0;
        box-shadow: 0 0 8px rgba(251, 191, 36, 0.8);
    }
    
    .particle:nth-child(1) {
        top: 15%;
        left: 20%;
        animation-delay: 0s;
    }
    
    .particle:nth-child(2) {
        top: 60%;
        left: 70%;
        animation-delay: 0.5s;
    }
    
    .particle:nth-child(3) {
        top: 80%;
        left: 30%;
        animation-delay: 1s;
    }
    
    .particle:nth-child(4) {
        top: 25%;
        left: 80%;
        animation-delay: 1.5s;
    }
    
    .particle:nth-child(5) {
        top: 70%;
        left: 15%;
        animation-delay: 2s;
    }
    
    .particle:nth-child(6) {
        top: 40%;
        left: 50%;
        animation-delay: 2.5s;
    }
    
    .particle:nth-child(7) {
        top: 90%;
        left: 60%;
        animation-delay: 3s;
    }
    
    .particle:nth-child(8) {
        top: 35%;
        left: 10%;
        animation-delay: 3.5s;
    }
    
    .particle:nth-child(9) {
        top: 55%;
        left: 85%;
        animation-delay: 4s;
    }
    
    .particle:nth-child(10) {
        top: 75%;
        left: 45%;
        animation-delay: 4.5s;
    }
    
    .particle:nth-child(11) {
        top: 20%;
        left: 60%;
        animation-delay: 5s;
    }
    
    .particle:nth-child(12) {
        top: 85%;
        left: 25%;
        animation-delay: 5.5s;
    }
    
    .particle:nth-child(13) {
        top: 45%;
        left: 75%;
        animation-delay: 6s;
    }
    
    .particle:nth-child(14) {
        top: 65%;
        left: 35%;
        animation-delay: 6.5s;
    }
    
    .particle:nth-child(15) {
        top: 30%;
        left: 90%;
        animation-delay: 7s;
    }
    
    .particle:nth-child(16) {
        top: 95%;
        left: 55%;
        animation-delay: 7.5s;
    }
    
    .service-icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        position: relative;
        overflow: hidden;
    }
    
    .service-icon::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(251, 191, 36, 0.3), transparent);
        transform: rotate(-45deg);
        transition: transform 1s ease;
    }
    
    .service-card:hover .service-icon::before {
        transform: rotate(135deg);
    }
    
    .service-title {
        position: relative;
        z-index: 3;
        transition: text-shadow 0.8s ease;
    }
    
    .service-card:hover .service-title {
        text-shadow: 0 0 15px rgba(251, 191, 36, 0.4);
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
            <p class="text-yellow-400 text-sm font-light">A CARREGAR REFINARIA PURCELL</p>
        </div>
    `;
    document.body.appendChild(loading);
}
