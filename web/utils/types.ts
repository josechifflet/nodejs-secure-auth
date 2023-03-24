/**
 * JSONAPI standard response from the back-end.
 */
export interface Response<T> {
  status: 'success' | 'fail' | 'error';
  message: string;
  data: T;
  type: 'general' | 'users' | 'attendance' | 'auth' | 'sessions';
  meta: {
    copyright: string;
    authors: string[];
  };
  jsonapi: {
    version: string;
  };
  links: {
    self: string;
  };
}

/**
 * Attendance response from the back-end.
 */
export type Attendance = {
  ID: string;
  timeEnter: string;
  ipAddressEnter: string;
  deviceEnter: string;
  remarksEnter: string | null;
  timeLeave: string | null;
  ipAddressLeave: string | null;
  deviceLeave: string | null;
  remarksLeave: string | null;
  user: {
    ID: string;
    fullName: string;
  };
};

/**
 * Attendance status to check whether the user has
 * already checked their attendance.
 */
export type AttendanceStatus = {
  hasCheckedIn: boolean;
  hasCheckedOut: boolean;
};

/**
 * Status from the back-end.
 */
export type Status = {
  isAuthenticated: boolean;
  isMFA: boolean;
  user: User | null;
};

/**
 * Session type from the back-end.
 */
export type Session = {
  ID: string;
  lastActive: string;
  sessionInfo: {
    device: string;
    ip: string;
  };
  signedIn: string;
  sid: string;
};

/**
 * User type from the back-end.
 */
export type User = {
  ID: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  isActive: string;
  updatedAt: string;
  createdAt: string;
  role: 'admin' | 'user';
};

// types.ts
export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
}

export interface ColumnType {
  id: string;
  title: string;
  tickets: Ticket[];
}
