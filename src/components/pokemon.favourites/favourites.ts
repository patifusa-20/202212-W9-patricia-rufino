import { Component } from '../component/component.js';
import { PokemonDetailsType } from '../../models/pokemon.model.js';
import { Item } from '../pokemon.item/item.js';
import { PokemonsRepo } from '../../repository/pokemons.repo.js';

export class FavouritesList extends Component {
    pokemonsDetails!: Array<PokemonDetailsType>;
    repo = new PokemonsRepo();

    constructor(
        private selector: string,
        public url: string = 'http://localhost:3000/pokemons'
    ) {
        super();
        this.init(this.url);
    }

    async init(url: string) {
        await this.loadPokemons(url);
    }

    manageComponent() {
        this.template = this.createTemplate();
        this.render();
        try {
            this.pokemonsDetails.forEach((item) => {
                new Item('ul.items', item);
            });
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    render() {
        super.cleanHtml(this.selector);
        const element = super.innRender(this.selector);
        return element;
    }

    async loadPokemons(url: string) {
        await this.repo.load(url).then((data) => {
            this.pokemonsDetails = data;
            this.manageComponent();
        });
        return this.pokemonsDetails;
    }

    private createTemplate() {
        return `<div class="header-list">
<h3>Favourite Pokemon List</h3>
<div class="pagination"></div></div>  
<ul class="items favourites"></ul>  
`;
    }
}
