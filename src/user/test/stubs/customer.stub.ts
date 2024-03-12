import { User } from "src/entities/user.entity"
import { productStub } from "src/product/test/stubs/product.stub"

export const customerStub = (): User => ({
  id: 1,
  name: "Fido",
  surname: "Doe",
  email: "fido@gmail.com",
  password: "123",
  products: [productStub()],
  billingsUser: [],
  billingsCustomer: [],
})
