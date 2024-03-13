import { Test, TestingModule } from "@nestjs/testing"
import { BillingService } from "../billing.service"
import { billingStub } from "./stubs/billing.stub"
import { CreateBillingDto } from "../dto/create-billing.dto"
import { BillingRepository } from "../billing.repository"
import { NotFoundException } from "@nestjs/common"
import { Billing } from "src/entities/billing.entity"
import { userStub } from "../../user/test/stubs/user.stub"
import { UserService } from "src/user/user.service"
import { customerStub } from "src/user/test/stubs/customer.stub"

jest.mock("../billing.repository")
jest.mock("../../user/user.service")

describe("BillingService", () => {
  let billingService: BillingService
  let billingRepository: BillingRepository
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingService, BillingRepository, UserService],
    }).compile()

    billingService = module.get<BillingService>(BillingService)
    billingRepository = module.get<BillingRepository>(BillingRepository)
    userService = module.get<UserService>(UserService)
    jest.clearAllMocks()
  })

  it("billing service should be defined", () => {
    expect(billingService).toBeDefined()
  })

  it("billing repository should be defined", () => {
    expect(billingRepository).toBeDefined()
  })

  it("user service should be defined", () => {
    expect(userService).toBeDefined()
  })

  describe("findBillings", () => {
    describe("when findAll is called", () => {
      let billings: Billing[]

      beforeEach(async () => {
        billings = await billingService.findAll()
      })

      it("then it should call billingRepository", () => {
        expect(billingRepository.findAll).toHaveBeenCalled()
      })

      it("then it should return billings", () => {
        expect(billings).toEqual([billingStub()])
      })
    })
  })

  describe("findBilling", () => {
    describe("when findOne is called", () => {
      let billing: Billing

      beforeEach(async () => {
        billing = await billingService.findOne(billingStub().id)
      })

      it("then it should call billingRepository", () => {
        expect(billingRepository.findOneById).toHaveBeenCalledWith(
          billingStub().id,
        )
      })

      it("then it should return a billing", () => {
        expect(billing).toEqual(billingStub())
      })
    })

    describe("when findOne is called and billing no exist", () => {
      const notFoundBillingId = -1

      it("then it should throw NotFoundException", async () => {
        jest.spyOn(billingRepository, "findOneById").mockResolvedValueOnce(null)

        await expect(billingService.findOne(notFoundBillingId)).rejects.toThrow(
          NotFoundException,
        )
      })
    })
  })

  describe("createBilling", () => {
    describe("when create is called", () => {
      let billing: Billing
      let createBillingDto: CreateBillingDto

      beforeEach(async () => {
        createBillingDto = {
          userId: userStub().id,
          customerId: customerStub().id,
        }
        billing = await billingService.create(createBillingDto)
      })

      it("then it should call billingRepository", () => {
        expect(billingRepository.create).toHaveBeenCalledWith(createBillingDto)
      })

      it("then it should return a billing", () => {
        expect(billing).toEqual(billingStub())
      })
    })

    describe("when create is called and user not found", () => {
      let createBillingDto: CreateBillingDto

      createBillingDto = {
        userId: userStub().id,
        customerId: customerStub().id,
      }

      it("then it should throw NotFoundException", async () => {
        jest
          .spyOn(userService, "findOne")
          .mockRejectedValueOnce(new NotFoundException())

        await expect(billingService.create(createBillingDto)).rejects.toThrow(
          NotFoundException,
        )
      })
    })
  })

  describe("deleteBilling", () => {
    describe("when delete is called", () => {
      let billing: Billing

      beforeEach(async () => {
        jest
          .spyOn(billingService, "findOne")
          .mockResolvedValueOnce(billingStub())

        billing = await billingService.delete(billingStub().id)
      })

      it("then it should call billingRepository", () => {
        expect(billingRepository.softDelete).toHaveBeenCalledWith(
          billingStub().id,
        )
      })

      it("then it should return a billing", () => {
        expect(billing).toEqual(billingStub())
      })
    })

    describe("when delete is called and billing no exist", () => {
      const notFoundBillingId = -1
      it("then it should throw NotFoundException", async () => {
        jest
          .spyOn(billingService, "findOne")
          .mockRejectedValueOnce(new NotFoundException())

        await expect(billingService.delete(notFoundBillingId)).rejects.toThrow(
          NotFoundException,
        )
      })
    })
  })
})
