import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../redux/store";
import List from "./List";
import { useTodo } from "../../redux/slices/todo.slice";

jest.mock("../../redux/slices/todo.slice", () => ({
  ...jest.requireActual("../../redux/slices/todo.slice"),
  useTodo: jest.fn(),
}));

jest.mock("../../components/SearchLayout", () => {
  return {
    __esModule: true,
    default: () => (
      <div>
        <p>Mock Search by Task Name</p>
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
  filteredTask: [],
};

describe("Todo Page", () => {
  beforeEach(() => {
    (useTodo as jest.Mock).mockReturnValue(mockTodoData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <List />
      </Provider>
    );
  });
  test("Search by Task Name", () => {
    (useTodo as jest.Mock).mockReturnValue({
      ...mockTodoData,
      filteredTask: [
        {
          taskId: 1,
          listId: 1,
          groupId: null,
          name: "Dev",
          completed: false,
        },
      ],
    });
    render(
      <Provider store={setupStore()}>
        <List />
      </Provider>
    );
    const searchElement = screen.getByText(/Mock Search by Task Name/i);
    expect(searchElement).toBeInTheDocument();
  });
});
