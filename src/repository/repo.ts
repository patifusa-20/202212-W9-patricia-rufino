export interface Repository<T> {
    load: (url: string) => Promise<T[]>;
}
