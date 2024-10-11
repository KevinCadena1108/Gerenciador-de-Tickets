import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser(configService.getOrThrow<string>('COOKIE_SECRET')));
  await app.listen(3001);
}
bootstrap();
