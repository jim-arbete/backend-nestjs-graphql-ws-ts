/* tslint:disable */
export class Home {
    id: number;
    name?: string;
    rooms?: Room[];
}

export abstract class IQuery {
    abstract Home(id: number): Home | Promise<Home>;

    abstract Homes(): Home[] | Promise<Home[]>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Room {
    name: string;
    temperature?: number;
    humidity?: number;
}

export abstract class ISubscription {
    abstract HomesChanged(): Home[] | Promise<Home[]>;
}
