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
  userId: string;
  expiresIn: string;
};

export type QueryTasks = {
  tasks: Task[];
};

export type QueryTask = {
  task: Task;
};

export type QueryUsers = {
  users: User[];
};

export type QueryUser = {
  user: User;
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

export type MutationUpdateUser = {
  updateUser: boolean;
};

export type MutationCreateTask = {
  registerTask: boolean;
};

export type MutationUpdateTask = {
  updateTask: boolean;
};

export type MutationDeleteTask = {
  deleteTask: boolean;
};
