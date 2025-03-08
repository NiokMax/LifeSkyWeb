// Mobile Nav Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navBackdrop = document.createElement('div');

// Create backdrop element
navBackdrop.className = 'nav-backdrop';
document.body.appendChild(navBackdrop);

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navBackdrop.classList.remove('active');
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navBackdrop.classList.toggle('active');
}

// Toggle menu
navToggle.addEventListener('click', toggleMobileMenu);

// Close menu on backdrop click
navBackdrop.addEventListener('click', closeMobileMenu);

// Close menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close menu when scrolling on mobile
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (Math.abs(currentScroll - lastScroll) > 50 && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
    lastScroll = currentScroll;
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Page Loading
window.addEventListener('DOMContentLoaded', () => {
    // Add active class to current page link
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    animateCounters();
});

// Add counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.count');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if(count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                updateCount();
            }
        });

        observer.observe(counter);
    });
}

// Add copy IP functionality
document.querySelector('.btn-copy')?.addEventListener('click', () => {
    const ip = document.querySelector('.server-ip input');
    ip.select();
    document.execCommand('copy');
    alert('Server IP copied to clipboard!');
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        answer.classList.toggle('active');
        item.querySelector('i').classList.toggle('fa-rotate-180');
    });
});

// Form Submission
document.querySelectorAll('.contact-form, .ticket-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const messageDiv = form.querySelector('.form-message');

        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                messageDiv.innerHTML = `
                    <div class="form-message success">
                        <i class="fas fa-check-circle"></i>
                        Message sent successfully! We'll respond shortly.
                    </div>`;
                form.reset();
            } else {
                messageDiv.innerHTML = `
                    <div class="form-message error">
                        <i class="fas fa-times-circle"></i>
                        Error sending message. Please try again later.
                    </div>`;
            }
        } catch (error) {
            messageDiv.innerHTML = `
                <div class="form-message error">
                    <i class="fas fa-times-circle"></i>
                    Connection error. Please check your network.
                </div>`;
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = form.classList.contains('ticket-form') 
                ? 'Send Ticket' 
                : '<i class="fas fa-paper-plane"></i> Send Message';
        }
    });
});

// Back to Top Button
const backToTop = document.createElement('div');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Purchase notice dismissal
document.querySelectorAll('.close-notice').forEach(button => {
    button.addEventListener('click', function() {
        const notice = this.closest('.purchase-notice');
        notice.style.display = 'none';
        localStorage.setItem('hidePurchaseNotice', 'true');
    });
});

// Check localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('hidePurchaseNotice') === 'true') {
        document.querySelectorAll('.purchase-notice').forEach(notice => {
            notice.style.display = 'none';
        });
    }
}); 