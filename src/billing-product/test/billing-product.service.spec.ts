import { Test, TestingModule } from "@nestjs/testing"
import { BillingProductService } from "../billing-product.service"
import { billingProductStub } from "./stubs/billing-product.stub"
import { BillingProduct } from "src/entities/billing-product.entity"
import { CreateBillingProductDto } from "../dto/create-billing-product.dto"
import { BillingProductRepository } from "../billing-product.repository"
import { NotFoundException } from "@nestjs/common"
import { billingStub } from "src/billing/test/stubs/billing.stub"
import { productStub } from "src/product/test/stubs/product.stub"
import { BillingService } from "src/billing/billing.service"
import { ProductService } from "src/product/product.service"

jest.mock("../billing-product.repository")
jest.mock("../../billing/billing.service")
jest.mock("../../product/product.service")

describe("BillingProductService", () => {
  let billingProductService: BillingProductService
  let billingProductRepository: BillingProductRepository
  let billingService: BillingService
  let productService: ProductService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingProductService,
        BillingProductRepository,
        BillingService,
        ProductService,
      ],
    }).compile()

    billingProductService = module.get<BillingProductService>(
      BillingProductService,
    )
    billingProductRepository = module.get<BillingProductRepository>(
      BillingProductRepository,
    )
    billingService = module.get<BillingService>(BillingService)
    productService = module.get<ProductService>(ProductService)
    jest.clearAllMocks()
  })

  it("billingProduct service should be defined", () => {
    expect(billingProductService).toBeDefined()
  })

  it("billingProduct repository should be defined", () => {
    expect(billingProductRepository).toBeDefined()
  })
  describe("findBillingProducts", () => {
    describe("when findAll is called", () => {
      let billingProducts: BillingProduct[]

      beforeEach(async () => {
        billingProducts = await billingProductService.findAll(billingStub().id)
      })

      it("then it should call billingProductRepository", () => {
        expect(billingProductRepository.findAll).toHaveBeenCalled()
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
        billingProduct = await billingProductService.findOne(
          billingProductStub().id,
        )
      })

      it("then it should call billingProductRepository", () => {
        expect(billingProductRepository.findOneById).toHaveBeenCalledWith(
          billingProductStub().id,
        )
      })

      it("then it should return a billingProduct", () => {
        expect(billingProduct).toEqual(billingProductStub())
      })
    })

    describe("when findOne is called and billingProduct no exist", () => {
      const notFoundBillingProductId = -1

      it("then it should throw NotFoundException", async () => {
        jest
          .spyOn(billingProductRepository, "findOneById")
          .mockResolvedValueOnce(null)

        await expect(
          billingProductService.findOne(notFoundBillingProductId),
        ).rejects.toThrow(NotFoundException)
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
        billingProduct = await billingProductService.create(
          createBillingProductDto,
        )
      })

      it("then it should call billingProductRepository", () => {
        expect(billingProductRepository.create).toHaveBeenCalledWith(
          createBillingProductDto,
        )
      })

      it("then it should return a billingProduct", () => {
        expect(billingProduct).toEqual(billingProductStub())
      })
    })

    describe("when create is called and billing not exists", () => {
      let createBillingProductDto: CreateBillingProductDto

      beforeEach(async () => {
        createBillingProductDto = {
          billingId: billingStub().id,
          productId: productStub().id,
          quantity: 20,
        }
      })

      it("then it should throw NotFoundException", async () => {
        jest
          .spyOn(billingService, "findOne")
          .mockRejectedValueOnce(new NotFoundException())

        await expect(
          billingProductService.create(createBillingProductDto),
        ).rejects.toThrow(NotFoundException)
      })
    })

    describe("when create is called and product not exists", () => {
      let createBillingProductDto: CreateBillingProductDto

      beforeEach(async () => {
        createBillingProductDto = {
          billingId: billingStub().id,
          productId: productStub().id,
          quantity: 20,
        }
      })

      it("then it should throw NotFoundException", async () => {
        jest
          .spyOn(productService, "findOne")
          .mockRejectedValueOnce(new NotFoundException())

        await expect(
          billingProductService.create(createBillingProductDto),
        ).rejects.toThrow(NotFoundException)
      })
    })
  })

  describe("deleteBillingProduct", () => {
    describe("when delete is called", () => {
      let billingProduct: BillingProduct

      beforeEach(async () => {
        jest
          .spyOn(billingProductService, "findOne")
          .mockResolvedValueOnce(billingProductStub())

        billingProduct = await billingProductService.delete(
          billingProductStub().id,
        )
      })

      it("then it should call billingProductRepository", () => {
        expect(billingProductRepository.softDelete).toHaveBeenCalledWith(
          billingProductStub().id,
        )
      })

      it("then it should return a billingProduct", () => {
        expect(billingProduct).toEqual(billingProductStub())
      })
    })

    describe("when delete is called and billingProduct no exist", () => {
      const notFoundBillingProductId = -1
      it("then it should throw NotFoundException", async () => {
        jest
          .spyOn(billingProductService, "findOne")
          .mockRejectedValueOnce(new NotFoundException())

        await expect(
          billingProductService.delete(notFoundBillingProductId),
        ).rejects.toThrow(NotFoundException)
      })
    })
  })
})
