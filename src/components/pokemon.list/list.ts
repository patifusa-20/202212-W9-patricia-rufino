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
    favouritesPokemons!: Array<PokemonDetailsType>;
    updatedPokemonsDetailsList!: () => Array<PokemonDetailsType>;
    repo = new PokemonsRepo();

    constructor(
        private selector: string,
        public url: string = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    ) {
        super();
        this.init(this.url);
    }

    async init(url: string) {
        await this.loadPokemons(url);
        await this.getPokemonData();
    }

    manageComponent() {
        this.template = this.createTemplate();
        this.render();
        // Cuando me vayas a renderizar cada pokemon, consulta los pokemons que hay en la api local y a estos pásales un nuevo argumento en plan isFavourite=true
        try {
            new Pagination('.pagination', this.init.bind(this), this.url);
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
        Promise.all(
            this.pokemonsUrl.map(async (element) => {
                return await this.repo.load(element.url);
            })
        ).then((data) => {
            this.pokemonsDetails = data;
            //No funciona el marcado de favorito
            //this.loadFavouritesPokemons();

            this.manageComponent();
        });

        return this.pokemonsDetails;
    }

    // No funciona aún el marcado de favorito
    // async loadFavouritesPokemons() {
    //     const url = 'http://localhost:3000/pokemons';
    //     //this.favouritesPokemons = await this.repo
    //         .load(url)
    //         .then((data) => this.createUpdatePokemonList());
    //     return this.favouritesPokemons;
    // }

    async createUpdatePokemonList() {
        const updatedPokemons = this.pokemonsDetails.map((pokemon) => {
            for (const fav of this.favouritesPokemons) {
                if (pokemon.id === fav.id) {
                    pokemon.isFavourite = true;
                }
            }
            return console.log(pokemon);
        });
        //No funciona el marcado
        //return (this.updatedPokemonsDetailsList = updatedPokemons);
    }

    private createTemplate() {
        return `<div class="header-list">
<h3>Pokemon List</h3>
<div class="pagination"></div></div>  
<ul class="items"></ul>  
`;
    }
}
