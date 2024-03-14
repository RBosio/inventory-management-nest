import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { LoginUserDto } from "./dto/login-user.dto"
import { AuthService } from "./auth.service"
import { AuthGuard } from "./auth.guard"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  @ApiOperation({ summary: "signup" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "user created",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "email already exists",
  })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }

  @Post("login")
  @ApiOperation({ summary: "login" })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "get jwt token",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "email or password wrong",
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "show profile" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "get user logged",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "unauthorized",
  })
  @Get("profile")
  getProfile(@Request() req) {
    return req.user
  }
}
