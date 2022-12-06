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
    repo = new PokemonsRepo();
    url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    urlOffsetPokemon = 0;
    constructor(private selector: string) {
        super();
        this.init();
    }

    async init() {
        await this.loadPokemons(this.url);
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
        const element = super.innRender(this.selector);
        document
            .querySelector('#btn-next')
            ?.addEventListener('click', this.handleNextButton.bind(this));
        document
            .querySelector('#btn-prev')
            ?.addEventListener('click', this.handlePrevButton.bind(this));
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

    refreshNextPage(page: number) {
        page = page + 10;
        this.url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page}`;
        this.init();
        return (this.urlOffsetPokemon = page);
    }

    handleNextButton() {
        this.refreshNextPage(this.urlOffsetPokemon);
    }

    refreshPrevPage(page: number) {
        page = page - 10;
        this.url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page}`;
        this.init();
        return (this.urlOffsetPokemon = page);
    }

    handlePrevButton() {
        this.refreshPrevPage(this.urlOffsetPokemon);
    }

    private createTemplate() {
        return `
            <h3>Pokemon List</h3>
            <div class="pagination">
            ${
                this.urlOffsetPokemon === 0
                    ? ``
                    : `<button id="btn-prev">Prev</button>`
            }                

                <button id="btn-next">Next</button>
            </div>  
            <ul class="items"></ul>  
        `;
    }
}
