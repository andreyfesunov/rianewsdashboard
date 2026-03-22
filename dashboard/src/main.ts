import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { join } from 'node:path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, 'news', 'presentation', 'views'));
  app.setViewEngine('hbs');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('RIA Dashboard')
    .setDescription('RIA news public HTTP API')
    .setVersion('0.1')
    .addTag('news', 'Search news')
    .addTag('tags', 'Tags suggestions')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, cleanupOpenApiDoc(document));
  await app.listen(3000);
}

void bootstrap();
