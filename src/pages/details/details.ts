import { Component } from '../../components/component/component.js';
import { DetailsPokemon } from '../../components/pokemon.details/details.js';
import { PokemonDetailsType } from '../../models/pokemon.model.js';

export class DetailsPage extends Component {
    itemId!: string;
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
        this.getPokemonId();
        try {
            new DetailsPokemon('[name="details"]', this.itemId);
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    render() {
        return super.innRender(this.selector);
    }

    getPokemonId() {
        const path = location.search;
        const pokemonId = path.slice(4);
        this.itemId = pokemonId;
        return this.itemId;
    }

    private createTemplate() {
        return `
        <main>
            <h2>Details</h2>
            <section name="details"></section>
        </main>
        `;
    }
}
