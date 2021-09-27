import fetch from 'node-fetch';

export default async function fetchAbility(){
  const url = 'https://pokedex-alchemy.herokuapp.com/api/pokedex?page=2&perPage=50';
  const result = await fetch(url);
  const object = await result.json();
  const onePokemon =  object.results[0];
  return { pokemon: onePokemon.pokemon, powers: onePokemon.ability_1 };
}
