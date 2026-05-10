export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface ITask {
  _id: string;
  userId: string;
  title: string;
  description: string;
  deadline: Date;
  status: 'todo' | 'in-progress' | 'done';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}