import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import TaskLayout from "./TaskLayout";
import { useTodo } from "../redux/slices/todo.slice";

jest.mock("../redux/slices/todo.slice", () => ({
  ...jest.requireActual("../redux/slices/todo.slice"),
  useTodo: jest.fn(),
}));

jest.mock("./TaskItems", () => {
  return {
    __esModule: true,
    default: () => (
      <div>
        <p>Mock Taskitem</p>
      </div>
    ),
  };
});

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
};
describe("TaskLayout Component", () => {
  beforeEach(() => {
    (useTodo as jest.Mock).mockReturnValue(mockTodoData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Renders Correctly", () => {
    (useTodo as jest.Mock).mockReturnValue({
      ...mockTodoData,
      selectedIds: {
        generateListByGroupId: null,
        generateTaskByListId: 0,
        generateTaskByGroupId: null,
      },
    });
    render(
      <Provider store={setupStore()}>
        <TaskLayout />
      </Provider>
    );
  });

  test("Task item component render", () => {
    render(
      <Provider store={setupStore()}>
        <TaskLayout />
      </Provider>
    );
    const items = screen.getAllByText(/Mock Taskitem/i);
    expect(items.length).toBeGreaterThan(1);
  });

  test("List name change check", () => {
    render(
      <Provider store={setupStore()}>
        <TaskLayout />
      </Provider>
    );
    const listnameTextbox = screen.getByTestId("list-name-text");
    fireEvent.change(listnameTextbox, {
      target: { id: 1, value: "New List Name" },
    });
    expect(listnameTextbox).toHaveValue("System list");
  });

  test("Task name change and task add", () => {
    render(
      <Provider store={setupStore()}>
        <TaskLayout />
      </Provider>
    );

    const taskNameText = screen.getByTestId("taskname-text");
    fireEvent.change(taskNameText, {
      target: { value: "New Task Name" },
    });
    expect(taskNameText).toHaveValue("New Task Name");
    fireEvent.keyDown(taskNameText, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
    });
  });
});
