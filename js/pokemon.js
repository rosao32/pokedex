const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const numberOfPokemons = 50;
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const pokemonContainer = document.getElementById('pokemon-list');


searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

async function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        await fetchAndDisplayPokemons(apiUrl, 1, numberOfPokemons);
    } else {
        await fetchAndDisplayPokemonByName(searchTerm);
    }
}

async function fetchAndDisplayPokemons(apiUrl, start, end) {
    try {
        for (let i = start; i <= end; i++) {
            const response = await fetch(apiUrl + i);
            const pokemonData = await response.json();
            createPokemonCard(pokemonData);
        }
    } catch (error) {
        console.error('Erro ao recuperar dados da API', error);
    }
}

async function fetchAndDisplayPokemonByName(name) {
    try {
        const response = await fetch(apiUrl + name);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado!');
        }
        const pokemonData = await response.json();
        createPokemonCard(pokemonData);
    } catch (error) {
        console.error(error.message);
    }
}

function createPokemonCard(pokemonData) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p>${capitalizeFirstLetter(pokemonData.name)}</p>
    `;
    pokemonContainer.appendChild(pokemonCard);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Inicializa a página com os primeiros Pokémon
performSearch();
function createPokemonCard(pokemonData) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p>${capitalizeFirstLetter(pokemonData.name)}</p>
    `;

    pokemonCard.addEventListener('mouseover', () => {
        pokemonCard.classList.add('hovered');
    });

    pokemonCard.addEventListener('mouseout', () => {
        pokemonCard.classList.remove('hovered');
    });

    pokemonContainer.appendChild(pokemonCard);
}
async function fetchAndDisplayPokemonByName(name) {
    try {
        const response = await fetch(apiUrl + name);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado!');
        }
        const pokemonData = await response.json();
        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();
        const description = getEnglishDescription(speciesData);
        createPokemonCard(pokemonData, description);
    } catch (error) {
        console.error(error.message);
    }
}
function getEnglishDescription(speciesData) {
    const descriptions = speciesData.flavor_text_entries.filter(entry => entry.language.name === 'en');
    return descriptions[0].flavor_text.replace(/\n/g, ' ').trim();
}
function createPokemonCard(pokemonData, description) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p>${capitalizeFirstLetter(pokemonData.name)}</p>
        <p><strong>Força:</strong> ${pokemonData.stats[0].base_stat}</p>
        <p><strong>Poder:</strong> ${pokemonData.stats[1].base_stat}</p>
        <p><strong>Descrição:</strong> ${description}</p>
    `;
    pokemonContainer.appendChild(pokemonCard);
}
