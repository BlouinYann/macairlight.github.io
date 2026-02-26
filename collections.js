document.addEventListener('DOMContentLoaded', () => {
    console.log("Script carrousel.js chargé avec succès.");

    // --- PARTIE 1 : ANIMATION DU TEXTE (Typing) ---
    const textElement = document.getElementById('typing-text');
    const btnContainer = document.getElementById('cta-container');

    if (textElement) {
        console.log("Élément de texte trouvé, lancement de l'animation...");
        const strText = "Sculpter l'éphémère";
        const splitText = strText.split("");
        textElement.innerHTML = "";

        splitText.forEach(char => {
            let content = (char === " ") ? "&nbsp;" : char;
            textElement.innerHTML += `<span class="char-fade">${content}</span>`;
        });

        let charIndex = 0;
        let timer = setInterval(() => {
            const spans = textElement.querySelectorAll('.char-fade');
            if (charIndex < spans.length) {
                spans[charIndex].classList.add('fade-in-char');
                charIndex++;
            } else {
                clearInterval(timer);
                if (btnContainer) {
                    setTimeout(() => {
                        btnContainer.classList.add('show-btn');
                        console.log("Bouton affiché.");
                    }, 500); // Délai de 0.5s
                }
            }
        }, 80);
    }

    // --- PARTIE 2 : LOGIQUE DE DÉFILEMENT DU CARROUSEL ---
    // Assure-toi que les classes correspondent à ton HTML
    const track = document.querySelector('.carousel-track'); // Le conteneur des images
    const slides = Array.from(track ? track.children : []);
    
    if (track && slides.length > 0) {
        console.log("Carrousel détecté, démarrage du mouvement...");
        
        let currentIndex = 0;

        function moveCarousel() {
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
            const amountToMove = slides[currentIndex].offsetWidth * currentIndex;
            track.style.transform = `translateX(-${amountToMove}px)`;
        }

        // Défilement automatique toutes les 3 secondes
        setInterval(moveCarousel, 3000);
    } else {
        console.log("Pas de carrousel détecté sur cette page.");
    }
});
// 1. CONFIGURATION (Identique à la page collection)
        const categoryNames = { 'lumiere': 'Lumière', 'aquatique': 'Aquatique', 'fx': 'Effets Spéciaux' };
        const dateFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });

        // 2. RÉCUPÉRATION DES PARAMÈTRES D'URL
        const params = new URLSearchParams(window.location.search);
        const catKey = params.get('cat');
        const dateVal = params.get('date');
        const titleVal = params.get('title');

        // 3. INJECTION DYNAMIQUE
        // Affichage de la catégorie
        if (catKey && categoryNames[catKey]) {
            document.getElementById('auto-category').textContent = categoryNames[catKey];
        }

        // Affichage de la date avec majuscule
        if (dateVal) {
            const dateObj = new Date(dateVal);
            let formattedDate = dateFormatter.format(dateObj);
            formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
            document.getElementById('auto-date').textContent = formattedDate;
        }

        // Affichage du titre envoyé par la page collection
        if (titleVal) {
            document.querySelector('.project-title').textContent = titleVal;
            document.title = titleVal + " | Macair'Light"; // Change aussi le titre de l'onglet
        }

        // 4. CHARGEMENT HEADER/FOOTER (Chemins remontés vers la racine)
        function loadComp(id, file) {
            fetch('../' + file) // Ajout de ../ pour aller chercher à la racine
                .then(r => r.text())
                .then(d => { document.getElementById(id).innerHTML = d; });
        }
        loadComp('header-placeholder', 'header.html');
        loadComp('footer-placeholder', 'footer.html');