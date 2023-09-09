// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service'; // CRUD services
import { PostService } from './post.service'; // CRUD services
import { User as UserModel, Post as PostModel } from '@prisma/client'; // Models
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  // CRUD controller
  constructor(
    // inject servicess
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get('post/:id') // get post by id
  @ApiOperation({ description: 'Find post by id' })
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    // param id as string, return post
    return this.postService.post({ id: Number(id) });
  }

  @Get('feed') // get all posts
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      // get all posts that are published
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString') // get filtered posts
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post') // create post
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Post('user') // create user
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id') // publish post
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id') // delete post
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
