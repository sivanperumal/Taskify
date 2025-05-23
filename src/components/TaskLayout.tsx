import React, { useMemo, useState } from "react";
import { Box, InputBase, List, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  createTaskItems,
  updateList,
  useTodo,
} from "../redux/slices/todo.slice";
import { todoList, todoTask } from "../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import TaskItems from "./TaskItems";

const TaskLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedIds, listItems, taskItems } = useTodo();
  const [task, setTask] = useState<todoTask>();
  const handleListNameChange = (id: number | undefined, value: string) => {
    const updateListArray = listItems.map((list) =>
      list.listId === id ? { ...list, name: value } : list
    );
    dispatch(updateList(updateListArray));
  };
  const handleOnChangeTask = (
    listId: number,
    groupId: number | null,
    task: string
  ) => {
    setTask({
      taskId: taskItems.length > 0 ? taskItems.length + 1 : 1,
      listId: listId,
      groupId: groupId,
      name: task,
    });
  };
  const handleAddTask = () => {
    dispatch(createTaskItems(task));
    setTask({
      taskId: taskItems.length,
      listId: selectedIds.generateTaskByListId,
      groupId: selectedIds.generateTaskByGroupId,
      name: "",
    });
  };
  const selectedListObj = useMemo(() => {
    const listObj: todoList | undefined = listItems.find(
      (list) => list.listId === selectedIds.generateTaskByListId
    );
    return listObj;
  }, [listItems, selectedIds]);

  const selectedTasks = useMemo(() => {
    const tasks = taskItems.filter(
      (task) =>
        task.listId === selectedIds.generateTaskByListId &&
        task.groupId === selectedIds.generateTaskByGroupId
    );
    return tasks;
  }, [
    taskItems,
    selectedIds.generateTaskByListId,
    selectedIds.generateTaskByGroupId,
  ]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#6f83d3",
      }}
    >
      <Box sx={{ px: 4, py: 2 }}>
        {selectedIds.generateTaskByListId === 0 ? (
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              fontSize: "1.3rem",
              width: "100%",
              px: 1,
              color: "#fff",
            }}
          >
            Todo List/Task Application
          </Typography>
        ) : (
          <InputBase
            value={selectedListObj?.name}
            sx={{
              fontSize: "1.3rem",
              width: "100%",
              px: 1,
              "& input": {
                cursor: "pointer",
              },
              color: "#fff",
            }}
            onChange={(e) =>
              handleListNameChange(selectedListObj?.listId, e.target.value)
            }
          />
        )}
      </Box>
      <Box sx={{ flexGrow: 1, px: 4, overflowY: "auto" }}>
        <List>
          {selectedTasks &&
            selectedTasks.map((task) => {
              return <TaskItems data={task} />;
            })}
        </List>
      </Box>

      <Paper
        elevation={3}
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#3b5eb5",
          color: "white",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        <InputBase
          fullWidth
          placeholder="Add a Task"
          sx={{ color: "white" }}
          value={task?.name}
          onChange={(e) =>
            handleOnChangeTask(
              selectedIds?.generateTaskByListId,
              selectedIds?.generateTaskByGroupId,
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
        />
      </Paper>
    </Box>
  );
};
export default TaskLayout;
