// 1. Création dynamique de l'overlay au chargement du script
const createOverlay = () => {
    // On vérifie si l'overlay existe déjà pour éviter les doublons
    if (document.querySelector('.page-transition-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = '<div class="loader-content">Macair\'Light</div>';
    document.body.prepend(overlay); 
};

// On lance la création dès que possible
if (document.body) {
    createOverlay();
} else {
    window.addEventListener('DOMContentLoaded', createOverlay);
}

// 2. Gestion de l'apparition (Fade In) - ON GARDE LA TRANSITION FLUIDE
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('is-loaded');
    }, 300); // Petit délai pour stabiliser l'affichage et laisser le rideau s'ouvrir
});

// 3. Gestion du clic et de la sortie (Fade Out) - MODIFIÉ POUR ÊTRE UN "CUT"
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');

    if (link && link.href.includes('.html')) {
        // On ignore les liens externes ou mails
        if (link.target === '_blank' || link.href.includes('mailto:') || link.getAttribute('href').startsWith('#')) return;

        e.preventDefault();
        const destination = link.href;

        // --- MODIFICATION ICI : PAS DE TRANSITION DE SORTIE ---
        // Au lieu d'attendre 1s avec une animation, on part directement.
        // On peut quand même ajouter une classe flash pour le feedback visuel si tu veux,
        // mais le plus efficace pour un "cut" est le changement immédiat :
        
        window.location.href = destination;
    }
});
// --- LOGIQUE FAVICON ---
(function() {
    const isSub = window.location.pathname.includes('/collection/');
    // On construit le chemin : ../ si on est dans un dossier, sinon direct
    const finalPath = (isSub ? '../' : './') + 'Images/icon.png';

    // On vérifie si un lien favicon existe déjà pour ne pas faire de doublons
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }

    link.type = 'image/png';
    // Le "?v=1" force le navigateur à recharger l'image s'il l'avait en cache
    link.href = finalPath + '?v=1'; 
    
    console.log("Tentative de chargement favicon : " + finalPath);
})();