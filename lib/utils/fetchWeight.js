import fetch from 'node-fetch';

export default async function fetchWeight() {
  const url = 'https://pokedex-alchemy.herokuapp.com/api/pokedex?page=1&perPage=50';
  const send = await fetch(url);
  const result = await send.json();
  //   console.log(result.results.map(item => {
  //     return { pokemon: item.pokemon, weight: item.weight };
  //   }));
  return result.results.map(item => {
    return { pokemon: item.pokemon, weight: item.weight };
  });
}
