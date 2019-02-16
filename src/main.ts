import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.use(helmet()); // Helmet can help protect your app from some well-known web vulnerabilities
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
