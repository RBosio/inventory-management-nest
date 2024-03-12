import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  quantity: number

  @DeleteDateColumn()
  deleted_at?: Date

  @ManyToOne(() => User, (user) => user.products)
  user: User
}
