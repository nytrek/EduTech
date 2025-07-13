document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCursor();
    initializeNavigation();
    initializeScrollEffects();
    initializeVideoModal();
});

function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.tutorial-card, .stat-card, .feature').forEach(el => {
        observer.observe(el);
    });
}

function initializeCursor() {
    const cursor = document.querySelector('.cursor-glow');
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

    function updateCursor() {
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    document.querySelectorAll('button, a, .tutorial-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.5), transparent)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)';
        });
    });
}

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    const parallaxElements = document.querySelectorAll('.hero-particles, .floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${rate}px)`;
        });
    });
}

function initializeVideoModal() {
    const videoData = {
        'equipo1-video1': {
            title: 'Similitudes entre Google y Office',
            description: 'Compara las herramientas de Google y Microsoft Office y descubre cuál se adapta mejor a tus tareas diarias.',
            url: 'https://youtu.be/2nX14gd?feature=shared'
        },
        'equipo1-video2': {
            title: 'Diferencias entre Google y Office',
            description: 'Recorremos las funciones y menús de Word y Google Docs para que puedas trabajar de forma más eficiente.',
            url: 'https://youtu.be/iLw5-7c8?feature=shared'
        },
        'equipo1-video3': {
            title: 'Tipos de archivo (extensiones)',
            description: 'En este video, exploramos los diferentes formatos de archivos y sus extensiones, incluyendo .docx, .xlsx, .pptx, .pdf y más.',
            url: 'https://youtu.be/KbEzVRwYsfeature=shared'
        },
        'equipo2-video1': {
            title: 'Diferencias Principales entre Office y Google',
            description: 'Explora las diferencias clave entre Microsoft Office y Google Workspace en funcionalidades y uso.',
            url: 'https://youtu.be/w9T_sLiU'
        },
        'equipo2-video2': {
            title: 'Tipos de Archivos y Compatibilidad',
            description: 'Comprende los diferentes formatos de archivo y su compatibilidad entre plataformas.',
            url: 'https://youtu.be/1uZaCSDk'
        },
        'equipo2-video3': {
            title: 'Entornos de Trabajo: Microsoft vs Google',
            description: 'Análisis de los entornos de trabajo, interfaces y flujos de trabajo de ambas plataformas.',
            url: 'https://youtu.be/_38HLU1U'
        }
    };

    // Función global para abrir videos directamente en YouTube
    window.openVideo = function(videoType) {
        const video = videoData[videoType];
        if (video) {
            // Abrir directamente en YouTube en una nueva pestaña
            window.open(video.url, '_blank');
        }
    };

    // Remover funciones relacionadas con el modal ya que no se usará
    window.closeVideo = function() {
        // Función vacía por compatibilidad
    };
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(59, 130, 246, 0.4)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

function initializeTypeWriter() {
    const texts = [
        'Microsoft Office y Google Workspace',
        'Herramientas de productividad',
        'Tutoriales para estudiantes'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    
    const typewriterElement = document.querySelector('.typewriter-text');
    
    if (!typewriterElement) return;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeedCurrent = isDeleting ? deleteSpeed : typeSpeed;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeedCurrent = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, typeSpeedCurrent);
    }
    
    type();
}

function addButtonRippleEffect() {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function initializeCountUpAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const countUp = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                countUp(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #3b82f6, #60a5fa)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.3s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

setTimeout(() => {
    createParticles();
    initializeTypeWriter();
    addButtonRippleEffect();
    initializeCountUpAnimation();
    initializeLazyLoading();
    initializeScrollProgress();
}, 100);
