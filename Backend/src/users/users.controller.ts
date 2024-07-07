import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserDto, GetUserParam } from './users.constants';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username?')
  async get(@Param() getUserParam: GetUserParam) {
    if (getUserParam?.username) {
      return this.usersService.findOne(getUserParam.username)
    }
    return this.usersService.findAll()
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
