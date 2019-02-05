import { Controller, Get, Param } from '@nestjs/common';
import { HomesService } from './homes.service';
import { Home, Room } from './home.interface';

@Controller('homes')
export class HomesController {
    constructor(private homesService: HomesService) {}

    @Get() // => GET /homes/
    getAll(): Home[] {
        return this.homesService.getAll();
    }

    @Get('id/:id') // => GET /homes/id/{id}
    getOneById(@Param('id') id: number): Home {
        return this.homesService.getOneById(id);
    }

    @Get(':name') // => GET /homes/{name}
    getOneByName(@Param('name') name: string): Home {
        return this.homesService.getOneByName(name);
    }

    @Get(':name/data') // => GET /homes/{id}/data
    getAllRoomsByName(@Param('name') name: string) {
        return this.homesService.getAllRoomsByName(name);
    }
}
