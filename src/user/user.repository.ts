import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "src/entities/user.entity"
import { BaseAbstractRepository } from "../repositories/base/base.abstract.repository"
import { UserRepositoryInterface } from "src/interfaces/user.interface"

export class UserRepository
  extends BaseAbstractRepository<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository)
  }
}
