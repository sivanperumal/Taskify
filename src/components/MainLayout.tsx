import React from "react";
import { Box, Paper } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
const MainLayout: React.FC = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      {/* Main Content Area */}
      <Box flexGrow={1} p={3}>
        <Paper elevation={2} sx={{ height: "100%", p: 2 }}>
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
};
export default MainLayout;
