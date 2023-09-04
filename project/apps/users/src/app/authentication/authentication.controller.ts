import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import CreateUserDto from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import UserRdo from './rdo/user.rdo';
import LoginUserDto from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationControllerMessages } from './authentication-controller-messages';
import { MongoIdValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AuthenticationControllerMessages.USER_CREATED
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationControllerMessages.USER_LOGGED_IN
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationControllerMessages.WRONG_PASSWORD_OR_LOGIN
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.createUserToken(verifiedUser)
    return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
  }


  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getUserById(@Param('id', MongoIdValidationPipe) id: string) {
    const user = await this.authService.getUser(id);
    return fillObject(UserRdo, user);
  }
}
