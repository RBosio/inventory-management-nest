import { billingStub } from "src/billing/test/stubs/billing.stub"
import { BillingProduct } from "src/entities/billing-product.entity"
import { productStub } from "src/product/test/stubs/product.stub"

export const billingProductStub = (): BillingProduct => ({
  id: 1,
  billing: billingStub(),
  product: productStub(),
  datetime: new Date("2024-03-13T02:22:00"),
  quantity: 10,
})
