import {
    PokemonDetailsType,
    PokemonObjType,
} from '../../models/pokemon.model.js';
import { PokemonsRepo } from '../../repository/pokemons.repo.js';
import { Component } from '../component/component.js';

export class DetailsPokemon extends Component {
    pokemonDetails!: PokemonDetailsType;
    repo = new PokemonsRepo();
    url: string;
    constructor(
        private selector: string,
        private itemId: string //private getPokemonData: (url: string) => Promise<any>
    ) {
        super();
        this.url = `https://pokeapi.co/api/v2/pokemon/${itemId}`;
        this.getPokemonData();
    }

    async manageComponent() {
        this.template = await this.createTemplate();
        await this.render();
    }

    render() {
        return super.innRender(this.selector);
    }

    async loadPokemons() {
        const pokemonSV2 = await this.repo.load(this.url);
        return pokemonSV2;
    }

    async getPokemonData() {
        this.loadPokemons().then((data) => {
            this.pokemonDetails = data;
            this.manageComponent();
        });
    }

    createTemplate() {
        return `
        <div class="item-detail">       
            <div class="item-detail__image">
                <img src="${this.pokemonDetails.sprites.other.dream_world.front_default}">
            </div>  
            <div class="item-detail__image">
                <img src="${this.pokemonDetails.sprites.back_default}">
            </div>  
            <div class="item-detail__image">
                <img src="${this.pokemonDetails.sprites.front_shiny}">
            </div> 
            <div class="item-detail__image">
                <img src="${this.pokemonDetails.sprites.back_shiny}">
            </div>   
            <div class="item-detail__info">
                <p>${this.pokemonDetails.name}</p>
                <p>Weight: ${this.pokemonDetails.weight}</p>
                <p>Height: ${this.pokemonDetails.height}</p>
                <p>Base experience: ${this.pokemonDetails.base_experience}</p>
            </div>
        </div>
        `;
    }
}
