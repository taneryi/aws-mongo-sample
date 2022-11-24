import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { eventConsumer } from './app/events/eventConsumer';
import { env } from './config/env';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sample Nest')
    .setDescription('The sample nest API description')
    .setVersion('1.0')
    .addTag('tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: env.corsOrigins });

  const consumer = app.get(eventConsumer);
  consumer.consume();
  await app.listen(env.appPort);
}
bootstrap();
