import { Component } from '../component/component.js';

export class Pagination extends Component {
    urlOffsetPokemon = 0;
    resultsPerPage = 20;
    maxResults = 300;
    url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    constructor(private selector: string, private init: (url: string) => void) {
        super();
        this.url;
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

    refreshNextPage(urlOffsetPokemon: number) {
        urlOffsetPokemon = urlOffsetPokemon + this.resultsPerPage;
        this.url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${urlOffsetPokemon}`;
        this.init(this.url);
        return this.urlOffsetPokemon;
    }

    refreshPrevPage(urlOffsetPokemon: number) {
        urlOffsetPokemon = urlOffsetPokemon - this.resultsPerPage;
        this.url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${urlOffsetPokemon}`;
        this.init(this.url);
        return this.urlOffsetPokemon;
    }

    handleNextButton() {
        console.log('estoy clicando');
        this.refreshNextPage(this.urlOffsetPokemon);
    }

    handlePrevButton() {
        this.refreshPrevPage(this.urlOffsetPokemon);
    }

    createTemplate() {
        return `
            <p>${this.resultsPerPage + this.urlOffsetPokemon} / ${
            this.maxResults
        }</p>
         ${
             this.urlOffsetPokemon === 0
                 ? ``
                 : `<button id="btn-prev">Prev</button>`
         }   
            ${
                this.resultsPerPage + this.urlOffsetPokemon === this.maxResults
                    ? ``
                    : `<button id="btn-next">Next</button>`
            }  
        `;
    }
}
