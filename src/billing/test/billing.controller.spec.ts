import { Test, TestingModule } from "@nestjs/testing"
import { BillingController } from "../billing.controller"
import { BillingService } from "../billing.service"
import { billingStub } from "./stubs/billing.stub"
import { CreateBillingDto } from "../dto/create-billing.dto"
import { Billing } from "src/entities/billing.entity"
import { customerStub } from "src/user/test/stubs/customer.stub"
import { JwtService } from "@nestjs/jwt"
import { UserService } from "src/user/user.service"

jest.mock("../billing.service")

describe("BillingController", () => {
  let billingController: BillingController
  let billingService: BillingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingController],
      providers: [
        BillingService,
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile()

    billingController = module.get<BillingController>(BillingController)
    billingService = module.get<BillingService>(BillingService)
    jest.clearAllMocks()
  })

  it("billing controller should be defined", () => {
    expect(billingController).toBeDefined()
  })

  it("billing service should be defined", () => {
    expect(billingService).toBeDefined()
  })

  describe("findBillings", () => {
    describe("when findAll is called", () => {
      let billings: Billing[]

      beforeEach(async () => {
        billings = await billingController.findAll()
      })

      it("then it should call billingService", () => {
        expect(billingService.findAll).toHaveBeenCalled()
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
        billing = await billingController.findOne(billingStub().id)
      })

      it("then it should call billingService", () => {
        expect(billingService.findOne).toHaveBeenCalledWith(billingStub().id)
      })

      it("then it should return a billing", () => {
        expect(billing).toEqual(billingStub())
      })
    })
  })

  describe("createBilling", () => {
    describe("when create is called", () => {
      let billing: Billing
      let createBillingDto: CreateBillingDto

      beforeEach(async () => {
        createBillingDto = {
          userId: billingStub().id,
          customerId: customerStub().id,
        }
        billing = await billingController.create(createBillingDto)
      })

      it("then it should call billingService", () => {
        expect(billingService.create).toHaveBeenCalledWith(createBillingDto)
      })

      it("then it should return a billing", () => {
        expect(billing).toEqual(billingStub())
      })
    })
  })

  describe("deleteBilling", () => {
    describe("when delete is called", () => {
      let billing: Billing

      beforeEach(async () => {
        billing = await billingController.delete(billingStub().id)
      })

      it("then it should call billingService", () => {
        expect(billingService.delete).toHaveBeenCalledWith(billingStub().id)
      })

      it("then it should return a billing", () => {
        expect(billing).toEqual(billingStub())
      })
    })
  })
})
