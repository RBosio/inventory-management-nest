import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "../auth.service"
import { User } from "src/entities/user.entity"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { userStub } from "src/user/test/stubs/user.stub"
import { BadRequestException } from "@nestjs/common"
import { UserService } from "src/user/user.service"
import { JwtService } from "@nestjs/jwt"

jest.mock("../../user/user.service")

describe("AuthService", () => {
  let authService: AuthService
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue({ sub: userStub().id }),
          },
        },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    userService = module.get<UserService>(UserService)
  })

  it("should be defined", () => {
    expect(authService).toBeDefined()
  })

  describe("createUser", () => {
    describe("when create is called", () => {
      let user: User
      let createUserDto: CreateUserDto

      beforeEach(async () => {
        createUserDto = {
          name: userStub().name,
          surname: userStub().surname,
          email: userStub().email,
          password: userStub().password,
        }
        user = await authService.signup(createUserDto)
      })

      it("then it should call userService", () => {
        expect(userService.create).toHaveBeenCalledWith(createUserDto)
      })

      it("then it should return a user", () => {
        expect(user).toEqual(userStub())
      })
    })

    describe("when create is called and email already exists", () => {
      let createUserDto: CreateUserDto

      it("then it should throw BadRequestException", async () => {
        createUserDto = {
          name: userStub().name,
          surname: userStub().surname,
          email: userStub().email,
          password: userStub().password,
        }
        jest
          .spyOn(userService, "create")
          .mockRejectedValueOnce(new BadRequestException())

        await expect(authService.signup(createUserDto)).rejects.toThrow(
          BadRequestException,
        )
      })
    })
  })
})
