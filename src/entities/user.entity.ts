import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
