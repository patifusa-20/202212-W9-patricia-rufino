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
        <li class="item">        
            <div class="item__image">
                <img src="${this.item.sprites.other.dream_world.front_default}">
            </div>   
            <div class="item__info">
                <p>${this.item.name}</p>
            </div>
        </li>
        `;
    }
}
