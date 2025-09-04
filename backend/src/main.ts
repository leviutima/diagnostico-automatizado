import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    '/diagnostico',
    basicAuth({
      challenge: true,
      users: {
        leviutima: 'senha123',
      },
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://diagnostico-automatizado-1.onrender.com/'],
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('diagnóstico automatizado')
    .setDescription('Endpoints da api de diagnóstico')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('diagnostico', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
