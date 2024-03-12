import { User } from "src/entities/user.entity"

export const userStub = (): User => ({
  id: 1,
  name: "John",
  surname: "Doe",
  email: "jdoe@gmail.com",
  password: "123",
})
