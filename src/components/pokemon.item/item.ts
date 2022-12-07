import { PokemonDetailsType } from '../../models/pokemon.model.js';
import { PokemonsRepo } from '../../repository/pokemons.repo.js';
import { Component } from '../component/component.js';

export class Item extends Component {
    elementRender: Element;
    repo = new PokemonsRepo();
    constructor(private selector: string, private item: PokemonDetailsType) {
        super();
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
        await this.repo
            .create(this.item, url)
            .then((data) => console.log(data));
    }

    handleFavouriteButton() {
        console.log(
            `estoy clicando el botón de favorito del Pokemon ${this.item.name}`
        );
        const favouriteBtn = this.elementRender.querySelector('#favourite-btn');
        favouriteBtn?.classList.add('isFavourite');
        this.updateFavouritesList();
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
