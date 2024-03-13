import { Product } from "src/entities/product.entity"

export const productStub = (): Product => ({
  id: 1,
  name: "Water",
  description: "a simple description",
  quantity: 20,
  bp: [],
})
