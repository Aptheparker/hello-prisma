import { Module } from '@nestjs/common'; // Module
import { AppController } from './app.controller'; // AppController
import { AppService } from './app.service'; // AppService

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
