import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "../user.service"
import { userStub } from "./stubs/user.stub"
import { User } from "src/entities/user.entity"
import { CreateUserDto } from "../dto/create-user.dto"
import { UpdateUserDto } from "../dto/update-user.dto"
import { UserRepository } from "../user.repository"
import { BadRequestException, NotFoundException } from "@nestjs/common"

jest.mock("../user.repository")

describe("UserService", () => {
  let userService: UserService
  let userRepository: UserRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get<UserRepository>(UserRepository)
    jest.clearAllMocks()
  })

  it("user service should be defined", () => {
    expect(userService).toBeDefined()
  })

  it("user repository should be defined", () => {
    expect(userRepository).toBeDefined()
  })

  describe("findUsers", () => {
    describe("when findAll is called", () => {
      let users: User[]

      beforeEach(async () => {
        users = await userService.findAll()
      })

      it("then it should call userRepository", () => {
        expect(userRepository.findAll).toHaveBeenCalled()
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
        user = await userService.findOne(userStub().id)
      })

      it("then it should call userRepository", () => {
        expect(userRepository.findOneById).toHaveBeenCalledWith(userStub().id)
      })

      it("then it should return a user", () => {
        expect(user).toEqual(userStub())
      })
    })

    describe("when findOne is called and user no exist", () => {
      const notFoundUserId = -1

      it("then it should throw NotFoundException", async () => {
        jest.spyOn(userRepository, "findOneById").mockResolvedValueOnce(null)

        await expect(userService.findOne(notFoundUserId)).rejects.toThrow(
          NotFoundException,
        )
      })
    })

    describe("when findOneByEmail is called", () => {
      let user: User

      beforeEach(async () => {
        user = await userService.findOneByEmail(userStub().email)
      })

      it("then it should call userRepository", () => {
        expect(userRepository.findOneByCondition).toHaveBeenCalledWith({
          where: {
            email: userStub().email,
          },
        })
      })

      it("then it should return a user", () => {
        expect(user).toEqual(userStub())
      })
    })

    describe("when findOneByEmail is called and user no exist", () => {
      let user: User
      const notFoundUserEmail = "notfound@gmail.com"

      beforeEach(async () => {
        jest
          .spyOn(userRepository, "findOneByCondition")
          .mockResolvedValueOnce(null)

        user = await userService.findOneByEmail(notFoundUserEmail)
      })

      it("then it should return null", async () => {
        expect(user).toEqual(null)
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
        jest.spyOn(userService, "findOneByEmail").mockResolvedValueOnce(null)
        user = await userService.create(createUserDto)
      })

      it("then it should call userRepository", () => {
        expect(userRepository.create).toHaveBeenCalledWith(createUserDto)
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
          .spyOn(userService, "findOneByEmail")
          .mockResolvedValueOnce(userStub())

        await expect(userService.create(createUserDto)).rejects.toThrow(
          BadRequestException,
        )
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
        jest.spyOn(userService, "findOne").mockResolvedValueOnce(userStub())

        user = await userService.update(userStub().id, updateUserDto)
      })

      it("then it should call userRepository", () => {
        expect(userRepository.save).toHaveBeenCalledWith({
          ...userStub(),
          ...updateUserDto,
        })
      })

      it("then it should return a user", () => {
        expect(user).toEqual(userStub())
      })
    })

    describe("when update is called and user no exist", () => {
      const notFoundUserId = -1
      let updateUserDto: UpdateUserDto

      it("then it should throw NotFoundException", async () => {
        updateUserDto = {
          name: "Fido",
          password: "456",
        }
        jest
          .spyOn(userService, "findOne")
          .mockRejectedValueOnce(new NotFoundException())

        await expect(
          userService.update(notFoundUserId, updateUserDto),
        ).rejects.toThrow(NotFoundException)
      })
    })
  })

  describe("deleteUser", () => {
    describe("when delete is called", () => {
      let user: User

      beforeEach(async () => {
        jest.spyOn(userService, "findOne").mockResolvedValueOnce(userStub())

        user = await userService.delete(userStub().id)
      })

      it("then it should call userRepository", () => {
        expect(userRepository.softDelete).toHaveBeenCalledWith(userStub().id)
      })

      it("then it should return a user", () => {
        expect(user).toEqual(userStub())
      })
    })

    describe("when delete is called and user no exist", () => {
      const notFoundUserId = -1
      it("then it should throw NotFoundException", async () => {
        jest
          .spyOn(userService, "findOne")
          .mockRejectedValueOnce(new NotFoundException())

        await expect(userService.delete(notFoundUserId)).rejects.toThrow(
          NotFoundException,
        )
      })
    })
  })
})
