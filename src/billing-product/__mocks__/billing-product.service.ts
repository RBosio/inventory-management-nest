import { billingProductStub } from "../test/stubs/billing-product.stub"

export const BillingProductService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(billingProductStub()),
  findAll: jest.fn().mockResolvedValue([billingProductStub()]),
  findOne: jest.fn().mockResolvedValue(billingProductStub()),
  delete: jest.fn().mockResolvedValue(billingProductStub()),
})
