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

export type Token = {
  accessToken: string;
  expiresIn: string;
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

export type MutationLogin = {
  login: Token;
};

export type MutationRegisterUser = {
  registerUser: boolean;
};

export type MutationCreateTask = {
  registerTask: boolean;
};

export type MutationDeleteTask = {
  deleteTask: boolean;
};
