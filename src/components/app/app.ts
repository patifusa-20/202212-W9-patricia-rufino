import { FavouritesPage } from '../../pages/favourites/favourites.js';
import { HomePage } from '../../pages/home/home.js';
import { DetailsPage } from '../../pages/details/details.js';
import { MenuOptionsType } from '../../types/menu.options.js';
import { Footer } from '../footer/footer.js';
import { Header } from '../header/header.js';
import { Menu } from '../menu/menu.js';

export class App {
    menuOptions: MenuOptionsType;
    constructor() {
        this.menuOptions = [
            { path: './index.html', label: 'Home' },
            { path: './details.html', label: 'Details' },
            { path: './favourites.html', label: 'Favourites' },
        ];
        try {
            new Header('.root');
            new Menu('header', this.menuOptions);
            this.router();
            new Footer('.root');
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    router() {
        const path = './' + location.pathname.split('/').at(-1);
        switch (path) {
            case this.menuOptions[0].path:
                return new HomePage('.root');
            case this.menuOptions[1].path:
                return new DetailsPage('.root');
            case this.menuOptions[2].path:
                return new FavouritesPage('.root');
            default:
                throw new Error('Path no disponible');
        }
    }
}
