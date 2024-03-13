import { userStub } from "src/user/test/stubs/user.stub"

export const JwtService = jest.fn().mockReturnValue({
  signAsync: jest.fn().mockResolvedValue({ sub: userStub().id }),
})
