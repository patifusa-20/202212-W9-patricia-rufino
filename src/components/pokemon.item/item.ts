import { PokemonListType } from '../../models/pokemon.model.js';
import { Component } from '../component/component.js';

export class Item extends Component {
    constructor(private selector: string, private item: PokemonListType) {
        super();
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        return super.innRender(this.selector);
    }

    private createTemplate() {
        return `
        <li class="item-task">
            <p>${this.item.name}</p>
            <a href="${this.item.url}">${this.item.url}</a>
        </li>
        `;
    }
}
