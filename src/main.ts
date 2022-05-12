import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const corsOptionsCallback = (req, callback) => {
    const corsOptions = { origin: false, credentials: true };
    if (process.env.CORS_ORIGINS.split(',').includes(req.headers.origin)) {
      corsOptions.origin = true;
    }
    callback(null, corsOptions);
  };
  
  app.enableCors(corsOptionsCallback)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nibyou Microservice')
    .setDescription('Microservice Description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  let listenOption = [process.env.PORT || 3000];
  process.env.ENV === "prod" && listenOptions.push("node"); // add "node" server name for docker-compose routing

  return app.listen(...listenOptions);
})();
