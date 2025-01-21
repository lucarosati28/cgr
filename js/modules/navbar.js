// Navbar Module
const NavbarModule = {
    init() {
        this.navbar = document.querySelector('.navbar');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        
        this.bindEvents();
    },

    bindEvents() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        this.menuToggle.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
        });
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    NavbarModule.init();
});