import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
} from "@mui/material";

const Sidebar: React.FC = () => {
  const username = "John Doe";
  const email = "john@example.com";
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

      {/* Bottom: Fixed Action Buttons */}
      <Box>
        <Divider sx={{ my: 2 }} />

        <List>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <Button variant="contained" fullWidth>
              New List
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <Button variant="outlined" fullWidth>
              New Group
            </Button>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
export default Sidebar;
