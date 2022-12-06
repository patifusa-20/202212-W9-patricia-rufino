import { Component } from '../component/component.js';
import {
    PokemonDetailsType,
    PokemonObjType,
} from '../../models/pokemon.model.js';
import { Item } from '../pokemon.item/item.js';
import { PokemonsRepo } from '../../repository/pokemons.repo.js';

export class List extends Component {
    pokemons!: PokemonObjType;
    pokemon!: PokemonDetailsType;
    repo = new PokemonsRepo();
    constructor(private selector: string) {
        super();
        this.manageComponent(); // te pinta el componente aunque no le hayan llegado aún los Pokemons.
        this.loadPokemons();
    }

    manageComponent() {
        this.template = this.createTemplate();
        this.render();
        try {
            this.pokemons?.results?.forEach((item) => {
                // const newArray = this.pokemons.results.map((item) => item);
                // for (const element of newArray) {
                console.log('Antes de instanciar Item -> ');
                console.log(this.pokemons.results);
                new Item('ul.slot-items', item);
                console.log('Después de instanciar Item -> ');
                console.log(this.pokemons.results);
                // }
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
        this.pokemons = await this.repo.load();
        this.manageComponent();
    }

    loadPokemon(id: string) {
        return this.repo
            .query(id)
            .then((data) => console.log(data))
            .catch((error) => console.log(error.message));
    }

    private createTemplate() {
        return `
        <section class="pokemons">
            <h3>Lista de Pokemons</h3>
            <ul class="slot-items"></ul>
        </section>
        `;
    }
}
