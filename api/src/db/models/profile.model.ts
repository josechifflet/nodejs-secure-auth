import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.model';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  profilePK: number;

  @Column({ unique: true })
  @Generated('uuid')
  profileID: string;

  @Column({ unique: true })
  profilename: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column()
  userPK: number;

  @ManyToOne(() => User, (user) => user.attendances)
  @JoinColumn({ name: 'userPk' })
  user: User;
}
