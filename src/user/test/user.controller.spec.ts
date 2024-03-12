import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "../user.controller"
import { UserService } from "../user.service"
import { userStub } from "./stubs/user.stub"
import { User } from "src/entities/user.entity"
import { CreateUserDto } from "../dto/create-user.dto"
import { UpdateUserDto } from "../dto/update-user.dto"

jest.mock("../user.service")

describe("UserController", () => {
  let userController: UserController
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile()

    userController = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)
    jest.clearAllMocks()
  })

  it("user controller should be defined", () => {
    expect(userController).toBeDefined()
  })

  it("user service should be defined", () => {
    expect(userService).toBeDefined()
  })

  describe("findUsers", () => {
    describe("when findAll is called", () => {
      let users: User[]

      beforeEach(async () => {
        users = await userController.findAll()
      })

      it("then it should call userService", () => {
        expect(userService.findAll).toHaveBeenCalled()
      })

      it("then it should return users", () => {
        expect(users).toEqual([userStub()])
      })
    })
  })

  describe("findUser", () => {
    describe("when findOne is called", () => {
      let user: User

      beforeEach(async () => {
        user = await userController.findOne(userStub().id)
      })

      it("then it should call userService", () => {
        expect(userService.findOne).toHaveBeenCalledWith(userStub().id)
      })

      it("then it should return a user", () => {
        expect(user).toEqual(userStub())
      })
    })
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
        user = await userController.create(createUserDto)
      })

      it("then it should call userService", () => {
        expect(userService.create).toHaveBeenCalledWith(createUserDto)
      })

      it("then it should return a user", () => {
        expect(user).toEqual(userStub())
      })
    })
  })

  describe("updateUser", () => {
    describe("when update is called", () => {
      let user: User
      let updateUserDto: UpdateUserDto

      beforeEach(async () => {
        updateUserDto = {
          name: "Fido",
          password: "456",
        }
        user = await userController.update(userStub().id, updateUserDto)
      })

      it("then it should call userService", () => {
        expect(userService.update).toHaveBeenCalledWith(
          userStub().id,
          updateUserDto,
        )
      })

      it("then it should return a user", () => {
        expect(user).toEqual(userStub())
      })
    })
  })

  describe("deleteUser", () => {
    describe("when delete is called", () => {
      let user: User

      beforeEach(async () => {
        user = await userController.delete(userStub().id)
      })

      it("then it should call userService", () => {
        expect(userService.delete).toHaveBeenCalledWith(userStub().id)
      })

      it("then it should return a user", () => {
        expect(user).toEqual(userStub())
      })
    })
  })
})
