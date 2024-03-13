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
export class Billing {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  datetime: Date

  @DeleteDateColumn()
  deleted_at?: Date

  @OneToMany(() => BillingProduct, (bp) => bp.product)
  bp: BillingProduct[]

  @ManyToOne(() => User, (user) => user.billingsUser)
  user?: User

  @ManyToOne(() => User, (user) => user.billingsCustomer)
  customer?: User

  userId?: number
  customerId?: number
}
