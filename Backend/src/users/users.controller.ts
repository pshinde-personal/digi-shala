import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserDto, GetUserParam } from './users.constants';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email?')
  async get(@Param() getUserParam: GetUserParam) {
    if (getUserParam?.email) {
      return this.usersService.findOne(getUserParam.email)
    }
    return this.usersService.findAll()
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
