async function getMortyCharacters(options = { forceRefresh: false }) {
    const API_URL = "https://rickandmortyapi.com/api/character";
    const CACHE_KEY = "rm_characters_v1";
    const CACHE_TTL = 1000 * 60 * 60; // 1 hora


    // Intentar leer caché
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            const age = Date.now() - parsed.timestamp;
            if (!options.forceRefresh && age < CACHE_TTL) {
                // Cache válido
                console.log("Usando cache localStorage (fresh)");
                return parsed.data;
            }
        }
    } catch (err) {
        console.warn("Error leyendo cache localStorage:", err);
    }

    // Si no hay cache o se forza, fetch desde la API
    try {
        const response = await fetch(API_URL);

        if (response.status === 429) {
            // Rate limited: usar cache si existe
            console.warn("Rate limit (429) recibido de la API");
            const raw = localStorage.getItem(CACHE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                console.log("Usando cache localStorage (fallback por 429)");
                return parsed.data;
            }
            throw new Error("Rate limited and no cache available");
        }

        const data = await response.json();
        const results = data.results || [];

        // Guardar en cache
        try {
            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ timestamp: Date.now(), data: results })
            );
        } catch (err) {
            console.warn("No se pudo guardar en localStorage:", err);
        }

        console.log("Datos obtenidos desde la API");
        return results;
    } catch (err) {
        // Fallo de red: usar cache si existe
        console.error("Fetch falló:", err);
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                console.log("Usando cache localStorage (fallback por error de fetch)");
                return parsed.data;
            }
        } catch (err2) {
            console.warn("Error leyendo cache en fallback:", err2);
        }
        throw err; // Re-lanzar si no hay cache
    }
}

// ------------------------  IMPLEMENTACION DE LA API --------------------------//


async function start() {
    const characters = await getMortyCharacters();

    const charactersContainer = document.querySelector (".character_container");
    charactersContainer.innerHTML = "";

    characters.forEach((character) => {
        const characterCard = document.createElement("article");
        characterCard.classList.add("character_card");
        // Crear estructura interna de la tarjeta y luego añadirla al contenedor
        const characterImgDiv = document.createElement("div");
        characterImgDiv.classList.add("img-container");

        const characterImg = document.createElement("img");
        characterImg.src = character.image;
        characterImg.alt = character.name;
        characterImgDiv.appendChild(characterImg);

        const characterInfo = document.createElement("div");
        characterInfo.classList.add("character_info");

        const characterName = document.createElement("h2");
        characterName.textContent = character.name;
        characterInfo.appendChild(characterName);

        const characterStatus = document.createElement("span");
        characterStatus.textContent = character.status;
        characterInfo.appendChild(characterStatus);

        characterCard.appendChild(characterImgDiv);
        characterCard.appendChild(characterInfo);
        charactersContainer.appendChild(characterCard);
    });
}

start();

// ------------------------  SWITCH MODO CLARO/OSCURO --------------------------//

const preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const toggle = document.getElementById('toggle');
const label_toggle = document.getElementById('label_toggle');

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function updateThemeUI(theme) {
    // checkbox visual
    if (toggle) toggle.checked = theme === 'dark';
    document.body.classList.toggle('dark', theme === 'dark');
    // Label icon + color
    if (label_toggle) {
        if (theme === 'dark') {
            label_toggle.innerHTML = '<i class="fa-sharp fa-solid fa-sun"></i>';
            label_toggle.style.color = '#ffff00';
        } else {
            label_toggle.innerHTML = '<i class="fa-sharp fa-solid fa-moon"></i>';
            label_toggle.style.color = '#15153b';
        }
    }
}

// Gestionar la interacción del usuario con la casilla de verificación
if (toggle) {
    toggle.addEventListener('change', (event) => {
        const theme = event.target.checked ? 'dark' : 'light';
        setTheme(theme);
        updateThemeUI(theme);
    });
}

// Inicializar el tema desde el almacenamiento local o la preferencia del sistema
const initialTheme = localStorage.getItem('theme') || preferedColorScheme;
setTheme(initialTheme);
updateThemeUI(initialTheme);

