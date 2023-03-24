import Email from '../src/core/email';
import { typeormInstance } from '../src/db/typeorm-connection';
import AttendanceService from '../src/services/attendance';
import UserService from '../src/services/user';

/**
 * Fetches all users, then check if they are already signed out for today.
 */
async function main() {
  await typeormInstance.connect();

  console.log('Reminder Cloud Function starting...');

  // Declare needed variables.
  const url = process.env.URL ? process.env.URL : '#';
  const today = new Date();
  const users = await UserService.getUsers();

  // Ensure that the `reminders` array is fileld with parallel processing.
  const reminders = await Promise.all(
    users.map(async (user) => {
      const hasCheckedIn = await AttendanceService.checked(
        today,
        user.ID,
        'in'
      );
      if (!hasCheckedIn) {
        return undefined;
      }

      const hasCheckedOut = await AttendanceService.checked(
        today,
        user.ID,
        'out'
      );
      if (hasCheckedOut) {
        return undefined;
      }

      return { email: user.email, name: user.fullName };
    })
  );

  // Send email with parallel processing.
  await Promise.all(
    reminders.map(async (reminder) => {
      if (!reminder) return;

      await new Email(reminder.email, reminder.name).sendReminder(url);
    })
  );
}

main()
  .then(() => {
    console.log('Reminder Cloud Function has finished running.');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => typeormInstance.disconnect());
