// Navbar Module
const NavbarModule = {
    init() {
        this.navbar = document.querySelector('.navbar');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.sections = document.querySelectorAll('main > section');
        this.navLinksElements = this.navLinks.querySelectorAll('a');
        
        this.bindEvents();
    },

    bindEvents() {
        // Scroll effect
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Mobile menu toggle
        this.menuToggle.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        this.navLinksElements.forEach(link => {
            link.addEventListener('click', this.handleLinkClick.bind(this));
        });
    },

    handleScroll() {
        const scrollPosition = window.pageYOffset;

        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (
                scrollPosition >= sectionTop && 
                scrollPosition < (sectionTop + sectionHeight)
            ) {
                // Rimuovi la classe active da tutti i link
                this.navLinksElements.forEach(link => link.classList.remove('active'));
                
                // Trova il link corrispondente alla sezione
                const correspondingLink = Array.from(this.navLinksElements).find(
                    link => link.getAttribute('href').substring(1) === section.id
                );

                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });

        // Effetto scroll sulla navbar
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },

    handleLinkClick(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Rimuovi la classe active da tutti i link
            this.navLinksElements.forEach(link => link.classList.remove('active'));
            
            // Aggiungi la classe active al link cliccato
            event.target.classList.add('active');

            // Scroll smooth alla sezione
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Chiudi il menu mobile
        this.navLinks.classList.remove('active');
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    NavbarModule.init();
});