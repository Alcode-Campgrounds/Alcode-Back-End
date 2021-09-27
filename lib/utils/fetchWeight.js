import fetch from 'node-fetch';

export default async function fetchWeight() {
  const url = 'https://pokedex-alchemy.herokuapp.com/api/pokedex?page=1&perPage=50';
  const send = await fetch(url);
  const result = await send.json();
  const pokedex = result.results[0];
  const pokemonObject = { pokemon: pokedex.pokemon, pounds: pokedex.weight };
  return pokemonObject;
}
