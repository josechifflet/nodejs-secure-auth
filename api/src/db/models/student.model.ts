import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'student' })
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  studentPK: number;

  @Field(() => ID)
  @Column({ unique: true })
  @Generated('uuid')
  studentID: string;

  @Field()
  @Column({ unique: true })
  document: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthday: Date;

  @Field()
  @Column({ type: 'smallint' })
  generation: number;

  @Field()
  @Column({ type: 'char', length: 1 })
  sex: string;

  @Field()
  @Column({ nullable: true, unique: true })
  email: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
