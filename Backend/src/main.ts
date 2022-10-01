import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv'

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    transform: true,
    forbidUnknownValues: true,
    whitelist: true,
  }));

  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Backend - brunsker')
  .setDescription('Backend desenvolvido usando o NestJS 8 para o teste tecnico da empresa BrunSker')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Swagger - BrunSker',
    useGlobalPrefix: true
  };

  SwaggerModule.setup('swagger', app, document, customOptions);

  await app.listen(process.env.API_PORT);
}
bootstrap();
