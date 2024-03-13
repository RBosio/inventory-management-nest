import { Test, TestingModule } from "@nestjs/testing"
import { BillingProductController } from "../billing-product.controller"
import { BillingProductService } from "../billing-product.service"
import { billingProductStub } from "./stubs/billing-product.stub"
import { BillingProduct } from "src/entities/billing-product.entity"
import { CreateBillingProductDto } from "../dto/create-billing-product.dto"
import { billingStub } from "src/billing/test/stubs/billing.stub"
import { productStub } from "src/product/test/stubs/product.stub"
import { JwtService } from "@nestjs/jwt"
import { UserService } from "src/user/user.service"

jest.mock("../billing-product.service")

describe("BillingProductController", () => {
  let billingProductController: BillingProductController
  let billingProductService: BillingProductService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingProductController],
      providers: [
        BillingProductService,
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

    billingProductController = module.get<BillingProductController>(
      BillingProductController,
    )
    billingProductService = module.get<BillingProductService>(
      BillingProductService,
    )
    jest.clearAllMocks()
  })

  it("billingProduct controller should be defined", () => {
    expect(billingProductController).toBeDefined()
  })

  it("billingProduct service should be defined", () => {
    expect(billingProductService).toBeDefined()
  })

  describe("findBillingProducts", () => {
    describe("when findAll is called", () => {
      let billingProducts: BillingProduct[]

      beforeEach(async () => {
        billingProducts = await billingProductController.findAll(
          billingStub().id,
        )
      })

      it("then it should call billingProductService", () => {
        expect(billingProductService.findAll).toHaveBeenCalled()
      })

      it("then it should return billingProducts", () => {
        expect(billingProducts).toEqual([billingProductStub()])
      })
    })
  })

  describe("findBillingProduct", () => {
    describe("when findOne is called", () => {
      let billingProduct: BillingProduct

      beforeEach(async () => {
        billingProduct = await billingProductController.findOne(
          billingProductStub().id,
        )
      })

      it("then it should call billingProductService", () => {
        expect(billingProductService.findOne).toHaveBeenCalledWith(
          billingProductStub().id,
        )
      })

      it("then it should return a billingProduct", () => {
        expect(billingProduct).toEqual(billingProductStub())
      })
    })
  })

  describe("createBillingProduct", () => {
    describe("when create is called", () => {
      let billingProduct: BillingProduct
      let createBillingProductDto: CreateBillingProductDto

      beforeEach(async () => {
        createBillingProductDto = {
          billingId: billingStub().id,
          productId: productStub().id,
          quantity: 20,
        }
        billingProduct = await billingProductController.create(
          createBillingProductDto,
        )
      })

      it("then it should call billingProductService", () => {
        expect(billingProductService.create).toHaveBeenCalledWith(
          createBillingProductDto,
        )
      })

      it("then it should return a billingProduct", () => {
        expect(billingProduct).toEqual(billingProductStub())
      })
    })
  })

  describe("deleteBillingProduct", () => {
    describe("when delete is called", () => {
      let billingProduct: BillingProduct

      beforeEach(async () => {
        billingProduct = await billingProductController.delete(
          billingProductStub().id,
        )
      })

      it("then it should call billingProductService", () => {
        expect(billingProductService.delete).toHaveBeenCalledWith(
          billingProductStub().id,
        )
      })

      it("then it should return a billingProduct", () => {
        expect(billingProduct).toEqual(billingProductStub())
      })
    })
  })
})
