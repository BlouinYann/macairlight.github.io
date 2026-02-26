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
    const track = document.querySelector('.carousel-track'); 
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

        setInterval(moveCarousel, 3000);
    } else {
        console.log("Pas de carrousel détecté sur cette page.");
    }

    // --- PARTIE 3 : RÉCUPÉRATION DES PARAMÈTRES D'URL ---
    const categoryNames = { 'lumiere': 'Lumière', 'aquatique': 'Aquatique', 'fx': 'Effets Spéciaux' };
    const dateFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });

    const params = new URLSearchParams(window.location.search);
    const catKey = params.get('cat');
    const dateVal = params.get('date');
    const titleVal = params.get('title');

    if (catKey && categoryNames[catKey]) {
        const autoCat = document.getElementById('auto-category');
        if (autoCat) autoCat.textContent = categoryNames[catKey];
    }

    if (dateVal) {
        const dateObj = new Date(dateVal);
        let formattedDate = dateFormatter.format(dateObj);
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        const autoDate = document.getElementById('auto-date');
        if (autoDate) autoDate.textContent = formattedDate;
    }

    if (titleVal) {
        const projectTitle = document.querySelector('.project-title');
        if (projectTitle) projectTitle.textContent = titleVal;
        document.title = titleVal + " | Macair'Light";
    }

    // --- PARTIE 4 : CHARGEMENT HEADER/FOOTER (RELATIF) ---
    function loadComp(id, file) {
        // On vérifie si la page actuelle est dans un sous-dossier (comme /collection/)
        // Si oui, on ajoute "../" pour remonter à la racine
        const isSubfolder = window.location.pathname.includes('/collection/');
        const path = isSubfolder ? '../' + file : './' + file;

        fetch(path)
            .then(response => {
                if (!response.ok) throw new Error("Fichier non trouvé : " + path);
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(id);
                if (element) {
                    // Si on est dans un sous-dossier, on doit aussi corriger 
                    // les liens du header pour qu'ils remontent d'un niveau
                    let correctedData = data;
                    if (isSubfolder) {
                        // Transforme href="index.html" en href="../index.html"
                        correctedData = data.replace(/href="(?!http|#|\/)/g, 'href="../');
                    }
                    
                    element.innerHTML = correctedData;
                }
            })
            .catch(error => console.error("Erreur loadComp:", error));
    }

    loadComp('header-placeholder', 'header.html');
    loadComp('footer-placeholder', 'footer.html');
});