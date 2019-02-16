import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { HomesService } from './homes.service';
import { Home } from '../graphql.schema';
import { GqlAuthGuard } from '../auth/auth.guard';

const pubSub = new PubSub();

// #1 Simulate measurements that changes faster than normal..
const randomiseLastDigitTemperatureAndParseToFloat = (orgValue: number): number => {
  return orgValue + Math.floor(Math.random() * 3) - 1;
};

const randomiseLastDigitHumidityAndParseToFloat = (orgValue: any): any => {
  if (Math.random() < 0.5) {
    return parseFloat((orgValue + 0.01).toFixed(2));
  } else {
    return parseFloat((orgValue - 0.01).toFixed(2));
  }
};

@Resolver('Home')
@UseGuards(GqlAuthGuard)
export class HomesResolver {
  constructor(private homesService: HomesService) {

    // #2 Trigger simulation of meameasurements
    // // Mock Actions to test dynamic data with websockets
    const intervalSeconds: number = 4 * 1000; // change every 4 seconds
    setInterval(() => {
      homesService.getAll().map(house => {
        house.rooms.map(room => {
            room.temperature = randomiseLastDigitTemperatureAndParseToFloat(room.temperature);
            room.humidity = randomiseLastDigitHumidityAndParseToFloat(room.humidity);
        });
      });
      // Trigger "housesChanged" subscription event..
      pubSub.publish('HomesChanged', { HomesChanged: homesService.getAll()});
    }, intervalSeconds);

  }

  @Query()
    async Home(@Args('id') id: number) {
    return await this.homesService.getOneById(id);
  }

  // @UseGuards(AuthGuard())
  @Query()
    async Homes(): Promise<Home[]> {
    return await this.homesService.getAll();
  }

  @Subscription()
  HomesChanged() {
    return {
      // listener for event => if triggered => send our dynamic data to the client with AsyncIterator
      subscribe: () => pubSub.asyncIterator('HomesChanged'),
    };
  }
}
