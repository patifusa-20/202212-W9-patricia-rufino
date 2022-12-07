import { Component } from '../component/component.js';

let urlOffsetPokemon = 0;
export class Pagination extends Component {
    resultsPerPage = 20;
    maxResults = 300;
    url: string;
    constructor(
        private selector: string,
        private init: (url: string) => void,
        url: string
    ) {
        super();
        this.url = url;
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        const element = super.innRender(this.selector);
        document
            .querySelector('#btn-next')
            ?.addEventListener('click', this.handleNextButton.bind(this));
        document
            .querySelector('#btn-prev')
            ?.addEventListener('click', this.handlePrevButton.bind(this));
        return element;
    }

    refreshNextPage() {
        urlOffsetPokemon = urlOffsetPokemon + this.resultsPerPage;
        this.url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${urlOffsetPokemon}`;
        this.init(this.url);
        return urlOffsetPokemon;
    }

    refreshPrevPage() {
        urlOffsetPokemon = urlOffsetPokemon - this.resultsPerPage;
        this.url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${urlOffsetPokemon}`;
        this.init(this.url);
        return urlOffsetPokemon;
    }

    handleNextButton() {
        console.log('estoy clicando');
        this.refreshNextPage();
    }

    handlePrevButton() {
        this.refreshPrevPage();
    }

    createTemplate() {
        return `
<p>${this.resultsPerPage + urlOffsetPokemon} / ${this.maxResults}</p>
${
    urlOffsetPokemon === 0
        ? ``
        : `<button id="btn-prev"><span class="material-symbols-outlined">
chevron_left
</span>Prev</button>`
}   
${
    this.resultsPerPage + urlOffsetPokemon === this.maxResults
        ? ``
        : `<button id="btn-next">Next<span class="material-symbols-outlined">
chevron_right
</span></button>`
}  
`;
    }
}
