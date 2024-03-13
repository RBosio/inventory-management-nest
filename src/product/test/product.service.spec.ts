import { Test, TestingModule } from "@nestjs/testing"
import { ProductService } from "../product.service"
import { productStub } from "./stubs/product.stub"
import { CreateProductDto } from "../dto/create-product.dto"
import { UpdateProductDto } from "../dto/update-product.dto"
import { ProductRepository } from "../product.repository"
import { NotFoundException } from "@nestjs/common"
import { Product } from "src/entities/product.entity"
import { userStub } from "../../user/test/stubs/user.stub"
import { UserService } from "src/user/user.service"

jest.mock("../product.repository")
jest.mock("../../user/user.service")

describe("ProductService", () => {
  let productService: ProductService
  let productRepository: ProductRepository
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, ProductRepository, UserService],
    }).compile()

    productService = module.get<ProductService>(ProductService)
    productRepository = module.get<ProductRepository>(ProductRepository)
    userService = module.get<UserService>(UserService)
    jest.clearAllMocks()
  })

  it("product service should be defined", () => {
    expect(productService).toBeDefined()
  })

  it("product repository should be defined", () => {
    expect(productRepository).toBeDefined()
  })

  it("user service should be defined", () => {
    expect(userService).toBeDefined()
  })

  describe("findProducts", () => {
    describe("when findAll is called", () => {
      let products: Product[]

      beforeEach(async () => {
        products = await productService.findAll()
      })

      it("then it should call productRepository", () => {
        expect(productRepository.findAll).toHaveBeenCalled()
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
        product = await productService.findOne(productStub().id)
      })

      it("then it should call productRepository", () => {
        expect(productRepository.findOneById).toHaveBeenCalledWith(
          productStub().id,
        )
      })

      it("then it should return a product", () => {
        expect(product).toEqual(productStub())
      })
    })

    describe("when findOne is called and product no exist", () => {
      const notFoundProductId = -1

      it("then it should throw NotFoundException", async () => {
        jest.spyOn(productRepository, "findOneById").mockResolvedValueOnce(null)

        await expect(productService.findOne(notFoundProductId)).rejects.toThrow(
          NotFoundException,
        )
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
          userId: userStub().id,
        }
        product = await productService.create(createProductDto)
      })

      it("then it should call productRepository", () => {
        expect(productRepository.create).toHaveBeenCalledWith(createProductDto)
      })

      it("then it should return a product", () => {
        expect(product).toEqual(productStub())
      })
    })

    describe("when create is called and user not found", () => {
      let createProductDto: CreateProductDto

      createProductDto = {
        name: productStub().name,
        description: productStub().description,
        quantity: productStub().quantity,
        userId: userStub().id,
      }

      it("then it should throw NotFoundException", async () => {
        jest
          .spyOn(userService, "findOne")
          .mockRejectedValueOnce(new NotFoundException())

        await expect(productService.create(createProductDto)).rejects.toThrow(
          NotFoundException,
        )
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
        jest
          .spyOn(productService, "findOne")
          .mockResolvedValueOnce(productStub())

        product = await productService.update(
          productStub().id,
          updateProductDto,
        )
      })

      it("then it should call productRepository", () => {
        expect(productRepository.save).toHaveBeenCalledWith({
          ...productStub(),
          ...updateProductDto,
        })
      })

      it("then it should return a product", () => {
        expect(product).toEqual(productStub())
      })
    })

    describe("when update is called and product no exist", () => {
      const notFoundProductId = -1
      let updateProductDto: UpdateProductDto

      it("then it should throw NotFoundException", async () => {
        updateProductDto = {
          name: "Milk",
        }
        jest
          .spyOn(productService, "findOne")
          .mockRejectedValueOnce(new NotFoundException())

        await expect(
          productService.update(notFoundProductId, updateProductDto),
        ).rejects.toThrow(NotFoundException)
      })
    })
  })

  describe("deleteProduct", () => {
    describe("when delete is called", () => {
      let product: Product

      beforeEach(async () => {
        jest
          .spyOn(productService, "findOne")
          .mockResolvedValueOnce(productStub())

        product = await productService.delete(productStub().id)
      })

      it("then it should call productRepository", () => {
        expect(productRepository.softDelete).toHaveBeenCalledWith(
          productStub().id,
        )
      })

      it("then it should return a product", () => {
        expect(product).toEqual(productStub())
      })
    })

    describe("when delete is called and product no exist", () => {
      const notFoundProductId = -1
      it("then it should throw NotFoundException", async () => {
        jest
          .spyOn(productService, "findOne")
          .mockRejectedValueOnce(new NotFoundException())

        await expect(productService.delete(notFoundProductId)).rejects.toThrow(
          NotFoundException,
        )
      })
    })
  })
})
