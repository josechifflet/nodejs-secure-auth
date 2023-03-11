import { Attendance } from './attendance.model';
import { Cache } from './cache.model';
import { Session } from './session.model';
import { Student } from './student.model';
import { User } from './user.model';

export const entities = [User, Attendance, Cache, Student, Session];

export default { User, Attendance, Cache, Student, Session };
