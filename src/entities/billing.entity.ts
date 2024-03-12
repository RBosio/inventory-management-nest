import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  datetime: Date

  @DeleteDateColumn()
  deleted_at?: Date

  @ManyToOne(() => User, (user) => user.billingsUser)
  user?: User

  @ManyToOne(() => User, (user) => user.billingsCustomer)
  customer?: User

  userId?: number
  customerId?: number
}
