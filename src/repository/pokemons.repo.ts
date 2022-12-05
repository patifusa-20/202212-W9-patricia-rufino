import { Pokemon } from '../models/pokemon.model.js';
import { Repository } from './repo.js';

export class PokemonsRepo implements Repository<Pokemon> {
    url = 'https://pokeapi.co/api/v2/pokemon/'; // ponemos la dirección del repositorio

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
                    `Error ${respuesta.status}: ${respuesta.statusText}`
                );
            return respuesta.json();
        });
    }
}

export const repo = new PokemonsRepo();

// Comentario
// repo.load()
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error.message));
// repo.query('4')
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error.message));
