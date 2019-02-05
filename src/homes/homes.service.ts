import { Injectable, HttpException } from '@nestjs/common';
import { Home, Room } from './home.interface';
import { HomesMock } from './homes.mock';

@Injectable()
export class HomesService {
    private readonly homes: Home[] = HomesMock;

    getAll(): Home[] {
        return this.homes;
    }

    getOneById(id: number): Home {
        const response = this.homes.find(home => home.id === Number(id));
        if (!response) {
            throw new HttpException('Home does not exist!', 404);
        }
        return response;
    }

    getOneByName(name: string): Home {
        const response = this.homes.find(home => home.name.toLowerCase() === name.toLowerCase());
        if (!response) {
            throw new HttpException('Home by that name does not exist!', 404);
        }
        return response;
    }

    getAllRoomsByName(name: string) {
        // Datat från API:t ska ha minst följande data enligt formen {"rooms": [ room... ] }
        const response = this.homes.find(home => home.name.toLowerCase() === name.toLowerCase());
        if (!response) {
            throw new HttpException('Home by that name does not exist!', 404);
        }
        return  { rooms: response.rooms };
    }
}
