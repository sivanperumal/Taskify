import { Box, List } from "@mui/material";
import React from "react";
import TaskItems from "./TaskItems";
import { useTodo } from "../redux/slices/todo.slice";
const SearchLayout: React.FC = () => {
  const { filteredTask } = useTodo();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#76848f",
        paddingTop: "10px",
      }}
    >
      <Box sx={{ flexGrow: 1, px: 4, overflowY: "auto" }}>
        <List>
          {filteredTask &&
            filteredTask.map((task) => {
              return <TaskItems data={task} />;
            })}
        </List>
      </Box>
    </Box>
  );
};
export default SearchLayout;
