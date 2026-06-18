// Studio Ester Makeup - Interactive Features

document.addEventListener('DOMContentLoaded', function () {

    // MOBILE MENU TOGGLE
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (mobileMenuToggle && navbarMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            navbarMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navbarMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const menuLinks = navbarMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                navbarMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // PORTFOLIO FILTERING
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    const category = item.getAttribute('data-category');
                    if (category === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    // VIP COURSE FORM SUBMISSION
    const vipForm = document.getElementById('vip-form');

    if (vipForm) {
        vipForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            // Create WhatsApp message
            const message = `Olá! Gostaria de entrar na Lista VIP do Curso 📚%0A%0A*Nome:* ${encodeURIComponent(name)}%0A*E-mail:* ${encodeURIComponent(email)}%0A*WhatsApp:* ${encodeURIComponent(phone)}`;

            // Redirect to WhatsApp
            window.open(`https://wa.me/5585991871816?text=${message}`, '_blank');

            // Reset form
            vipForm.reset();

            // Show success message
            alert('Obrigada pelo interesse! Você será redirecionada para o WhatsApp para confirmar sua inscrição na Lista VIP. 💖');
        });
    }

    // SMOOTH SCROLL FOR ANCHOR LINKS
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

    // SCROLL ANIMATIONS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // BUTTON RIPPLE EFFECT
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // FORM VALIDATION ENHANCEMENT
    const formInputs = document.querySelectorAll('input[required], textarea[required]');

    formInputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (!this.value.trim()) {
                this.style.borderColor = 'var(--color-rose-gold)';
            } else {
                this.style.borderColor = 'var(--color-light-pink)';
            }
        });

        input.addEventListener('focus', function () {
            this.style.borderColor = 'var(--color-rose-gold)';
        });
    });

    // PHONE NUMBER FORMATTING
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 11) {
                value = value.slice(0, 11);
            }

            if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }

            e.target.value = value;
        });
    }

    // LAZY LOADING FOR IMAGES
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('img');
        images.forEach(img => imageObserver.observe(img));
    }

    // CONSOLE MESSAGE
    console.log('%c💄 Studio Ester Makeup', 'color: #B76E79; font-size: 20px; font-weight: bold;');
    console.log('%cTransformando sua beleza com elegância e profissionalismo ✨', 'color: #D4AF37; font-size: 14px;');
});

// ADD RIPPLE EFFECT CSS DYNAMICALLY
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
