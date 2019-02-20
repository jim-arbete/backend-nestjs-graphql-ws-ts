import { Test, TestingModule } from '@nestjs/testing';
import { HomesController } from './homes.controller';
import { HomesService } from './homes.service';

describe('Homes Controller', () => {
  let homesController: HomesController;
  let homesService: HomesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomesController],
      providers: [HomesService],
    }).compile();

    homesService = module.get<HomesService>(HomesService);
    homesController = module.get<HomesController>(HomesController);
  });

  describe('getAll', () => {

    it('should return an array of homes', async () => {
      const result = ['test'];
      jest.spyOn(homesService, 'getAll').mockImplementation(() => result);

      expect(await homesController.getAll()).toBe(result);
    });
  });

});
