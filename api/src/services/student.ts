import { DeepPartial, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { db } from '../db';
import { Student } from '../db/models/student.model';

/**
 * Almost all student operations return these attributes (usually exposed to the student as response)
 * this is intentional as we do not want sensitive values to be fetched and exposed to the end student.
 */
const select: FindOptionsSelect<Student> = {
  studentID: true,
  email: true,
  birthday: true,
  firstName: true,
  lastName: true,
  document: true,
  generation: true,
  sex: true,
  createdAt: true,
  updatedAt: true,
};

/**
 * Business logic and repositories for 'Students' entity.
 */
class StudentService {
  /**
   * Fetches all users from the database.
   *
   * @returns All users from the database, sensitive columns removed.
   */
  public getStudents = async () => db.repositories.student.find({ select });

  /**
   * Fetches a single student's complete data with no filters.
   *
   * @param where - Prisma's 'Where' object that accepts unique attributes only.
   * @returns A single student's complete data (with sensitive values).
   */
  public getStudentComplete = async (where: FindOptionsWhere<Student>) =>
    db.repositories.student.findOneBy(where);

  /**
   * Fetches a single student with their sensitive data removed.
   *
   * @param where - Prisma's 'Where' object that accepts unique attributes only.
   * @returns A single student data, filtered (no sensitive values).
   */
  public getStudent = async (where: FindOptionsWhere<Student>) =>
    db.repositories.student.findOne({ where, select });

  /**
   * Fetches a single student based on their username, email, and phone number. This is inspired
   * by Twitter, Facebook, and Google's ways of logging someone in. As username, email, and
   * phone numbers are all unique, it can be assumed that `findFirst` will always return a single
   * and the correct data, due to the earlier constraints.
   *
   * @param document - A student's document.
   * @param email - A student's email.
   * @returns A single student data, filtered with no sensitive values.
   */
  public getStudentByCredentials = async (document: string, email: string) =>
    db.repositories.student.findOne({
      /** OR operator */
      where: [{ document }, { email }],
    });

  /**
   * Creates a single student data, and generates their own QR code URI for Google Authenticator.
   *
   * @param data - All of a student's required data.
   * @returns A created 'Student' object, with sensitive data removed.
   */
  public createStudent = async (data: DeepPartial<Student>) => {
    const u = { ...data };

    // Create a new student.
    const newStudent = await db.repositories.student.save(u);

    // Retrieve the created student
    const createdStudent = await db.repositories.student.findOneByOrFail({
      studentPK: newStudent.studentPK,
    });

    // Return all objects.
    return createdStudent;
  };

  /**
   * Updates a single student data.
   *
   * @param where - Prisma's 'Where' object. Only accepts unique attributes.
   * @param data - A partial object to update the student. Already validated in validation layer.
   * @returns An updated 'Student' object, with sensitive data removed.
   */
  public updateStudent = async (
    where: FindOptionsWhere<Student>,
    data: QueryDeepPartialEntity<Student>
  ) => {
    const u = { ...data };

    await db.repositories.student.update(where, u);

    return db.repositories.student.findOneOrFail({ where, select });
  };

  /**
   * Deletes a single student.
   *
   * @param where - Prisma's 'where' object to decide what to delete.
   * @returns An updated 'Student' object.
   */
  public deleteStudent = async (where: FindOptionsWhere<Student>) =>
    db.repositories.student.delete(where);
}

export default new StudentService();
