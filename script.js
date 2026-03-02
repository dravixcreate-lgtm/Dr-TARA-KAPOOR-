// Additional interactive functionality for Cadbury website

class CadburyWebsite {
    constructor() {
        this.init();
    }
    
    init() {
        this.initSmoothScroll();
        this.initProductHoverEffects();
        this.initStickyNavigation();
        this.initNewsletterForm();
        this.initRecipeCarousel();
        this.initBrandAnimation();
    }
    
    initSmoothScroll() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    initProductHoverEffects() {
        // Enhanced hover effects for product cards
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.boxShadow = '0 25px 50px -12px rgba(75, 40, 109, 0.25)';
                
                // Add subtle scale effect
                card.style.transform = 'translateY(-12px) scale(1.02)';
                
                // Highlight border
                card.style.borderColor = '#8B5CF6';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                card.style.borderColor = '#F3F4F6';
            });
        });
    }
    
    initStickyNavigation() {
        // Enhanced sticky navigation with background change
        const nav = document.querySelector('nav');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove background based on scroll position
            if (scrollTop > 100) {
                nav.classList.add('bg-white', 'shadow-lg');
                nav.classList.remove('bg-white/90');
            } else {
                nav.classList.remove('bg-white', 'shadow-lg');
                nav.classList.add('bg-white/90');
            }
            
            // Hide/show nav on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    initNewsletterForm() {
        const form = document.querySelector('form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!this.validateEmail(email)) {
                this.showNotification('Please enter a valid email address', 'error');
                emailInput.focus();
                return;
            }
            
            // Simulate API call
            this.showNotification('Thank you for subscribing! You\'ll hear from us soon.', 'success');
            form.reset();
            
            // Add to localStorage to prevent multiple submissions
            const subscribers = JSON.parse(localStorage.getItem('cadbury_subscribers') || '[]');
            subscribers.push({ email, date: new Date().toISOString() });
            localStorage.setItem('cadbury_subscribers', JSON.stringify(subscribers));
        });
    }
    
    initRecipeCarousel() {
        // Simple recipe carousel functionality
        const recipeCards = document.querySelectorAll('.bg-white.rounded-3xl.shadow-lg');
        let currentIndex = 0;
        
        // Only initialize if we have multiple cards
        if (recipeCards.length > 1) {
            // Create navigation dots
            const container = recipeCards[0].parentElement;
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'flex justify-center mt-8 space-x-2';
            
            recipeCards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = `w-3 h-3 rounded-full ${index === 0 ? 'bg-purple-700' : 'bg-gray-300'}`;
                dot.addEventListener('click', () => this.showRecipe(index));
                dotsContainer.appendChild(dot);
            });
            
            container.appendChild(dotsContainer);
            
            // Auto-rotate recipes every 5 seconds
            setInterval(() => {
                currentIndex = (currentIndex + 1) % recipeCards.length;
                this.showRecipe(currentIndex);
            }, 5000);
        }
    }
    
    initBrandAnimation() {
        // Add subtle animation to brand logos
        const brandImage = document.querySelector('img[alt*="Cadbury Brands"]');
        if (brandImage) {
            brandImage.addEventListener('mouseenter', () => {
                brandImage.style.transform = 'scale(1.05)';
                brandImage.style.transition = 'transform 0.5s ease';
            });
            
            brandImage.addEventListener('mouseleave', () => {
                brandImage.style.transform = 'scale(1)';
            });
        }
    }
    
    showRecipe(index) {
        const recipeCards = document.querySelectorAll('.bg-white.rounded-3xl.shadow-lg');
        const dots = document.querySelectorAll('.flex.justify-center.mt-8 button');
        
        recipeCards.forEach((card, i) => {
            card.style.opacity = i === index ? '1' : '0.5';
            card.style.transform = i === index ? 'scale(1.02)' : 'scale(0.98)';
        });
        
        dots.forEach((dot, i) => {
            dot.className = `w-3 h-3 rounded-full ${i === index ? 'bg-purple-700' : 'bg-gray-300'}`;
        });
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cadburyWebsite = new CadburyWebsite();
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});