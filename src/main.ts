import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './environments';
import 'reflect-metadata';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import newrelic from 'newrelic';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: PORT,
      },
    },
  );

  logger.log('Microservice is listening to ' + PORT);
  await app.listen();
}

bootstrap();
