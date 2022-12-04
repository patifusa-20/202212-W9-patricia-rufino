export interface SyncRepository<T> {
    load: () => T[];
    query: ({ id }: { id: string }) => T | null;
    create: (item: T) => void;
    update: (payload: Partial<T>) => T | null;
    delete: (id: string) => void;
}
