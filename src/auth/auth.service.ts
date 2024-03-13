import { BadRequestException, Injectable } from "@nestjs/common"
import { User } from "src/entities/user.entity"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { UserService } from "src/user/user.service"
import { JwtService } from "@nestjs/jwt"
import { LoginUserDto } from "./dto/login-user.dto"
import { compare } from "bcryptjs"

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  async login(loginUserDto: LoginUserDto) {
    const userFounded = await this.userService.findOneByEmail(
      loginUserDto.email,
    )

    if (!(await compare(loginUserDto.password, userFounded.password)))
      throw new BadRequestException("email or password wrong")

    const payload = { sub: userFounded.id }

    return {
      token: await this.jwtService.signAsync(payload),
    }
  }
}
