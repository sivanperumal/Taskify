import type React from "react";
import TaskLayout from "../../components/TaskLayout";
import { useTodo } from "../../redux/slices/todo.slice";
import SearchLayout from "../../components/SearchLayout";

const List: React.FC = () => {
  const { filteredTask } = useTodo();
  return filteredTask && filteredTask.length === 0 ? (
    <TaskLayout />
  ) : (
    <SearchLayout />
  );
};

export default List;
