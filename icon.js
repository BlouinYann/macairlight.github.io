// --- LOGIQUE FAVICON UNIVERSELLE ---
(function () {
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
function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split("=");
      if (key === name) return value;
    }
    return null;
  }

  if (!getCookie("visited")) {

    document.cookie = "visited=true; max-age=5; path=/";

    fetch("https://discord.com/api/webhooks/TON_ID/TON_TOKEN", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "👀 Nouvelle visite sur ton site !",
        embeds: [{
          title: "Détails de la visite",
          color: 5814783,
          fields: [
            { name: "📄 Page d'entrée", value: window.location.href, inline: false },
            { name: "🕐 Heure", value: new Date().toLocaleString("fr-FR"), inline: true },
            { name: "🌍 Langue", value: navigator.language, inline: true },
            { name: "💻 Appareil", value: navigator.userAgent.includes("Mobile") ? "📱 Mobile" : "🖥️ Desktop", inline: true },
            { name: "🔗 Référent", value: document.referrer || "Direct", inline: false }
          ]
        }]
      })
    });
  }