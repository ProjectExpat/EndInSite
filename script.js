// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('.section, .hero');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    };

    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Search functionality for bibliography
    const bibSearch = document.getElementById('bib-search');
    const bibItems = document.querySelectorAll('.bib-item');

    if (bibSearch && bibItems.length > 0) {
        bibSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            bibItems.forEach(item => {
                const citation = item.querySelector('.bib-citation').textContent.toLowerCase();
                const comment = item.querySelector('.bib-comment').textContent.toLowerCase();
                
                if (citation.includes(searchTerm) || comment.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Search functionality for glossary
    const glossarySearch = document.getElementById('glossary-search');
    const glossaryItems = document.querySelectorAll('.glossary-item');

    if (glossarySearch && glossaryItems.length > 0) {
        glossarySearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            glossaryItems.forEach(item => {
                const term = item.querySelector('.term').textContent.toLowerCase();
                const definition = item.querySelector('.definition').textContent.toLowerCase();
                
                if (term.includes(searchTerm) || definition.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Copy to clipboard functionality for citations
    const citations = document.querySelectorAll('.bib-citation');
    
    citations.forEach(citation => {
        citation.addEventListener('click', function() {
            const text = this.textContent;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast('Citação copiada!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Citação copiada!');
            }
        });
    });

    // Toast notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-cyan);
            color: var(--color-black);
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.track-card, .glossary-item, .paper-card, .bib-item, .manifesto-intro, .manifesto-thesis, .manifesto-method, .manifesto-context, .manifesto-conclusion');
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // Form handling (if you add contact forms later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Mensagem enviada! Responderemos em breve.');
        });
    });

    // External links handling
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Performance optimization: Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    console.log('🎵 LUCIDO - EndInSite | Site carregado com sucesso!');
});
