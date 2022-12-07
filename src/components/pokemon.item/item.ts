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
        const element = super.innRender(this.selector);
        element
            .querySelector('#favourite-btn')
            ?.addEventListener('click', this.handleFavouriteButton.bind(this));
        return element;
    }

    handleFavouriteButton() {
        console.log('estoy clicando');
    }

    createTemplate() {
        return `
        <li class="item">
            <a href="details.html?id=${this.item.id}">
            <div class="item__image">
                <img src="${this.item.sprites.other.dream_world.front_default}">
            </div>
            <div class="item__info">
                <p>${this.item.name}</p>
            </div></a>
            <button type="button" id="favourite-btn" class="icon-btn"><span class="material-symbols-outlined">
favorite
</span></button>
            
        </li>
        `;
    }
}
