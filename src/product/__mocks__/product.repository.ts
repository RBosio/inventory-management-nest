import { productStub } from "../test/stubs/product.stub"

export const ProductRepository = jest.fn().mockReturnValue({
  save: jest.fn().mockResolvedValue(productStub()),
  create: jest.fn().mockReturnValue(productStub()),
  findAll: jest.fn().mockResolvedValue([productStub()]),
  findOneById: jest.fn().mockResolvedValue(productStub()),
  findOneByCondition: jest.fn().mockResolvedValue(productStub()),
  softDelete: jest.fn().mockResolvedValue(productStub()),
})
