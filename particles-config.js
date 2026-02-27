/**
 * Macair'Light - Système d'Étoiles Scintillantes Dynamiques
 */

const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 70; // Nombre d'étoiles simultanées

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Star {
        constructor() {
            this.spawn();
            // On donne une opacité de départ aléatoire pour ne pas qu'elles s'allument toutes en même temps
            this.opacity = Math.random();
            this.fadeSpeed = Math.random() * 0.005 + 0.002; 
        }

        // Fonction pour "téléporter" l'étoile
        spawn() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    // On passe d'un max de 1.5 à un max de 4 ou 5
    this.size = Math.random() * 1.0 + 0.5; 
    this.opacity = 0;
    this.direction = 1;
    this.fadeSpeed = Math.random() * 0.01 + 0.005;
}

        update() {
            // Gestion du cycle de vie (Apparition / Disparition)
            this.opacity += this.fadeSpeed * this.direction;

            // Si l'étoile atteint son éclat max, elle commence à s'éteindre
            if (this.opacity >= 0.8) {
                this.direction = -1;
            }

            // Si l'étoile est devenue invisible, on la fait réapparaître ailleurs
            if (this.opacity <= 0 && this.direction === -1) {
                this.spawn();
            }
        }

        draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    
    const spikes = 4;
    // On multiplie par 15 au lieu de 8 pour allonger les branches
    const outerRadius = (this.size * 15) * this.opacity; 
    const innerRadius = (this.size / 2) * this.opacity; // Un peu plus épais au centre

    let rot = Math.PI / 2 * 3;
    let step = Math.PI / spikes;

    ctx.moveTo(0, 0 - outerRadius);
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
        rot += step;
    }
    
    ctx.closePath();
    
    // Halo plus large pour l'éclat
    ctx.shadowBlur = 15 * this.opacity; // Augmenté de 8 à 15
    ctx.shadowColor = 'white';
    
    ctx.fillStyle = `rgba(226, 226, 229, ${this.opacity})`;
    ctx.fill();
    ctx.restore();
}
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Star());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}

