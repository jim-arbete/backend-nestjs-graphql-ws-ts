import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http-bearer.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'bearer' }),
        ],
    providers: [UsersService, AuthService, HttpStrategy],
})
export class AuthModule {}
