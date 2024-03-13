import { Billing } from "src/entities/billing.entity"
import { customerStub } from "src/user/test/stubs/customer.stub"
import { userStub } from "src/user/test/stubs/user.stub"

export const billingStub = (): Billing => ({
  id: 1,
  datetime: new Date("2024-03-12T20:32:00"),
  user: userStub(),
  customer: customerStub(),
})
