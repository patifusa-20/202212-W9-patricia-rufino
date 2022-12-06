import { Component } from '../component/component.js';
import {
    PokemonDetailsType,
    PokemonListType,
} from '../../models/pokemon.model.js';
import { Item } from '../pokemon.item/item.js';
import { PokemonsRepo } from '../../repository/pokemons.repo.js';

export class List extends Component {
    pokemonsUrl!: Array<PokemonListType>;
    pokemonsDetails!: Array<PokemonDetailsType>;
    pokemon!: PokemonDetailsType;
    repo = new PokemonsRepo();
    constructor(private selector: string) {
        super();
        this.init();
    }

    async init() {
        await this.loadPokemons();
        await this.getPokemonData();
    }

    async manageComponent() {
        this.template = this.createTemplate();
        this.render();

        try {
            await this.pokemonsDetails.forEach((item) => {
                new Item('ul.items', item);
            });
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    render() {
        super.cleanHtml(this.selector);
        return super.innRender(this.selector);
    }

    async loadPokemons() {
        const pokemonSV2 = await this.repo.load();
        this.pokemonsUrl = await pokemonSV2.results;
        return this.pokemonsUrl;
    }

    async getPokemonData() {
        // Lo siguiente me devuelve una promesa
        Promise.all(
            this.pokemonsUrl.map(async (element) => {
                const response = fetch(element.url);
                return (await response).json();
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
            <ul class="items"></ul>
            <div class="pagination">
                <button id="btn-next">Siguiente</button>
            </div>
        `;
    }
}
