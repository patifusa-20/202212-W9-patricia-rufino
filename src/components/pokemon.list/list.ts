import { Component } from '../component/component.js';
import { PokemonObjType } from '../../models/pokemon.model.js';
import { Item } from '../pokemon.item/item.js';
import { PokemonsRepo } from '../../repository/pokemons.repo.js';

export class List extends Component {
    pokemons!: PokemonObjType;
    serviceStore = new PokemonsRepo();
    repo = new PokemonsRepo();
    constructor(private selector: string) {
        super();
        this.manageComponent(); // te pinta el componente aunque no le hayan llegado aún los Pokemons.
        
    }

    manageComponent() {
        this.template = this.createTemplate();
        this.render();
        try {
            this.pokemons.results.forEach(
this.loadPokemons();
                (item) => new Item('ul.slot-items', item)
            );
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

    async loadPokemon(id: string) {
        this.pokemons = await this.repo.query(id);
        this.manageComponent();
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
