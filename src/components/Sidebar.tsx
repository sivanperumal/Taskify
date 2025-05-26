import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import { todoGroup, todoList } from "../interface";
import { filteredTask, useTodo } from "../redux/slices/todo.slice";
import GroupItems from "./GroupItems";
import ListItems from "./ListItems";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const Sidebar: React.FC = () => {
  const username = "John Doe";
  const email = "john@example.com";
  const dispatch = useDispatch<AppDispatch>();
  const { groupItems, listItems, taskItems, selectedIds } = useTodo();
  const [groups, setGroups] = useState<todoGroup>();
  const [lists, setLists] = useState<todoList>();
  const [searchTask, setSearchTask] = useState<string>("");
  const addNewGroup = () => {
    setGroups({
      groupId: Date.now() - Math.floor(Math.random() * 1000),
      name: `Untitled group ${
        groupItems.length !== 0 ? groupItems.length : ""
      }`,
      isOpen: true,
    });
  };
  const addNewList = () => {
    setLists({
      listId: Date.now() - Math.floor(Math.random() * 1000),
      groupId: selectedIds.generateListByGroupId
        ? selectedIds.generateListByGroupId
        : null,
      name: `United list ${listItems.length !== 0 ? listItems.length : ""}`,
    });
  };
  const handleOnSearchTask = (value: string) => {
    setSearchTask(value);
  };

  useEffect(() => {
    if (searchTask.trim() !== "") {
      const FilteredTask = taskItems.filter((task) => {
        return task.name.toLowerCase().includes(searchTask.toLowerCase());
      });
      dispatch(filteredTask(FilteredTask));
    } else {
      dispatch(filteredTask([]));
    }
  }, [searchTask, taskItems, dispatch]);

  return (
    <Box
      sx={{
        width: 300,
        bgcolor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        borderRight: "1px solid #ddd",
      }}
    >
      {/* Top: User Info & Search */}
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {email}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <TextField
          label="searchByText"
          fullWidth
          variant="outlined"
          placeholder="Search..."
          size="small"
          onChange={(e) => handleOnSearchTask(e.target.value)}
        />
      </Box>

      {/* Group list section */}
      <GroupItems data={groups} />
      <ListItems data={lists} />
      {/* Bottom: Fixed Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1.5,
          backgroundColor: "#f1e9cd", // soft beige like your screenshot
          cursor: "pointer",
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "#e8dfc2",
          },
        }}
      >
        {/* Left: Add icon + text */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={addNewList} data-testid="add-list">
            <AddIcon fontSize="small" />
          </IconButton>
          <Typography variant="body1" fontWeight={500}>
            New List
          </Typography>
        </Stack>

        {/* Right: Note with + icon */}
        <IconButton size="small" onClick={addNewGroup} data-testid="add-group">
          <NoteAddOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Sidebar;
