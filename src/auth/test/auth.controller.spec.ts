import { Test, TestingModule } from "@nestjs/testing"
import { AuthController } from "../auth.controller"
import { AuthService } from "../auth.service"
import { User } from "src/entities/user.entity"
import { userStub } from "src/user/test/stubs/user.stub"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { LoginUserDto } from "../dto/login-user.dto"
import { loginStub } from "./stubs/login.stub"

jest.mock("../auth.service")

describe("AuthController", () => {
  let authController: AuthController
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile()

    authController = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
  })

  it("authController should be defined", () => {
    expect(authController).toBeDefined()
  })

  it("authService should be defined", () => {
    expect(authService).toBeDefined()
  })

  describe("createUser", () => {
    describe("when signup is called", () => {
      let user: User
      let createUserDto: CreateUserDto

      beforeEach(async () => {
        createUserDto = {
          name: userStub().name,
          surname: userStub().surname,
          email: userStub().email,
          password: userStub().password,
        }
        user = await authController.signup(createUserDto)
      })

      it("then it should call authService", () => {
        expect(authService.signup).toHaveBeenCalledWith(createUserDto)
      })

      it("then it should return a user", () => {
        expect(user).toEqual(userStub())
      })
    })
  })

  describe("login", () => {
    describe("when login is called", () => {
      let token: any
      let loginUserDto: LoginUserDto

      beforeEach(async () => {
        loginUserDto = {
          email: userStub().email,
          password: userStub().password,
        }
        token = await authController.login(loginUserDto)
      })

      it("then it should call authService", () => {
        expect(authService.login).toHaveBeenCalledWith(loginUserDto)
      })

      it("then it should return a jwt token", () => {
        expect(token).toEqual(loginStub())
      })
    })
  })
})
