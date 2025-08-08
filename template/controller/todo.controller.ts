import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { /** write res exception */ } from '../exception/todo.exception';
import { /** write service */ } from '../service';
import { /** write req/res dto */ } from '../dto/todo.dto';

@Controller('todo')
export class TodoController {
  constructor(
    /**
    * private userService: UserService,
     */
  ) {}

  /** EXAMPLE

  @Get(':nickname/login/:pw')
  async login(@Param('nickname') nickname: string, @Param('pw') pw: string): Promise<UserResponse> {
    const user = await this.userService.login(nickname, pw);
    return user;
  }
  
  @Patch(':uid')
  async updateUser(@Param('uid') uid: string, @Query('nickname') nickname: string): Promise<UserResponse> {
    try {
      const updatedUser = await this.userService.updateUser(uid, { nickname });
      return updatedUser;
    } catch (err) {
      throw new UserNotFoundError(err);
    }
  }

  @Post('score')
  async createScore(@Body() body: ScoreRequest): Promise<void> {
    try {
      await this.scoreService.createScore(body);
    } catch (err) {
      throw new UserNotFoundError(err);
    }
  }
  */
}


