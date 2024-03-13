import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Product } from "./product.entity"
import { Billing } from "./billing.entity"

@Entity()
export class BillingProduct {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  quantity: number

  @Column()
  datetime: Date

  @DeleteDateColumn()
  deleted_at?: Date

  @ManyToOne(() => Billing, (billing) => billing.bp)
  billing: Billing

  @ManyToOne(() => Product, (product) => product.bp)
  product: Product
}
