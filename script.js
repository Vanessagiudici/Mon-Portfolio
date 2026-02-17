// ============================================
// FICHIER JAVASCRIPT - INTERACTIONS DU PORTFOLIO
// ============================================
// Ce fichier gère toutes les interactions dynamiques du site :
// - Navigation fluide (smooth scroll)
// - Animations des projets au scroll
// - Bouton de retour en haut de page

// ============================================
// 1. NAVIGATION FLUIDE (SMOOTH SCROLL)
// ============================================
// Cette section permet un défilement doux lors du clic sur les liens internes (ancres)

// Sélectionne tous les liens <a> dans la navigation
document.querySelectorAll("nav a").forEach(link => {
    // Ajoute un écouteur d'événement "click" sur chaque lien
    link.addEventListener("click", event => {
        // Récupère l'attribut href du lien cliqué
        const href = link.getAttribute("href");

        // Vérifie si le lien pointe vers une section interne (commence par #)
        if (href.startsWith("#")) {
            // Empêche le comportement par défaut du navigateur (saut brutal)
            event.preventDefault();
            
            // Extrait l'ID de la section cible (retire le # du début)
            const targetId = href.substring(1);
            
            // Cherche l'élément HTML correspondant à cet ID
            const targetSection = document.getElementById(targetId);
            
            // Si la section existe dans la page
            if (targetSection) {
                // Définit un décalage de 80px pour compenser la navbar flottante
                const offset = 80;
                
                // Calcule la position verticale de la section en tenant compte du décalage
                const topPos = targetSection.offsetTop - offset;
                
                // Fait défiler la page jusqu'à cette position avec une animation douce
                window.scrollTo({ top: topPos, behavior: "smooth" });
            }
        }
        // Si le lien ne commence pas par #, le navigateur suit le lien normalement (changement de page)
    });
});

// ============================================
// 2. ANIMATION DES PROJETS AU SCROLL
// ============================================
// Cette section fait apparaître les projets progressivement quand ils entrent dans la fenêtre

// Sélectionne tous les éléments avec la classe "project"
const projects = document.querySelectorAll(".project");

// Crée un observateur d'intersection (détecte quand un élément devient visible)
const projectObserver = new IntersectionObserver(
    // Fonction callback appelée quand la visibilité d'un projet change
    entries => {
        // Parcourt chaque projet observé
        entries.forEach(entry => {
            // Si le projet entre dans la zone visible de l'écran
            if (entry.isIntersecting) {
                // Ajoute la classe "visible" qui déclenche l'animation CSS
                entry.target.classList.add("visible");
            }
        });
    },
    // Options de l'observateur
    { 
        threshold: 0.2  // Déclenche l'animation quand 20% du projet est visible
    }
);

// Si des projets existent sur la page
if (projects.length > 0) {
    // Active l'observateur pour chaque projet
    projects.forEach(project => projectObserver.observe(project));
}

// ============================================
// 3. BOUTON RETOUR EN HAUT DE PAGE
// ============================================
// Cette section gère l'affichage et le comportement du bouton "↑"

// Sélectionne le bouton avec l'ID "topBtn"
const topBtn = document.getElementById("topBtn");

// Si le bouton existe dans la page
if (topBtn) {
    // Écoute l'événement de défilement (scroll) de la page
    window.addEventListener("scroll", () => {
        // Affiche le bouton si on a défilé de plus de 300px, sinon le cache
        // scrollY : position verticale actuelle du scroll en pixels
        topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    // Écoute le clic sur le bouton
    topBtn.addEventListener("click", () => {
        // Fait défiler la page vers le haut (position 0) avec animation douce
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ============================================
// FIN DU SCRIPT
// ============================================
// Toutes les fonctionnalités sont maintenant actives et prêtes à l'emploi