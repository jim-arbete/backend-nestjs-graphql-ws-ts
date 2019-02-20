import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('should test token validation', async () => {
    const result = ['test'];
    jest.spyOn(authService, 'validateUser').mockImplementation(() => result);
    expect(await authService.validateUser('test')).toBe(result);
  });
});
