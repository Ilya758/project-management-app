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

export type ColumnInfo = {
  id: string;
  title: string;
  order: number;
  tasks: TaskInfo[];
};

export type BoardInfo = {
  id: string;
  title: string;
  description: string;
  columns: ColumnInfo[];
};

export type UserInfo = {
  id: string;
  name: string;
  login: string;
};

export const userDefault = {
  id: '',
  name: '',
  login: '',
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

export const boardDefault: BoardInfo = {
  id: '',
  title: '',
  description: '',
  columns: [],
};

export type AuthContext = {
  isAuthorize: boolean;
  setIsAuthorize: (value: boolean) => void;
};

export const AuthContextDefault: AuthContext = {
  isAuthorize: false,
  setIsAuthorize: () => {},
};
