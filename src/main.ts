import { NestFactory } from '@nestjs/core'; // NestFactory
import { AppModule } from './app.module'; // AppModule

async function bootstrap() { // bootstrap
  const app = await NestFactory.create(AppModule); // create app
  await app.listen(3000); // listen on port 3000
}
bootstrap();
