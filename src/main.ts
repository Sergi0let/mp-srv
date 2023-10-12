import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'storage'));

  // CORS for Dev and Test environment
  app.enableCors(
    ['dev', 'test'].includes(process.env.NODE_ENV!)
      ? { origin: '*', allowedHeaders: '*', methods: '*' } // For dev/test
      : {}, // For production
  );
  await app.listen(process.env.SERVER_PORT);

  console.log(process.env.NODE_ENV!);
}
bootstrap();
