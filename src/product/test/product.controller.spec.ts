import { Test, TestingModule } from "@nestjs/testing"
import { ProductController } from "../product.controller"
import { ProductService } from "../product.service"
import { productStub } from "./stubs/product.stub"
import { CreateProductDto } from "../dto/create-product.dto"
import { UpdateProductDto } from "../dto/update-product.dto"
import { Product } from "src/entities/product.entity"

jest.mock("../product.service")

describe("ProductController", () => {
  let productController: ProductController
  let productService: ProductService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile()

    productController = module.get<ProductController>(ProductController)
    productService = module.get<ProductService>(ProductService)
    jest.clearAllMocks()
  })

  it("product controller should be defined", () => {
    expect(productController).toBeDefined()
  })

  it("product service should be defined", () => {
    expect(productService).toBeDefined()
  })

  describe("findProducts", () => {
    describe("when findAll is called", () => {
      let products: Product[]

      beforeEach(async () => {
        products = await productController.findAll()
      })

      it("then it should call productService", () => {
        expect(productService.findAll).toHaveBeenCalled()
      })

      it("then it should return products", () => {
        expect(products).toEqual([productStub()])
      })
    })
  })

  describe("findProduct", () => {
    describe("when findOne is called", () => {
      let product: Product

      beforeEach(async () => {
        product = await productController.findOne(productStub().id)
      })

      it("then it should call productService", () => {
        expect(productService.findOne).toHaveBeenCalledWith(productStub().id)
      })

      it("then it should return a product", () => {
        expect(product).toEqual(productStub())
      })
    })
  })

  describe("createProduct", () => {
    describe("when create is called", () => {
      let product: Product
      let createProductDto: CreateProductDto

      beforeEach(async () => {
        createProductDto = {
          name: productStub().name,
          description: productStub().description,
          quantity: productStub().quantity,
          userId: productStub().id,
        }
        product = await productController.create(createProductDto)
      })

      it("then it should call productService", () => {
        expect(productService.create).toHaveBeenCalledWith(createProductDto)
      })

      it("then it should return a product", () => {
        expect(product).toEqual(productStub())
      })
    })
  })

  describe("updateProduct", () => {
    describe("when update is called", () => {
      let product: Product
      let updateProductDto: UpdateProductDto

      beforeEach(async () => {
        updateProductDto = {
          name: "Milk",
        }
        product = await productController.update(
          productStub().id,
          updateProductDto,
        )
      })

      it("then it should call productService", () => {
        expect(productService.update).toHaveBeenCalledWith(
          productStub().id,
          updateProductDto,
        )
      })

      it("then it should return a product", () => {
        expect(product).toEqual(productStub())
      })
    })
  })

  describe("deleteProduct", () => {
    describe("when delete is called", () => {
      let product: Product

      beforeEach(async () => {
        product = await productController.delete(productStub().id)
      })

      it("then it should call productService", () => {
        expect(productService.delete).toHaveBeenCalledWith(productStub().id)
      })

      it("then it should return a product", () => {
        expect(product).toEqual(productStub())
      })
    })
  })
})
