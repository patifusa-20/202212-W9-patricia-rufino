import { Component } from '../component/component.js';
import { Serie } from '../../models/serie.js';
import { Score } from '../serie.score/score.js';

export class Item extends Component {
    constructor(
        private selector: string,
        private itemSerie: Serie,
        public refreshRender: () => void
    ) {
        super();
        this.template = this.createTemplate();
        this.render();
        this.createScore();
    }

    createScore() {
        try {
            new Score(
                `#item_${this.itemSerie.id} .score`,
                this.itemSerie.score
            );
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    handleRate = (event: Event) => {
        const rateElement = event.target as HTMLUListElement;
        this.itemSerie.watched = true;
        this.refreshRender();
        console.log(this.itemSerie);
    };

    render() {
        const element = super.innRender(this.selector, 'end');
        element
            .querySelector('.score')
            ?.addEventListener('click', this.handleRate.bind(this));
        return element;
    }

    createTemplate() {
        let itemsTemplate = '';
        itemsTemplate += `
                <li class="serie" id="item_${this.itemSerie.id}">
                    <img
                        class="serie__poster"
                        src="${this.itemSerie.poster}"
                        alt="${this.itemSerie.name} poster"
                    />
                    <h4 class="serie__title">${this.itemSerie.name}</h4>
                    <p class="serie__info">${this.itemSerie.creator} (${this.itemSerie.year})</p>
                    <ul class="score">
                    </ul>
                    <i class="fas fa-times-circle icon--delete"></i>
                </li>
            `;
        return itemsTemplate;
    }
}
