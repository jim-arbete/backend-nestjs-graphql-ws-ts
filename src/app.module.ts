import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { HomesController } from './homes/homes.controller';
import { HomesService } from './homes/homes.service';
import { HomesResolver } from './homes/homes.resolver';
import { UsersService } from './users/users.service';
import { AuthenticationError } from 'apollo-server-core';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
      definitions: {
        // skapa graphql.schema autmatiskt av *.graphql filer.
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      subscriptions: {
        onConnect: (connectionParams: any) => {
          const usersService = new UsersService();
          // get `authroization` header
          const token = connectionParams.authorization;
          if (token) {
            return usersService.getOneByToken(token.split(' ')[1]);
          }
          throw new AuthenticationError('authorization token must be provided');
        },
      },
    }),
    AuthModule,
  ],
  controllers: [HomesController],
  providers: [HomesService, HomesResolver, UsersService],
})
export class AppModule {}
