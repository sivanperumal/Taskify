import React, { useState } from "react";
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
import { useTodo } from "../redux/slices/todo.slice";
import GroupItems from "./GroupItems";
import ListItems from "./ListItems";

const Sidebar: React.FC = () => {
  const username = "John Doe";
  const email = "john@example.com";
  const { groupItems, listItems, selectedIds } = useTodo();
  const [groups, setGroups] = useState<todoGroup>();
  const [lists, setLists] = useState<todoList>();
  const addNewGroup = () => {
    setGroups({
      groupId: groupItems.length + 1,
      name: `Untitled group ${
        groupItems.length !== 0 ? groupItems.length : ""
      }`,
      isOpen: true,
    });
  };
  const addNewList = () => {
    setLists({
      listId: listItems.length + 1,
      groupId: selectedIds.generateListByGroupId
        ? selectedIds.generateListByGroupId
        : null,
      name: `United list ${listItems.length !== 0 ? listItems.length : ""}`,
    });
  };

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
          fullWidth
          variant="outlined"
          placeholder="Search..."
          size="small"
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
          <IconButton onClick={addNewList}>
            <AddIcon fontSize="small" />
          </IconButton>
          <Typography variant="body1" fontWeight={500}>
            New List
          </Typography>
        </Stack>

        {/* Right: Note with + icon */}
        <IconButton size="small" onClick={addNewGroup}>
          <NoteAddOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Sidebar;
