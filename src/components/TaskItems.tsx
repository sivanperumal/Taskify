import React from "react";
import { Box, ListItem, ListItemText } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { todoTask } from "../interface";
interface TaskItemProps {
  data: todoTask;
}
const TaskItems: React.FC<TaskItemProps> = (props) => {
  const { data } = props;
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
        <RadioButtonUncheckedIcon sx={{ mr: 2 }} />
        <ListItemText primary={data.name} />
      </Box>
    </ListItem>
  );
};
export default TaskItems;
