import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType(`Paginated${TItemClass.name}Response`)
  class PaginatedResponseClass {
    @Field(() => [TItemClass])
    data!: TItem[];

    @Field(() => Int)
    count!: number;

    @Field(() => Int)
    currentPage!: number;

    @Field(() => Int, { nullable: true })
    nextPage: number;

    @Field(() => Int, { nullable: true })
    prevPage: number;

    @Field(() => Int)
    lastPage!: number;
  }
  return PaginatedResponseClass as any;
}

import Joi from 'joi';

export interface PaginatedRequest {
  page: number;
  take: number;
  param?: string;
}
export const paginatedRequestValidator = Joi.object({
  page: Joi.number().required().max(100).min(1),
  take: Joi.number().required().max(100).min(1),
  param: Joi.string().optional().max(1000),
});

export interface Paginated<T> {
  data: T[];
  count: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}
export const paginatedResponse = <T>(
  data: [T[], number],
  page: number,
  take: number
): Paginated<T> => {
  const [result, total] = data;
  const lastPage = total > 0 ? +Math.ceil(+total / +take).toFixed(0) : 1;
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  return {
    data: [...result],
    count: total,
    currentPage: page,
    nextPage,
    prevPage,
    lastPage,
  };
};
