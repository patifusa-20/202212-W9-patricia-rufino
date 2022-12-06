import { Component } from '../component/component.js';

export class Footer extends Component {
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
    }
    render() {
        return super.innRender(this.selector);
    }
    private createTemplate() {
        return `
<footer>
    <address>
        Patricia Rufino | ISDI Coders | 2022
    </address>
</footer>
`;
    }
}
