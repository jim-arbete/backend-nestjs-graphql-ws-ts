import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersMock } from './users.mock';

@Injectable()
export class UsersService {
    private readonly users: any[] = UsersMock;

    async getAll() {
        return await this.users;
    }

    async getOneById(id: number) {
        const response = await this.users.find(_ => _.id === Number(id));
        if (!response) {
            throw new NotFoundException('User does not exist!');
        }
        return response;
    }

    async getOneByToken(token: string) {
        const response = await this.users.find(_ => _.token === token);
        if (!response) {
            throw new NotFoundException('User does not exist!');
        }
        return response;
    }
}
