import { billingStub } from "../test/stubs/billing.stub"

export const BillingService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(billingStub()),
  findAll: jest.fn().mockResolvedValue([billingStub()]),
  findOne: jest.fn().mockResolvedValue(billingStub()),
  update: jest.fn().mockResolvedValue(billingStub()),
  delete: jest.fn().mockResolvedValue(billingStub()),
})
