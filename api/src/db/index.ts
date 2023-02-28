import { Attendance } from './models/attendance.model';
import { Profile } from './models/profile.model';
import { User } from './models/user.model';
import { typeormInstance } from './typeorm-connection';

const repositories = {
  user: typeormInstance.dataSource.manager.getRepository(User),
  attendance: typeormInstance.dataSource.manager.getRepository(Attendance),
  profile: typeormInstance.dataSource.manager.getRepository(Profile),
};

export const db = { repositories };
