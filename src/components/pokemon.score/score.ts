import { Component } from '../component/component.js';

export class Score extends Component {
    constructor(selector: string, itemScore: number) {
        super();
        this.template = this.createTemplate(itemScore);
        this.addRender(selector);
    }
    createTemplate(itemScore: number) {
        let itemsTemplate;
        const itemsArrayTemplate: Array<string> = [];
        for (let i = 0; i < 5; i++) {
            itemsArrayTemplate.push(
                `<i class="icon--score far fa-star" title="1/5"></i>`
            );
        }

        const itemsArrayTemplateRated: Array<string> = [];
        for (let i = 0; i < itemScore; i++) {
            itemsArrayTemplateRated.push(
                `<i class="icon--score fas fa-star" title="1/5"></i>`
            );
        }

        if (itemScore !== 0) {
            let index = 0;
            for (const arr of itemsArrayTemplateRated) {
                itemsArrayTemplate.splice(index, 1, arr);
                index = index + 1;
            }
            itemsTemplate = itemsArrayTemplate.join('');
        } else {
            itemsTemplate = itemsArrayTemplate.join('');
        }

        return itemsTemplate;
    }
}
