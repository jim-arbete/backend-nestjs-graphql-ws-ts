export class Home {
    id: number;
    name: string;
    votes: number;
    rooms: Room[];
}

export interface Room {
    name: string;
    temperature: number;
    humidity: number;
}
