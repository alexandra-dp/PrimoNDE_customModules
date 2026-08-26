(function () {
    /* ---------- 1️⃣ CONFIGURATION DES TRADUCTIONS ---------- */
    // Clé = code de la langue (défini dans <html lang="...">)
    // Valeur = objet avec le contenu à injecter (texte ou code d'icône)
    const I18N_CONTENT = {
        'en': {
            'call-number': 'Call number: ',       // Contenu pour le numéro
            'sub-location': 'Location: '          // Contenu pour la sous-location
        },
        'fr': {
            'call-number': 'Cote : ',    // Exemple français
            'sub-location': 'Emplacement : '
        },
        'de': {
            'call-number': 'Signatur : ',       // Exemple allemand
            'sub-location': 'Standort : '
        }
        // Ajoutez d'autres langues ici si nécessaire
    };

    /* ---------- 2️⃣ SÉLECTEURS CSS (Path exact) ---------- */
    // Nous utilisons la hiérarchie exacte que vous avez donnée pour cibler les éléments
    const SELECTORS = {
        'call-number': 'nde-locations-container nde-location .location-brief-properties-container span[data-qa="location-call-number"]::before',
        'sub-location': 'nde-location .location-brief-properties-container span[data-qa="location-sub-location"]::before'
    };

    /* ---------- 3️⃣ CRÉATION DU STYLE DYNAMIQUE ---------- */
    // On crée une balise style unique pour éviter d'en encombrer le DOM
    const STYLE_ID = 'dynamic-i18n-pseudo';
    let styleTag = document.getElementById(STYLE_ID);

    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = STYLE_ID;
        document.head.appendChild(styleTag);
    }

    function updatePseudoContent() {
        // 1. Détection de la langue
        const htmlLang = document.documentElement.getAttribute('lang');
        const lang = htmlLang ? htmlLang.toLowerCase().split('-')[0] : 'fr'; // Fallback 'eng'
        const translations = I18N_CONTENT[lang] || I18N_CONTENT['fr']; // Fallback sur anglais si langue inconnue

        // 2. Construction de la chaîne CSS
        let cssRules = '';
        
        Object.keys(SELECTORS).forEach((key) => {
            const selector = SELECTORS[key];
            const contentText = translations[key];

            if (contentText) {
                // On utilise les guillemets simples pour que le CSS soit valide : content: 'Text';
                // IMPORTANT : Si c'est une icône, il faut le code Unicode (ex: '\f075') ou une URL
                const formattedContent = `"${contentText}"`; 
                
                cssRules += `${selector} { content: ${formattedContent} !important; } \n`;
            }
        });

        // 3. Application du style
        styleTag.innerHTML = cssRules;
    }

    /* ---------- 4️⃣ OBSERVATION DU CHANGEMENT DE LANGUE ---------- */
    function startObserver() {
        const htmlElement = document.documentElement;
        if (!htmlElement) {
            console.warn("Balise HTML introuvable");
            return;
        }

        // On observe l'attribut 'lang' de la balise <html>
        new MutationObserver(() => {
            updatePseudoContent();
        }).observe(htmlElement, { attributes: true, attributeFilter: ['lang'] });

        // Première application
        updatePseudoContent();
    }

    // Démarrage
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserver);
    } else {
        startObserver();
    }
})();

/* ================================================================
   DODGE FOOTER
   Les boutons flottants (back-to-top, contact bibliothèque)
   restent à leur position par défaut en bas de la fenêtre,
   puis remontent juste au-dessus du footer dès que celui-ci
   entre dans le viewport.
   Cible les éléments internes (.back-to-top-button / .report-a-problem-button)
   qui portent le position:fixed de Primo.
   ================================================================ */
(function () {
    const MARGIN = 16; // px entre le bas des boutons et le haut du footer
    const BTN_SELECTOR = '.back-to-top-button, .report-a-problem-button';

    function updateButtons(footer) {
        // Re-query à chaque appel : les boutons peuvent apparaître/disparaître dynamiquement
        const buttons = [...document.querySelectorAll(BTN_SELECTOR)];
        if (!buttons.length) return;

        const footerTop = footer.getBoundingClientRect().top;
        const vh = window.innerHeight;

        if (footerTop < vh) {
            const bottom = (vh - footerTop + MARGIN) + 'px';
            buttons.forEach(btn => btn.style.setProperty('bottom', bottom, 'important'));
        } else {
            buttons.forEach(btn => btn.style.removeProperty('bottom'));
        }
    }

    function init() {
        const footer = document.querySelector('nde-footer');
        if (!footer) return false;

        const onScroll = () => requestAnimationFrame(() => updateButtons(footer));
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        onScroll(); // vérification initiale
        return true;
    }

    function waitForDom(left = 30) {
        if (init() || left <= 0) return;
        setTimeout(() => waitForDom(left - 1), 400);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => waitForDom());
    } else {
        waitForDom();
    }
})();

