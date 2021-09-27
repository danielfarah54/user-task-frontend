// authentication
export type Token = {
  accessToken: string;
  userId: string;
  expiresIn: string;
};

export type MutationLogin = {
  login: Token;
};

// user
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type MutationRegisterUser = {
  registerUser: boolean;
};

export type QueryUser = {
  user: User;
};

export type MutationUpdateUser = {
  updateUser: boolean;
};

export type MutationDeleteUser = {
  deleteUser: boolean;
};

// task
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

export type QueryTask = {
  task: Task;
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

export type MutationCheckTask = {
  checkTask: boolean;
};
