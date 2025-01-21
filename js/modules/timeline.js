// Timeline Module
const TimelineModule = {
    init() {
        this.timeline = document.querySelector('.timeline');
        this.groups = document.querySelectorAll('.timeline-group');
        this.activeGroup = null;
        this.isAnimating = false;
        
        this.setupIntersectionObserver();
        this.bindEvents();
    },

    setupIntersectionObserver() {
        // Observer per le animazioni di entrata
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opzionale: smetti di osservare dopo l'animazione
                    // this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Osserva tutti i gruppi della timeline
        this.groups.forEach(group => {
            this.observer.observe(group);
        });
    },

    bindEvents() {
        // Gestione click sui gruppi
        this.groups.forEach(group => {
            const header = group.querySelector('.group-header');
            if (header) {
                header.addEventListener('click', (e) => this.handleGroupClick(e, group));
            }
        });

        // Gestione scroll per effetti parallax
        window.addEventListener('scroll', () => {
            if (!this.isAnimating) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    this.isAnimating = false;
                });
                this.isAnimating = true;
            }
        });
    },

    handleGroupClick(e, group) {
        e.preventDefault();
        e.stopPropagation();

        if (this.activeGroup === group) {
            // Chiudi il gruppo se è già attivo
            this.closeGroup(group);
        } else {
            // Chiudi il gruppo attivo precedente
            if (this.activeGroup) {
                this.closeGroup(this.activeGroup);
            }
            // Apri il nuovo gruppo
            this.openGroup(group);
        }
    },

    openGroup(group) {
        // Chiudi tutti i gruppi
        this.groups.forEach(g => g.classList.remove('active'));
        
        // Apri il gruppo selezionato
        group.classList.add('active');
        this.activeGroup = group;

        // Scorri alla posizione del gruppo
        this.scrollToGroup(group);

        // Attiva le animazioni degli eventi
        const events = group.querySelectorAll('.timeline-item');
        events.forEach((event, index) => {
            setTimeout(() => {
                event.style.opacity = '1';
                event.style.transform = 'translateY(0)';
            }, index * 100);
        });
    },

    closeGroup(group) {
        group.classList.remove('active');
        this.activeGroup = null;

        // Resetta le animazioni degli eventi
        const events = group.querySelectorAll('.timeline-item');
        events.forEach(event => {
            event.style.opacity = '0';
            event.style.transform = 'translateY(20px)';
        });
    },

    scrollToGroup(group) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const groupRect = group.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetScroll = scrollTop + groupRect.top - navbarHeight - 20;

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    },

    handleScroll() {
        // Effetto parallax sulla linea centrale
        if (this.timeline) {
            const timelineRect = this.timeline.getBoundingClientRect();
            if (timelineRect.top < window.innerHeight && timelineRect.bottom > 0) {
                const progress = (window.innerHeight - timelineRect.top) / (window.innerHeight + timelineRect.height);
                const line = this.timeline.querySelector('::before');
                if (line) {
                    line.style.transform = `scaleY(${Math.min(progress, 1)})`;
                }
            }
        }

        // Aggiorna l'opacità dei marker in base alla posizione
        const markers = document.querySelectorAll('.timeline-marker');
        markers.forEach(marker => {
            const rect = marker.getBoundingClientRect();
            const distance = Math.abs(rect.top - window.innerHeight / 2);
            const maxDistance = window.innerHeight / 2;
            const opacity = 1 - Math.min(distance / maxDistance, 1);
            marker.style.opacity = opacity.toString();
        });
    },

    // Utility per controllare se un elemento è visibile nella viewport
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Inizializza il modulo quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    TimelineModule.init();
});