import { Component } from '../component/component.js';
import {
    PokemonDetailsType,
    PokemonListType,
} from '../../models/pokemon.model.js';
import { Item } from '../pokemon.item/item.js';
import { PokemonsRepo } from '../../repository/pokemons.repo.js';
import { Pagination } from '../pokemon.pagination/pagination.js';

const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

export class List extends Component {
    pokemonsUrl!: Array<PokemonListType>;
    pokemonsDetails!: Array<PokemonDetailsType>;
    repo = new PokemonsRepo();

    constructor(private selector: string) {
        super();
        this.init(url);
    }

    async init(url: string) {
        await this.loadPokemons(url);
        await this.getPokemonData();
    }

    async manageComponent() {
        this.template = this.createTemplate();
        this.render();
        try {
            new Pagination('.pagination', this.init.bind(this), url);
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
        const pokemonSV2 = await this.repo.load(url);
        this.pokemonsUrl = await pokemonSV2.results;
        return this.pokemonsUrl;
    }

    async getPokemonData() {
        // Lo siguiente me devuelve una promesa
        Promise.all(
            this.pokemonsUrl.map(async (element) => {
                return await this.repo.load(element.url);
            })
        ).then((data) => {
            this.pokemonsDetails = data;
            this.manageComponent();
        });

        return this.pokemonsDetails;
    }

    private createTemplate() {
        return `
<h3>Pokemon List</h3>
<div class="pagination"></div>  
<ul class="items"></ul>  
`;
    }
}
