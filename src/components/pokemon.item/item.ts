import {
    PokemonDetailsType,
    PokemonObjType,
} from '../../models/pokemon.model.js';
import { Component } from '../component/component.js';

export class Item extends Component {
    pokemons!: PokemonObjType;
    pokemonData!: PokemonDetailsType;
    constructor(
        private selector: string,
        private item: PokemonDetailsType //private getPokemonData: (url: string) => Promise<any>
    ) {
        super();
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        return super.innRender(this.selector);
    }

    createTemplate() {
        return `
        <li class="item-task">           
            <p>${this.item.name}</p>
            <img src="${this.item.sprites.front_default}">
        </li>
        `;
    }
}
