import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import TaskItems from "./TaskItems";
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
const mockTask = {
  taskId: 4,
  listId: 3,
  groupId: 1,
  name: "Software 1",
  completed: false,
};
describe("TaskItem Component", () => {
  beforeEach(() => {
    (useTodo as jest.Mock).mockReturnValue(mockTodoData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("TaskItem Render Correctly", () => {
    render(
      <Provider store={setupStore()}>
        <TaskItems data={mockTask} />
      </Provider>
    );

    const taskElement = screen.getByTestId("task-delete");
    fireEvent.click(taskElement);
  });

  test("calls handleToggle when checkbox is clicked", () => {
    render(
      <Provider store={setupStore()}>
        <TaskItems data={mockTask} />
      </Provider>
    );

    const toggle = screen.getByTestId("task-toggle");
    expect(toggle).not.toBeChecked();

    fireEvent.click(toggle);
  });

  test("Checkbox Initially Checked", () => {
    const mockTask = {
      taskId: 4,
      listId: 3,
      groupId: 1,
      name: "Software 1",
      completed: true,
    };
    render(
      <Provider store={setupStore()}>
        <TaskItems data={mockTask} />
      </Provider>
    );
  });

  test("Task name changes", () => {
    const mockTask = {
      taskId: 4,
      listId: 3,
      groupId: 1,
      name: "Software 1",
      completed: false,
    };
    render(
      <Provider store={setupStore()}>
        <TaskItems data={mockTask} />
      </Provider>
    );
    const taskNameInput = screen.getByTestId(
      "taskname-text"
    ) as HTMLInputElement;

    fireEvent.change(taskNameInput, {
      target: { id: 4, value: "s.perumal2013@gmail.com" },
    });
  });
});
