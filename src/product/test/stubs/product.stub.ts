import { Product } from "src/entities/product.entity"
import { userStub } from "../../../user/test/stubs/user.stub"

export const productStub = (): Product => ({
  id: 1,
  name: "Water",
  description: "a simple description",
  quantity: 20,
  user: userStub(),
})
