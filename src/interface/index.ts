export interface todoGroup {
  groupId: number;
  name: string;
}
export interface todoList {
  listId: number;
  groupId: number | null;
  name: string;
}
export interface todoTask {
  taskId: number;
  listId: number | null;
  groupId: number | null;
  name: string;
}
export interface todoState {
  group: todoGroup[];
  list: todoList[];
  task: todoTask[];
}
export interface users {
  username: string;
  email: string;
  password: string;
}
export interface userState {
  userList: users[];
  isAuthenticated: boolean;
}
