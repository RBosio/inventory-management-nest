import { billingStub } from "../test/stubs/billing.stub"

export const BillingRepository = jest.fn().mockReturnValue({
  save: jest.fn().mockResolvedValue(billingStub()),
  create: jest.fn().mockReturnValue(billingStub()),
  findAll: jest.fn().mockResolvedValue([billingStub()]),
  findOneById: jest.fn().mockResolvedValue(billingStub()),
  findOneByCondition: jest.fn().mockResolvedValue(billingStub()),
  softDelete: jest.fn().mockResolvedValue(billingStub()),
})
