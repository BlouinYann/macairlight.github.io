// --- LOGIQUE FAVICON UNIVERSELLE ---
(function() {
    // 1. On vérifie si on est sur une page projet (dans le dossier /collection/)
    // On utilise une recherche plus précise pour éviter les erreurs de déploiement
    const pathSegments = window.location.pathname.split('/');
    const isSub = pathSegments.includes('collection');

    // 2. Construction du chemin relatif pur
    // Si isSub est vrai, on met ../ sinon on reste à la racine ./
    const prefix = isSub ? '../' : './';
    const finalPath = prefix + 'Images/icon.png';

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }

    link.type = 'image/png';
    link.href = finalPath;

    // Console log pour deboguer sur le vrai site (tu pourras le supprimer après)
    console.log("Favicon chargée via : " + finalPath + " | Pathname : " + window.location.pathname);
})();