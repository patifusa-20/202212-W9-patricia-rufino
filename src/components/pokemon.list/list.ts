import { Component } from '../component/component.js';
import {
    PokemonDetailsType,
    PokemonListType,
} from '../../models/pokemon.model.js';
import { Item } from '../pokemon.item/item.js';
import { PokemonsRepo } from '../../repository/pokemons.repo.js';
import { Pagination } from '../pokemon.pagination/pagination.js';

export class List extends Component {
    pokemonsUrl!: Array<PokemonListType>;
    pokemonsDetails!: Array<PokemonDetailsType>;
    repo = new PokemonsRepo();
    urlOffsetPokemon = 0;
    resultsPerPage = 20;
    maxResults = 300;
    url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

    constructor(private selector: string) {
        super();
        this.init(this.url);
    }

    async init(url: string) {
        await this.loadPokemons(url);
        await this.getPokemonData();
    }

    async manageComponent() {
        this.template = this.createTemplate();
        this.render();
        try {
            //new Pagination('.pagination');
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
        page = page + this.resultsPerPage;
        this.url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page}`;
        this.init(this.url);
        return (this.urlOffsetPokemon = page);
    }

    refreshPrevPage(page: number) {
        page = page - this.resultsPerPage;
        this.url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page}`;
        this.init(this.url);
        return (this.urlOffsetPokemon = page);
    }

    handleNextButton() {
        this.refreshNextPage(this.urlOffsetPokemon);
    }

    handlePrevButton() {
        this.refreshPrevPage(this.urlOffsetPokemon);
    }

    private createTemplate() {
        return `
            <h3>Pokemon List</h3>
            <div class="pagination"><p>${
                this.resultsPerPage + this.urlOffsetPokemon
            } / ${this.maxResults}</p>
         ${
             this.urlOffsetPokemon === 0
                 ? ``
                 : `<button id="btn-prev">Prev</button>`
         }   
            ${
                this.resultsPerPage + this.urlOffsetPokemon === this.maxResults
                    ? ``
                    : `<button id="btn-next">Next</button>`
            } </div>  
            <ul class="items"></ul>  
        `;
    }
}
