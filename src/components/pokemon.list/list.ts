import { Component } from '../component/component.js';
import { Serie } from '../../models/pokemon.model.js';
import { Item } from '../serie.item/item.js';
import { initSeries } from '../../mocks/pokemons.mock.js';

export class List extends Component {
    series!: Array<Serie>;
    filteredList!: Array<Serie>;
    constructor(private selector: string) {
        super();
        this.refreshRender();
    }

    refreshRender() {
        this.series = initSeries();
        this.filteredList = this.filterList(this.selector);
        this.template = this.createTemplate();
        this.render();
        this.createItems(this.selector);
    }

    render() {
        super.cleanHtml(this.selector);
        return super.innRender(this.selector);
    }

    filterList(selector: string) {
        let filteredList = [];
        if (selector === '[name="list"]') {
            filteredList = this.series.filter(
                (element) => element.watched === false
            );
            return filteredList;
        }
        if (selector === '[name="list-watched"]') {
            filteredList = this.series.filter(
                (element) => element.watched === true
            );
            return filteredList;
        }
    }

    createItems(selector: string) {
        this.filteredList.forEach((element: Serie) => {
            try {
                new Item(
                    `${selector} .series-list`,
                    element,
                    this.refreshRender.bind(this)
                );
            } catch (error) {
                console.log((error as Error).message);
            }
        });
    }

    messageNoWatchedSeries = () => {
        let itemsTemplate = `<section class="series-pending"><h3 class="subsection-title">Pending series</h3>`;
        if (this.filteredList.length === 0) {
            itemsTemplate += `<p class="info">Congrats! You've watched all your series</p>`;
        } else {
            itemsTemplate += `<p class="info">You have ${this.filteredList.length} series pending to watch</p>`;
        }
        return itemsTemplate;
    };
    messageWatchedSeries = () => {
        let itemsTemplate = `<section class="series-watched"><h3 class="subsection-title">Watched series</h3>`;
        if (this.filteredList.length === 0) {
            itemsTemplate += `<p class="info">You already have not watched any serie</p>`;
        } else {
            itemsTemplate += `<p class="info">You have watched  ${this.filteredList.length} series</p>`;
        }
        return itemsTemplate;
    };
    createTemplate() {
        let itemsTemplate = '';
        const isListWatched = (element: Serie) => element.watched === false;
        const isWatched = this.filteredList.every(isListWatched);
        itemsTemplate += `            
                    ${
                        isWatched
                            ? this.messageNoWatchedSeries()
                            : this.messageWatchedSeries()
                    }                   
                <ul class="series-list"></ul>
            </section>
        `;
        return itemsTemplate;
    }
}
