import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controller/todo.controller';
import { /** wrtie service */ } from './service';
import { /** write entity */ } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([/** write entity */])],
  providers: [/** write service */],
  exports: [TypeOrmModule, /** write service */],
  controllers: [TodoController],
})
export class TodoModule {}
