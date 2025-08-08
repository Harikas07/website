// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // Smooth scrolling for navigation links
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

    // Navbar background change on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.95)';
        }
    });

    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const progressObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Fade in animation for sections
    const fadeElements = document.querySelectorAll('.card, .skill-item');
    const fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        fadeObserver.observe(element);
    });

    // Contact form handling
    // const contactForm = document.getElementById('contactForm');
    // const alertContainer = document.getElementById('alertContainer');

    // contactForm.addEventListener('submit', async function (e) {
    //     e.preventDefault();

    //     const formData = new FormData(contactForm);
    //     const scriptURL = "https://script.google.com/macros/s/AKfycbyZfEJjpj8Py8xOCGdBQqERCBYMWOx7J9WbsJ9jaLiZ6mM1n0y9DPzSnq-XKw5Q3iLG/exec";

    //     // Add loading state
    //     const submitButton = contactForm.querySelector('button[type="submit"]');
    //     const originalText = submitButton.innerHTML;
    //     submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    //     submitButton.disabled = true;

    //     try {
    //         const response = await fetch(scriptURL, {
    //             method: 'POST',
    //             body: formData
    //         });

    //         if (response.ok) {
    //             showAlert('success', 'Message sent successfully!');
    //             contactForm.reset();
    //         } else {
    //             showAlert('danger', 'Error sending message. Please try again.');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         showAlert('danger', 'Network error. Please check your connection and try again.');
    //     } finally {
    //         // Remove loading state
    //         submitButton.innerHTML = originalText;
    //         submitButton.disabled = false;
    //     }
    // });

    // function showAlert(type, message) {
    //     const alertHtml = `
    //         <div class="alert alert-${type} alert-dismissible fade show" role="alert">
    //             <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
    //             ${message}
    //             <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    //         </div>
    //     `;
    //     alertContainer.innerHTML = alertHtml;

    //     // Auto dismiss after 5 seconds
    //     setTimeout(() => {
    //         const alert = alertContainer.querySelector('.alert');
    //         if (alert) {
    //             alert.classList.remove('show');
    //             setTimeout(() => {
    //                 alertContainer.innerHTML = '';
    //             }, 150);
    //         }
    //     }, 5000);
    // }

    // Initialize tooltips if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

});