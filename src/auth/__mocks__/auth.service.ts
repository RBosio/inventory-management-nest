import { userStub } from "src/user/test/stubs/user.stub"
import { loginStub } from "../test/stubs/login.stub"

export const AuthService = jest.fn().mockReturnValue({
  signup: jest.fn().mockResolvedValue(userStub()),
  login: jest.fn().mockResolvedValue(loginStub()),
})
