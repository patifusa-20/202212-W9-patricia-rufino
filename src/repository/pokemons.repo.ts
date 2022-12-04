import { P } from '../mocks/pokemons.mock.js';

export class PokemonsRepo {
    url = 'https://pokeapi.co/api/v2/pokemon/'; // ponemos la dirección del respositorio
    load() {
        return fetch(this.url).then((respuesta) => {
            if (!respuesta.ok)
                throw new Error(
                    `Error: ${respuesta.status} : ${respuesta.statusText}`
                );
            return respuesta.json();
        }); // fetch me devuelve una promesa
    }
    query(id: string) {
        return fetch(this.url + id).then((respuesta) => {
            if (!respuesta.ok)
                throw new Error(
                    `Error: ${respuesta.status} : ${respuesta.statusText}`
                );
            return respuesta.json();
        });
    }
}

console.log('repo.js se está cargando');

export const repo = new PokemonsRepo();
console.log('Load');
// repo.load()
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error.message));
repo.query('4')
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message));
