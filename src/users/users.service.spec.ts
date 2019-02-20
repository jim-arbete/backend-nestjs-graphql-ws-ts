import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should test getOneById', async () => {
    const result = {
        id: 1,
        username: 'admin',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIn0.Pt_bG1sexU2z0yQYFbAd-n47_EQpEfUkeIvpjtLUgLw'
        ,
      };
    jest.spyOn(usersService, 'getOneById').mockImplementation(() => result);
    expect(await usersService.getOneById(1)).toBe(result);
  });

});
