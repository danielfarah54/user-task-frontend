export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type Task = {
  id: number;
  userId: number;
  name: string;
  description: string;
  completed: boolean;
  user: User;
};

export type QueryTasks = {
  tasks: Task[];
};

export type QueryUsers = {
  users: User[];
};

export type QueryEmails = {
  emails: User[];
};
