import { billingProductStub } from "../test/stubs/billing-product.stub"

export const BillingProductRepository = jest.fn().mockReturnValue({
  save: jest.fn().mockResolvedValue(billingProductStub()),
  create: jest.fn().mockReturnValue(billingProductStub()),
  findAll: jest.fn().mockResolvedValue([billingProductStub()]),
  findOneById: jest.fn().mockResolvedValue(billingProductStub()),
  findOneByCondition: jest.fn().mockResolvedValue(billingProductStub()),
  softDelete: jest.fn().mockResolvedValue(billingProductStub()),
})
