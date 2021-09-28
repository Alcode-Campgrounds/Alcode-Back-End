import fetch from 'node-fetch';

export default async function fetchHeight(){
  const url = 'https://pokedex-alchemy.herokuapp.com/api/pokedex?page=4&perPage=50';
  const response = await fetch(url);
  const result = await response.json();
  const object = result.results[0];
  return { pokemon: object.pokemon, length: object.height };
}
