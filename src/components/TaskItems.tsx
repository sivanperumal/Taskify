import React from "react";
import { Box, Checkbox, IconButton, InputBase, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { todoTask } from "../interface";
import { removetTask, updateTask, useTodo } from "../redux/slices/todo.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
interface TaskItemProps {
  data: todoTask;
}

const TaskItems: React.FC<TaskItemProps> = (props) => {
  const { data } = props;
  const { taskItems } = useTodo();
  const dispatch = useDispatch<AppDispatch>();
  const handleOnChangeTask = (id: number, value: string) => {
    const updatedTask = taskItems.map((task) =>
      task.taskId === id ? { ...task, name: value } : task
    );
    dispatch(updateTask(updatedTask));
  };
  const isCompletedTask = (id: number) =>
    taskItems.some((task) => task.taskId === id && task.completed);

  const handleDeleteTask = (taskId: number) => {
    dispatch(removetTask(taskId));
  };
  const handleToggle = (id: number) => {
    const updatedTask = taskItems.map((task) =>
      task.taskId === id ? { ...task, completed: !task.completed } : task
    );
    dispatch(updateTask(updatedTask));
  };
  return (
    <ListItem
      sx={{
        bgcolor: "white",
        borderRadius: 1,
        mb: 1,
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={isCompletedTask(data.taskId)}
          onChange={() => handleToggle(data.taskId)}
        />
        <InputBase
          value={data.name}
          sx={{
            flex: 1,
            "& input": {
              cursor: "pointer",
            },
            textDecoration: data.completed ? "line-through" : "none",
          }}
          inputProps={{ style: { fontWeight: 500 } }}
          onChange={(e) => handleOnChangeTask(data.taskId, e.target.value)}
        />
        <IconButton
          onClick={() => handleDeleteTask(data.taskId)}
          sx={{ color: "#333" }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
};
export default TaskItems;
