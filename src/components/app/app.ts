import { Header } from '../header/header.js';
import { Main } from '../serie.main/main.js';
import { List } from '../serie.list/list.js';
import { initSeries } from '../../mocks/series.js';
import { Serie } from '../../models/serie.js';

export class App {
    series: Array<Serie>;
    constructor() {
        this.series = initSeries();
        try {
            new Header('.root');
            new Main('.root');
            new List('[name="list"]');
            new List('[name="list-watched"]');
        } catch (error) {
            console.log((error as Error).message);
        }
    }
}
