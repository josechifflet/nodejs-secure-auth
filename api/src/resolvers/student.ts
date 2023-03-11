import { Arg, Query, Resolver } from 'type-graphql';

import { Student } from '../db/models/student.model';
import { services } from '../services';

@Resolver()
export class StudentResolver {
  @Query(() => [Student])
  async users(
    @Arg('limit', { nullable: true }) limit: number,
    @Arg('offset', { nullable: true }) offset: number
  ): Promise<Student[]> {
    let users = await services.student.getStudents();
    if (offset && limit) {
      users = users.slice(offset, offset + limit + 1);
    }
    return users;
  }
}
