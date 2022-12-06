import {
    PokemonListType,
    PokemonDetailsType,
    PokemonObjType,
} from '../../models/pokemon.model.js';
import { PokemonsRepo } from '../../repository/pokemons.repo.js';
import { Component } from '../component/component.js';

export class Item extends Component {
    pokemons!: PokemonObjType;
    pokemonData!: PokemonDetailsType;
    repo: PokemonsRepo;
    constructor(private selector: string, private item: PokemonListType) {
        super();

        this.item = item;
        this.repo = new PokemonsRepo();
        this.printPokemon();
        this.template = this.createTemplate();
        this.render();
    }

    getPokemonId() {
        return this.item.url
            .replace('https://pokeapi.co/api/v2/pokemon/', '')
            .replace('/', '');
    }

    getPokemonData() {
        // Lo siguiente me devuelve una promesa
        const respuesta = fetch(this.item.url).then((response) => {
            return response.json();
        });
        // Resuelvo la promesa ->
        return respuesta
            .then((data) => data)
            .catch((error) => console.log(error.message));
    }

    async printPokemon() {
        const a = await this.getPokemonData();
        this.pokemonData = a;
        this.manageComponent();
    }

    manageComponent() {
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        super.cleanHtml(this.selector);
        return super.innRender(this.selector);
    }

    createTemplate() {
        return `
        <li class="item-task">     
            <p>${this.item.name}</p>
            <p>${this.item.url}</p>
            <p>${this.pokemonData.name}</p>
            <img src="${this.pokemonData.sprites.front_default}">
        </li>
        `;
    }
}
