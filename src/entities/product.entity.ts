import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./user.entity"
import { BillingProduct } from "./billing-product.entity"

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

  @OneToMany(() => BillingProduct, (bp) => bp.product)
  bp: BillingProduct[]

  @ManyToOne(() => User, (user) => user.products)
  user?: User
}
