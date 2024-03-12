import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { User } from "src/entities/user.entity"
import { UserRepository } from "./user.repository"

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userFounded = await this.findOneByEmail(createUserDto.email)

    if (userFounded) throw new BadRequestException("email already exists")

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

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneByCondition({
      where: {
        email,
      },
    })
    if (!user) return null

    return user
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
