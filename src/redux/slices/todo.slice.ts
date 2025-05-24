import { createSlice } from "@reduxjs/toolkit";

import type { todoState } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const initialState: todoState = {
  groupItems: localStorage.getItem("todoGroupItems")
    ? JSON.parse(localStorage.getItem("todoGroupItems") || "[]")
    : [],
  listItems: localStorage.getItem("todoListItems")
    ? JSON.parse(localStorage.getItem("todoListItems") || "[]")
    : [],
  taskItems: localStorage.getItem("todoTaskItems")
    ? JSON.parse(localStorage.getItem("todoTaskItems") || "[]")
    : [],
  selectedIds: {
    generateListByGroupId: null,
    generateTaskByListId: 0,
    generateTaskByGroupId: null,
  },
  filteredTask: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createGroupItems: (state, action) => {
      state.groupItems.push(action.payload);
      const todos = JSON.parse(localStorage.getItem("todoGroupItems") || "[]");
      todos.push(action.payload);
      localStorage.setItem("todoGroupItems", JSON.stringify(todos));
    },
    createListItems: (state, action) => {
      state.listItems.push(action.payload);
      const todos = JSON.parse(localStorage.getItem("todoListItems") || "[]");
      todos.push(action.payload);
      localStorage.setItem("todoListItems", JSON.stringify(todos));
    },
    createTaskItems: (state, action) => {
      state.taskItems.push(action.payload);
      const tasks = JSON.parse(localStorage.getItem("todoTaskItems") || "[]");
      tasks.push(action.payload);
      localStorage.setItem("todoTaskItems", JSON.stringify(tasks));
    },
    updateGroup: (state, action) => {
      state.groupItems = action.payload;
      localStorage.setItem("todoGroupItems", JSON.stringify(action.payload));
    },
    updateList: (state, action) => {
      state.listItems = action.payload;
      localStorage.setItem("todoListItems", JSON.stringify(action.payload));
    },
    updateTask: (state, action) => {
      state.taskItems = action.payload;
      localStorage.setItem("todoTaskItems", JSON.stringify(action.payload));
    },
    removetTask: (state, action) => {
      const removedTask = state.taskItems.filter(
        (task) => task.taskId !== action.payload
      );
      state.taskItems = removedTask;
      localStorage.setItem("todoTaskItems", JSON.stringify(removedTask));
    },
    removeList: (state, action) => {
      const removedList = state.listItems.filter(
        (list) => list.listId !== action.payload
      );
      state.listItems = removedList;
      const removedTask = state.taskItems.filter(
        (task) => task.listId !== action.payload
      );
      state.taskItems = removedTask;
      state.selectedIds = {
        ...state.selectedIds,
        generateTaskByListId: 0,
        generateTaskByGroupId: null,
      };
      localStorage.setItem("todoListItems", JSON.stringify(removedList));
      localStorage.setItem("todoTaskItems", JSON.stringify(removedTask));
    },
    removeGroup: (state, action) => {
      const removedGroup = state.groupItems.filter(
        (group) => group.groupId !== action.payload
      );
      state.groupItems = removedGroup;

      const removedList = state.listItems.filter(
        (list) => list.groupId !== action.payload
      );
      state.listItems = removedList;
      const removedTask = state.taskItems.filter(
        (task) => task.groupId !== action.payload
      );
      state.taskItems = removedTask;
      state.selectedIds = {
        generateListByGroupId: null,
        generateTaskByListId: 0,
        generateTaskByGroupId: null,
      };

      localStorage.setItem("todoGroupItems", JSON.stringify(removedGroup));
      localStorage.setItem("todoListItems", JSON.stringify(removedList));
      localStorage.setItem("todoTaskItems", JSON.stringify(removedTask));
    },
    filteredTask: (state, action) => {
      state.filteredTask = action.payload;
    },
    updatelistInGroupId: (state, action) => {
      state.selectedIds = {
        generateListByGroupId: action.payload,
        generateTaskByListId: 0,
        generateTaskByGroupId: null,
      };
    },
    updateSelectedIds: (state, action) => {
      state.selectedIds = {
        ...state.selectedIds,
        generateListByGroupId: null,
        generateTaskByListId: action.payload.listId,
        generateTaskByGroupId: action.payload.groupId,
      };
    },
  },
});
export const useTodo = () => {
  const todoObj = useSelector((state: RootState) => {
    return state.todo;
  });
  return { ...todoObj };
};
export const {
  createGroupItems,
  createListItems,
  createTaskItems,
  updateGroup,
  updateList,
  updateTask,
  removetTask,
  removeList,
  removeGroup,
  filteredTask,
  updatelistInGroupId,
  updateSelectedIds,
} = todoSlice.actions;
export default todoSlice.reducer;
