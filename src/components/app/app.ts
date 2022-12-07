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
        // Consulta la url que en ese momento se está cargando en el navegador
        const path = './' + location.pathname.split('/').at(-1);
        // Si el path existe es true y entonces empieza a comprobar cada caso ->
        switch (path) {
            // Si el path corresponde con path index.html , me instancia el objeto que corresponda
            case this.menuOptions[0].path:
                return new HomePage('.root');
            // Si el path corresponde con path details.html , me instancia el objeto que corresponda
            case './details.html':
                return new DetailsPage('.root');
            case this.menuOptions[2].path:
                return new FavouritesPage('.root');
            // Si no existe el path, me devuelves un error.
            default:
                throw new Error('Path no disponible');
        }
    }
}
