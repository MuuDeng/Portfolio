// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Back to top button visibility
    if (currentScroll > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link based on scroll position
    updateActiveNavLink();
});

// ===== Back to Top Button =====
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Active Nav Link =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}

// ===== Smooth Scroll for Navigation Links =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Contact Form Handling =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission (replace with actual API call)
        simulateFormSubmission(formData);
    });
}

function simulateFormSubmission(formData) {
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    // Show loading state
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span>';

    // Simulate API call delay
    setTimeout(() => {
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        btn.disabled = false;
        btn.innerHTML = originalText;
    }, 1500);
}

// ===== Simple Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid ${type === 'success' ? 'var(--accent-primary)' : '#ef4444'};
        padding: 1rem 1.5rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-content i {
        font-size: 1.1rem;
    }

    .notification-success .notification-content i {
        color: var(--accent-primary);
    }

    .notification-error .notification-content i {
        color: #ef4444;
    }

    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        opacity: 0.5;
        transition: opacity 0.3s;
    }

    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// ===== Initialize on Page Load =====
window.addEventListener('load', () => {
    updateActiveNavLink();
    console.log('Backend portfolio loaded. Ready to solve problems.');
});

// ===== Prevent form resubmission on page reload =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
