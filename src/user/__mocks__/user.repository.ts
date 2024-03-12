import { userStub } from "../test/stubs/user.stub"

export const UserRepository = jest.fn().mockReturnValue({
  save: jest.fn().mockResolvedValue(userStub()),
  create: jest.fn().mockReturnValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  findOneById: jest.fn().mockResolvedValue(userStub()),
  findOneByCondition: jest.fn().mockResolvedValue(userStub()),
  softDelete: jest.fn().mockResolvedValue(userStub()),
})
