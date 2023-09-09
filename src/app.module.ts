import { Module } from '@nestjs/common'; // Module
import { AppController } from './app.controller'; // AppController
import { AppService } from './app.service'; // AppService
import { PostService } from './post.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, PostService, PrismaService],
})
export class AppModule {}
