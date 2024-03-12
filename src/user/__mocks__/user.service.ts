import { userStub } from "../test/stubs/user.stub"

export const UserService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  findOne: jest.fn().mockResolvedValue(userStub()),
  update: jest.fn().mockResolvedValue(userStub()),
  delete: jest.fn().mockResolvedValue(userStub()),
})
