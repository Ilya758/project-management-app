export type FileInfo = {
  filename: string;
  fileSize: number;
};

export type TaskInfo = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: FileInfo[];
};

export const taskDefault: TaskInfo = {
  id: '',
  title: '',
  order: 1,
  done: false,
  description: '',
  userId: '',
  files: [],
};

export type ColumnInfo = {
  id: string;
  title: string;
  order: number;
  tasks: TaskInfo[];
};

export type BoardInfo = {
  id: string;
  title: string;
  columns: ColumnInfo[];
};

export type UserInfo = {
  id: string;
  name: string;
  login: string;
};
