import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import SearchLayout from "./SearchLayout";
import { useTodo } from "../redux/slices/todo.slice";
jest.mock("../redux/slices/todo.slice", () => ({
  ...jest.requireActual("../redux/slices/todo.slice"),
  useTodo: jest.fn(),
}));

const mockTodoData = {
  listItems: [
    { listId: 1, groupId: null, name: "System list" },
    { listId: 2, groupId: null, name: "Data list" },
  ],
  taskItems: [
    { taskId: 1, listId: 1, groupId: null, name: "System 1", completed: false },
    { taskId: 2, listId: 1, groupId: null, name: "System 2", completed: false },
    { taskId: 3, listId: 2, groupId: null, name: "Data 2", completed: false },
  ],
  selectedIds: {
    generateListByGroupId: null,
    generateTaskByListId: 1,
    generateTaskByGroupId: null,
  },
  filteredTask: [
    {
      taskId: 1,
      listId: 1,
      groupId: null,
      name: "Dev",
      completed: false,
    },
  ],
};
describe("SearchLayout Component", () => {
  beforeEach(() => {
    (useTodo as jest.Mock).mockReturnValue(mockTodoData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Render correctly", () => {
    render(
      <Provider store={setupStore()}>
        <SearchLayout />
      </Provider>
    );
  });
});
