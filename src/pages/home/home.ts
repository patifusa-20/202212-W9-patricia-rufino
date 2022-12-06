import { Component } from '../../components/component/component.js';
import { List } from '../../components/pokemon.list/list.js';

export class HomePage extends Component {
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
        try {
            new List('[name="home"]');
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
            <h2>Home</h2>
            <section name="home"></section>
        </main>
        `;
    }
}
