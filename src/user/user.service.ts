import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserRepository } from "src/repositories/user.repository"
import { User } from "src/entities/user.entity"

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto)

    return this.userRepository.save(user)
  }

  async findAll() {
    return this.userRepository.findAll()
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneById(id)
    if (!user) throw new NotFoundException("user not found")

    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneByCondition({
      where: {
        email,
      },
    })
    if (!user) throw new NotFoundException("user not found")
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)

    const userUpdated = Object.assign(user, updateUserDto)

    return this.userRepository.save(userUpdated)
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id)
    await this.userRepository.softDelete(id)

    return user
  }
}
