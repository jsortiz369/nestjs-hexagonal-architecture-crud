import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart';
process.env.TZ = 'UTC';

import { AppModule } from './app.module';
import { EnvPersistence } from './shared/infrastructure/persistences';
import { HttpExceptionFilter } from './shared/infrastructure/http/filters';
import { MultipartBodyInterceptor } from './shared/infrastructure/http/interceptors';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // global filters
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  // global interceptors
  app.useGlobalInterceptors(new MultipartBodyInterceptor(logger));

  // global prefix
  app.setGlobalPrefix('api');

  // register multipar
  await app.register(fastifyMultipart, {
    attachFieldsToBody: false,
    limits: {
      fileSize: 1024 * 1024 * 1024, // 1 GB
    },
  });

  // get port from env
  const _env = new EnvPersistence();
  const port: number | string = _env.get('PORT');
  const origin: string[] = _env.get('CORS_ORIGIN');

  // global pipes for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // enable cors
  app.enableCors({
    origin: origin,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Timezone', 'Authorization'],
    credentials: true,
  });

  // start application
  await app.listen(port, '0.0.0.0', (): void => {
    app
      .getUrl()
      .then((url) => logger.log(`Application is running on: ${url}`, 'BootstrapApplication'))
      .catch((err) => logger.log(err, 'BootstrapApplication'));
  });
}

bootstrap().catch((err) => console.error(err));
