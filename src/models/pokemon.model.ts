type PokemonType = {
    name: string;
    image: string;
    isFavourite: boolean;
};

export type PokemonObjType = {
    count: number;
    next: string;
    previous: null;
    results: Array<PokemonListType>;
};

export type PokemonListType = {
    name: string;
    url: string;
};

type PokemonDreamWorldImagesType = {
    front_default: string;
};

type PokemonMoreImagesType = {
    dream_world: PokemonDreamWorldImagesType;
};

type PokemonImagesType = {
    front_default: string;
    other: PokemonMoreImagesType;
};

export type PokemonDetailsType = {
    name: string;
    sprites: PokemonImagesType;
    id: number;
};

export class Pokemon implements PokemonType {
    isFavourite: boolean;
    constructor(public name: string, public image: string) {
        this.isFavourite = false;
    }
}

export class PokemonObj implements PokemonObjType {
    constructor(
        public count: number,
        public next: string,
        public previous: null,
        public results: Array<PokemonListType>
    ) {}
}
