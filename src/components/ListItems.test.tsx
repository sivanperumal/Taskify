import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import ListItems from "./ListItems";
import { useTodo } from "../redux/slices/todo.slice";

jest.mock("../redux/slices/todo.slice", () => ({
  ...jest.requireActual("../redux/slices/todo.slice"),
  useTodo: jest.fn(),
}));
const mockTodoData = {
  groupItems: [
    { groupId: 1, name: "First group", isOpen: true },
    { groupId: 2, name: "Second group", isOpen: false },
  ],
  listItems: [
    { listId: 1, groupId: null, name: "System list" },
    { listId: 2, groupId: null, name: "Data list" },
    { listId: 3, groupId: 1, name: "Software List" },
  ],
  taskItems: [
    { taskId: 1, listId: 1, groupId: null, name: "System 1", completed: false },
    { taskId: 2, listId: 1, groupId: null, name: "System 2", completed: false },
    { taskId: 3, listId: 2, groupId: null, name: "Data 2", completed: false },
    { taskId: 4, listId: 3, groupId: 1, name: "Software 1", completed: false },
  ],
  selectedIds: {
    generateListByGroupId: 1,
    generateTaskByListId: 1,
    generateTaskByGroupId: null,
  },
};
const mockLists = {
  listId: 3,
  groupId: 1,
  name: "Software List",
};

describe("ListItems Component", () => {
  beforeEach(() => {
    (useTodo as jest.Mock).mockReturnValue(mockTodoData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Render Correctly", () => {
    render(
      <Provider store={setupStore()}>
        <ListItems data={mockLists} />
      </Provider>
    );
    const nulledGroup = screen.getAllByTestId("groupname-nulled");
    const listDeleteElement = screen.getAllByTestId("listname-delete");
    fireEvent.click(nulledGroup[0]);
    fireEvent.click(listDeleteElement[0]);
  });
});
