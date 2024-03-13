import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Product } from "./product.entity"
import { Billing } from "./billing.entity"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 20 })
  name: string

  @Column({ length: 20 })
  surname: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @DeleteDateColumn()
  deleted_at?: Date

  @OneToMany(() => Product, (products) => products.user)
  products: Product[]

  @OneToMany(() => Billing, (billingsUser) => billingsUser.user)
  billingsUser: Billing[]

  @OneToMany(() => Billing, (billingsCustomer) => billingsCustomer.customer)
  billingsCustomer: Billing[]
}
