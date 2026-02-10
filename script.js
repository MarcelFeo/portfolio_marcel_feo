// ========================================
// Navigation Scroll Effect
// ========================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// Typing Animation
// ========================================

const typingText = document.querySelector('.typing-text');
const texts = [
    'Backend Software Engineer',
    'Java & Spring Boot Developer',
    'Python Enthusiast',
    'Database Architect',
    'Clean Code Advocate'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation after a short delay
setTimeout(typeText, 1000);

// ========================================
// Counter Animation
// ========================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            animateCounter(statNumber);
            counterObserver.unobserve(statNumber);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    counterObserver.observe(stat);
});

// ========================================
// Skills Progress Animation
// ========================================

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItem = entry.target;
            const level = skillItem.getAttribute('data-level');
            const progressBar = skillItem.querySelector('.skill-progress');
            
            skillItem.classList.add('visible');
            
            setTimeout(() => {
                progressBar.style.width = level + '%';
            }, 200);
            
            skillsObserver.unobserve(skillItem);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-item').forEach(skill => {
    skillsObserver.observe(skill);
});

// ========================================
// Project Cards Animation
// ========================================

const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            projectsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.project-card').forEach(card => {
    projectsObserver.observe(card);
});

// ========================================
// Smooth Scroll
// ========================================

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
    });
});

// ========================================
// Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Create mailto link
    const mailtoLink = `mailto:marcelfeo29@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`
    )}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Obrigado pelo contato! Seu cliente de email será aberto.');
    
    // Reset form
    contactForm.reset();
});

// ========================================
// Parallax Effect for Hero Background
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Add hover effect to project cards
// ========================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// Cursor Trail Effect (Optional)
// ========================================

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ========================================
// Loading Animation
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Active Navigation Link
// ========================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ========================================
// Scroll Reveal Animation
// ========================================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Apply reveal animation to section headers
document.querySelectorAll('.section-header').forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'all 0.8s ease-out';
    revealObserver.observe(header);
});

// ========================================
// Add subtle animation to contact cards
// ========================================

document.querySelectorAll('.contact-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
    }, 100 * index);
});

// ========================================
// Performance Optimization
// ========================================

// Debounce function for scroll events
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

// Apply debounce to scroll-heavy functions
const debouncedHighlightNav = debounce(highlightNavigation, 10);
window.removeEventListener('scroll', highlightNavigation);
window.addEventListener('scroll', debouncedHighlightNav);

// ========================================
// Console Message
// ========================================

console.log('%c👋 Olá, Dev!', 'color: #0ea5e9; font-size: 24px; font-weight: bold;');
console.log('%cSe você está vendo isso, você é curioso como eu! 🚀', 'color: #8b5cf6; font-size: 14px;');
console.log('%cEste portfólio foi desenvolvido com HTML, CSS e JavaScript puro.', 'color: #94a3b8; font-size: 12px;');
console.log('%cGostou? Entre em contato! marcelfeo29@gmail.com', 'color: #0ea5e9; font-size: 12px;');
