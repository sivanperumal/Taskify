import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
const MainLayout: React.FC = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      {/* Main Content Area */}
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default MainLayout;
