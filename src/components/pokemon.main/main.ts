import { Component } from '../component/component.js';

export class Main extends Component {
    constructor(selector: string) {
        super();
        this.template = this.createTemplate();
        this.addRender(selector);
    }
    createTemplate() {
        return `
            <main class="main">
                <section class="series">
                    <h2 class="section-title">Series list</h2>
                    <div name="list"></div>
                    <div name="list-watched"></div>
                </section>
            </main>
        `;
    }
}
