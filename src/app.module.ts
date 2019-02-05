import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HomesController } from './homes/homes.controller';
import { HomesService } from './homes/homes.service';
import { HomesResolver } from './homes/homes.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      debug: false,
      playground: false,
      definitions: {
        // skapa graphql.schema autmatiskt av *.graphql filer.
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
    }),
  ],
  controllers: [HomesController],
  providers: [HomesService, HomesResolver],
})
export class AppModule {}
