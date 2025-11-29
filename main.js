async function getMortyCharacters(options = { forceRefresh: false }) {
    const API_URL = "https://rickandmortyapi.com/api/character";
    const CACHE_KEY = "rm_characters_v1";
    const CACHE_TTL = 1000 * 60 * 60; // 1 hora


    // intentar leer caché
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            const age = Date.now() - parsed.timestamp;
            if (!options.forceRefresh && age < CACHE_TTL) {
                // cache válido
                console.log("Usando cache localStorage (fresh)");
                return parsed.data;
            }
        }
    } catch (err) {
        console.warn("Error leyendo cache localStorage:", err);
    }

    // si no hay cache o se forza, fetch desde la API
    try {
        const response = await fetch(API_URL);

        if (response.status === 429) {
            // rate limited: usar cache si existe
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

        // guardar en cache
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
        // fallo de red: usar cache si existe
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
        throw err; // re-lanzar si no hay cache
    }
}

async function start() {
    const characters = await getMortyCharacters();

    const charactersContainer = document.querySelector (".character_container");
    charactersContainer.innerHTML = "";

    characters.forEach((character) => {
        const characterCard = document.createElement("article");
        characterCard.classList.add("character_card");
        // crear estructura interna de la tarjeta y luego añadirla al contenedor
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

        // añadir elementos dentro de la tarjeta
        characterCard.appendChild(characterImgDiv);
        characterCard.appendChild(characterInfo);

        // finalmente añadir la tarjeta al contenedor
        charactersContainer.appendChild(characterCard);
    });
}

start();

let toggle = document.getElementById('toggle');
let label_toggle = document.getElementById('label_toggle');
toggle.addEventListener('change',(event) => {
    let checked = event.target.checked;
    document.body.classList.toggle('dark');

    if (checked==true){
        label_toggle.innerHTML='<i class="fa-sharp fa-solid fa-sun"></i>'
        label_toggle.style.color= '#ffff00';
    }else {
        label_toggle.innerHTML='<i class="fa-sharp fa-solid fa-moon"></i>'
        label_toggle.style.color= '#15153b';
    }
    
})