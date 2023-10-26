const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const numberOfPokemons = 50; // Altere este número para obter mais ou menos Pokémons

function fetchPokemons() {
    for (let i = 1; i <= numberOfPokemons; i++) {
        fetch(apiUrl + i)
            .then(response => response.json())
            .then(pokemonData => {
                createPokemonCard(pokemonData);
            })
            .catch(error => {
                console.error('Erro ao recuperar dados da API', error);
            });
    }
}
const Url = 'https://pokeapi.co/api/v2/pokemon/';

document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search').value.toLowerCase();
    fetch(apiUrl + searchInput)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }
            return response.json();
        })
        .then(pokemonData => {
            clearPokemonList();
            createPokemonCard(pokemonData);
        })
        .catch(error => {
            console.error(error.message);
        });
});
function clearPokemonList() {
    const pokemonContainer = document.getElementById('pokemon-list');
    pokemonContainer.innerHTML = '';
}
function createPokemonCard(pokemonData) {
    const pokemonContainer = document.getElementById('pokemon-list');
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
    `;
    pokemonContainer.appendChild(pokemonCard);
}
function createPokemonCard(pokemonData) {
    const pokemonContainer = document.getElementById('pokemon-list');
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
    `;
    pokemonContainer.appendChild(pokemonCard);
}
fetchPokemons();