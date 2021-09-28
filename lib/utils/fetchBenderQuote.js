import fetch from 'node-fetch';

export default async function fetchBenderQuote(){
  const url = 'https://futuramaapi.herokuapp.com/api/characters/bender/1';
  const response = await fetch(url);
  const [result] = await response.json();
  return result.quote;
}
