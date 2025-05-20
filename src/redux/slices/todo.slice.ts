import { createSlice } from "@reduxjs/toolkit";

import type { todoState } from "../../interface";

const initialState: todoState = {
  group: [],
  list: [],
  task: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
});

export default todoSlice.reducer;
