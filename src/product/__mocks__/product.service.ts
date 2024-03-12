import { productStub } from "../test/stubs/product.stub"

export const ProductService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(productStub()),
  findAll: jest.fn().mockResolvedValue([productStub()]),
  findOne: jest.fn().mockResolvedValue(productStub()),
  update: jest.fn().mockResolvedValue(productStub()),
  delete: jest.fn().mockResolvedValue(productStub()),
})
