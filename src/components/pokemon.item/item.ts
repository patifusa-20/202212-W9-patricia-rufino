import { PokemonDetailsType } from '../../models/pokemon.model.js';
import { PokemonsRepo } from '../../repository/pokemons.repo.js';
import { Component } from '../component/component.js';

export class Item extends Component {
    elementRender: Element;
    repo = new PokemonsRepo();
    favouriteBtn: string;
    constructor(private selector: string, private item: PokemonDetailsType) {
        super();
        this.item.isFavourite = false;
        this.favouriteBtn = `icon-btn">`;
        this.template = this.createTemplate();
        this.elementRender = this.render();
    }

    render() {
        const element = super.innRender(this.selector);
        element
            .querySelector('#favourite-btn')
            ?.addEventListener('click', this.handleFavouriteButton.bind(this));
        return element;
    }

    async updateFavouritesList() {
        const url = 'http://localhost:3000/pokemons';
        await this.repo.create(this.item, url);
        //this.favouriteBtn = `icon-btn favourite">`
        return console.log(this.favouriteBtn);
    }

    handleFavouriteButton() {
        // const favouriteBtn = this.elementRender.querySelector('#favourite-btn');
        // favouriteBtn?.classList.add('isFavourite');
        this.updateFavouritesList();
        console.log(this.item.name + ' ' + this.item.id);
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
            <button type="button" id="favourite-btn" class="
            ${this.favouriteBtn}<span class="material-symbols-outlined">
favorite
</span></button>
            
        </li>
        `;
    }
}
