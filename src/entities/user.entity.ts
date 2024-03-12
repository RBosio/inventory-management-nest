import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product.entity"

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

  @OneToMany(() => Product, (products) => products.user)
  products: Product[]
}
