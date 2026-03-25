import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
create(@Body() body: { email: string; password: string; role?: Role }) {
  return this.usersService.create(
    body.email,
    body.password,
    body.role ?? Role.USER,
  );
}

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: { password?: string; role?: string; isVerified?: boolean },
  ) {
    return this.usersService.update(id, body);
  }
}