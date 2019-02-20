import { Controller, Get, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HomesService } from './homes.service';
import { Home } from '../graphql.schema';

@Controller('homes')
@UseGuards(AuthGuard())
export class HomesController {
    constructor(private homesService: HomesService) {}

    // => GET /homes/
    @Get()
    async getAll() {
        return await this.homesService.getAll();
    }

    // => GET /homes/id/{id}
    @Get('id/:id')
    getOneById(@Param('id', ParseIntPipe) id: number): Home {
        return this.homesService.getOneById(id);
    }

    // => GET /homes/{name}
    @Get(':name')
    getOneByName(@Param('name') name: string): Home {
        return this.homesService.getOneByName(name);
    }

    // => GET /homes/{id}/data
    @Get(':name/data')
    getAllRoomsByName(@Param('name') name: string) {
        return this.homesService.getAllRoomsByName(name);
    }
}
