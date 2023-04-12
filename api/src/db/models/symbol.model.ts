import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Symbol {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  PK: number;

  @Field()
  @Column({ unique: true })
  @Generated('uuid')
  ID: string;

  @Field()
  @Column()
  symbol: string;
}
