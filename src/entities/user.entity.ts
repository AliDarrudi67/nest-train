import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ length: 25 })
  first_name: string;

  @Column({ length: 25 })
  last_name: string;

  @Column({ select: false })
  password: string;
}
