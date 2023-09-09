import { NestFactory } from '@nestjs/core'; // NestFactory
import { AppModule } from './app.module'; // AppModule
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Swagger

async function bootstrap() {
  // bootstrap
  const app = await NestFactory.create(AppModule); // create app

  const config = new DocumentBuilder()
    .setTitle('Swagger Pratice')
    .setDescription('Practice API description')
    .setVersion('1.0')
    .addTag('CCC')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000); // listen on port 3000
}
bootstrap();
