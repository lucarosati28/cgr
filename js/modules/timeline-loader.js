// Timeline Loader Module
const TimelineLoader = {
    async init() {
        try {
            const response = await fetch('sections/timeline.html');
            const html = await response.text();
            
            // Inserisci la timeline nel main
            const timelineContainer = document.getElementById('timeline-container');
            if (timelineContainer) {
                timelineContainer.innerHTML = html;
                this.initializeTimeline();
            }
        } catch (error) {
            console.error('Errore nel caricamento della timeline:', error);
        }
    },

    initializeTimeline() {
        // Qui andrà tutta la logica di inizializzazione della timeline
        // Che sposteremo dal file principale
        this.bindEvents();
        this.setupAnimations();
    },

    bindEvents() {
        // Event handlers per la timeline
        document.querySelectorAll('.timeline-group').forEach(group => {
            const header = group.querySelector('.group-header');
            if (header) {
                header.addEventListener('click', (e) => this.toggleGroup(e, group));
            }
        });
    },

    toggleGroup(e, group) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = group.classList.contains('active');
        
        // Chiudi tutti i gruppi
        document.querySelectorAll('.timeline-group').forEach(g => {
            g.classList.remove('active');
        });

        if (!isActive) {
            group.classList.add('active');
            this.scrollToGroup(group);
        }
    },

    scrollToGroup(group) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const groupTop = group.getBoundingClientRect().top + window.scrollY;
        const scrollPosition = groupTop - navbarHeight - 20;

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    },

    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.timeline-group').forEach(group => {
            observer.observe(group);
        });
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    TimelineLoader.init();
});