    // 1. Fonction de chargement simple
    function loadComponent(id, file) {
        fetch(file)
            .then(r => r.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            });
    }

    // 2. Gestionnaire du menu mobile (Délégation d'événement)
    document.addEventListener('click', function(e) {
        // On vérifie si on a cliqué sur le bouton burger ou un de ses traits
        const menuBtn = e.target.closest('#mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        if (menuBtn && navLinks) {
            menuBtn.classList.toggle('is-active');
            navLinks.classList.toggle('active');
            
            // Empêche le scroll quand le menu est ouvert
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        }

        // Ferme le menu si on clique sur un lien à l'intérieur
        if (e.target.closest('.nav-links a')) {
            const btn = document.getElementById('mobile-menu');
            const menu = document.querySelector('.nav-links');
            btn.classList.remove('is-active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 3. Appels des composants
    loadComponent('header-placeholder', '../header.html');
    loadComponent('footer-placeholder', '../footer.html');
