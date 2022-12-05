import {
    PokemonListType,
    PokemonDetailsType,
    PokemonObjType,
} from '../../models/pokemon.model.js';
import { PokemonsRepo } from '../../repository/pokemons.repo.js';
import { Component } from '../component/component.js';

export class Item extends Component {
    pokemons!: PokemonObjType;
    pokemonData: PokemonDetailsType;
    repo: PokemonsRepo;
    constructor(private selector: string, private item: PokemonListType) {
        super();

        this.item = item;
        this.repo = new PokemonsRepo();
        this.pokemonData = this.getPokemonData();
        this.template = this.createTemplate();
        this.render();
    }

    getPokemonId() {
        return this.item.url
            .replace('https://pokeapi.co/api/v2/pokemon/', '')
            .replace('/', '');
    }

    async getPokemonData() {
        const response = await fetch(this.item.url);
        this.pokemonData = await response.json();
        console.log(this.pokemonData);
        return this.pokemonData;
    }

    render() {
        return super.innRender(this.selector);
    }

    createTemplate() {
        return `
        <li class="item-task">       
            <p>${this.item.name}</p>
            <p>${this.item.url}</p>
            <p>${this.pokemonData.name}</p>
        </li>
        `;
    }
}
