import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { LoginUserDto } from "./dto/login-user.dto"
import { AuthService } from "./auth.service"
import { AuthGuard } from "./auth.guard"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user
  }
}
