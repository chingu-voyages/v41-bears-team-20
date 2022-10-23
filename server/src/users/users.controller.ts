import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Res,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  UserOkResponseEntity,
  UserOkResponseEntityArray,
} from './entities/userOkResponse.entity';
import { UserCreatedResponseEntity } from './entities/UserCreatedResponse.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserCreatedResponseEntity })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const createdUser = await this.usersService.create(createUserDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: createdUser,
    });
  }

  @Get()
  @ApiOkResponse({ type: UserOkResponseEntityArray })
  async findAll(
    @Res()
    res: Response,
  ) {
    const users = await this.usersService.findAll();

    if (!users.length) {
      throw new NotFoundException('No users found');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: users,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: UserOkResponseEntity })
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: user,
    });
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserOkResponseEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: updatedUser,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserOkResponseEntity })
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const removedUser = await this.usersService.remove(id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: removedUser,
    });
  }
}