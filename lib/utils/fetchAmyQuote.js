import fetch from 'node-fetch';

export default async function fetchAmyQuote(){
  const url = 'https://futuramaapi.herokuapp.com/api/characters/amy/1';
  const response = await fetch(url);
  const [object] = await response.json();
  return object.quote;
}
