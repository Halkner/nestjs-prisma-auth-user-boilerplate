import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationExceptionFilter } from '@common/filters/validation-exception.filter';
import { GlobalHttpExceptionFilter } from '@common/filters/global-http-exception.filter';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  dotenv.config();

  app.useGlobalFilters(
    new ValidationExceptionFilter(),
    new GlobalHttpExceptionFilter(),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Backoffice Defense')
    .setDescription('Intelbras Defense IA')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      defaultModelsExpandDepth: -1,
    },
  });

  const APP_PORT = process.env.APP_PORT ?? 3000;
  await app.listen(APP_PORT, () => {
    Logger.log(
      `[NestApplication] 🤖 Beep boop, server online at port: ${APP_PORT}`,
    );
  });
}

bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});
