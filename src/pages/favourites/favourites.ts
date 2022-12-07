import { Component } from '../../components/component/component.js';
import { FavouritesList } from '../../components/pokemon.favourites/favourites.js';

export class FavouritesPage extends Component {
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
        try {
            new FavouritesList('[name="favourites"]');
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    render() {
        return super.innRender(this.selector);
    }

    private createTemplate() {
        return `
        <main>
            <h2>Favourites</h2>
            <section name="favourites" class="container"></section>
        </main>
        `;
    }
}
