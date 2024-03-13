import { User } from "src/entities/user.entity"
import { productStub } from "src/product/test/stubs/product.stub"

export const userStub = (): User => ({
  id: 1,
  name: "John",
  surname: "Doe",
  email: "jdoe@gmail.com",
  password: "123",
  products: [productStub()],
  billingsUser: [],
  billingsCustomer: [],
})
