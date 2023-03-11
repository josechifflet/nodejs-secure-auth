import { Attendance } from './models/attendance.model';
import { Cache } from './models/cache.model';
import { Session } from './models/session.model';
import { Student } from './models/student.model';
import { User } from './models/user.model';
import { typeormInstance } from './typeorm-connection';

const repositories = {
  cache: typeormInstance.dataSource.manager.getRepository(Cache),
  user: typeormInstance.dataSource.manager.getRepository(User),
  attendance: typeormInstance.dataSource.manager.getRepository(Attendance),
  student: typeormInstance.dataSource.manager.getRepository(Student),
  session: typeormInstance.dataSource.manager.getRepository(Session),
};

export const db = { repositories };
