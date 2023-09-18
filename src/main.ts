import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(process.env.NODE_PORT);

  console.log(`environment                : ${process.env.NODE_ENV}`);
  console.log(`server started on port     : ${process.env.NODE_PORT}`);
}
bootstrap();
