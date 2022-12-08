import { Pokemon, PokemonDetailsType } from '../models/pokemon.model.js';
import { Repository } from './repo.js';

export class PokemonsRepo implements Repository<Pokemon> {
    load(url: string) {
        return fetch(url).then((respuesta) => {
            if (!respuesta.ok)
                throw new Error(
                    `Error: ${respuesta.status} : ${respuesta.statusText}`
                );
            return respuesta.json();
        }); // fetch me devuelve una promesa
    }

    create(payload: Partial<PokemonDetailsType>, url: string) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        }).then((respuesta) => {
            if (!respuesta.ok)
                throw new Error(
                    `Error ${respuesta.status}: ${respuesta.statusText}`
                );
            return respuesta.json();
        });
    }
}
