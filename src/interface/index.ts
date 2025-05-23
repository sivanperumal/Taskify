export interface todoGroup {
  groupId: number;
  name: string;
  isOpen: boolean;
}
export interface todoList {
  listId: number;
  groupId: number | null;
  name: string;
}
export interface todoTask {
  taskId: number;
  listId: number;
  groupId: number | null;
  name: string;
}
export interface todoSelectedId {
  generateListByGroupId: number | null;
  generateTaskByListId: number;
  generateTaskByGroupId: number | null;
}
export interface todoState {
  groupItems: todoGroup[];
  listItems: todoList[];
  taskItems: todoTask[];
  selectedIds: todoSelectedId;
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
