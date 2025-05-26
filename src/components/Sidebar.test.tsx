import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import Sidebar from "./Sidebar";
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

describe("TaskItem Component", () => {
  beforeEach(() => {
    (useTodo as jest.Mock).mockReturnValue(mockTodoData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Sidebar Render Correctly", () => {
    render(
      <Provider store={setupStore()}>
        <Sidebar />
      </Provider>
    );

    const textbox = screen.getByLabelText("searchByText") as HTMLInputElement;
    expect(textbox).toBeInTheDocument();
    fireEvent.change(textbox, { target: { value: "Change Taskname" } });
    expect(textbox.value).toBe("Change Taskname");
  });

  test("Add new Group and new List in Sidebar", () => {
    render(
      <Provider store={setupStore()}>
        <Sidebar />
      </Provider>
    );
    const addGroupEle = screen.getByTestId("add-group");
    expect(addGroupEle).toBeInTheDocument();
    fireEvent.click(addGroupEle);

    const addListEle = screen.getByTestId("add-list");
    expect(addListEle).toBeInTheDocument();
    fireEvent.click(addListEle);
  });

  test("Intitially starts the Application", () => {
    (useTodo as jest.Mock).mockReturnValue({
      groupItems: [],
      listItems: [],
      taskItmes: [],
      selectedIds: {
        generateListByGroupId: null,
        generateTaskByListId: 0,
        generateTaskByGroupId: null,
      },
    });
    render(
      <Provider store={setupStore()}>
        <Sidebar />
      </Provider>
    );
    const addGroupEle = screen.getByTestId("add-group");
    expect(addGroupEle).toBeInTheDocument();
    fireEvent.click(addGroupEle);
    const addListEle = screen.getByTestId("add-list");
    expect(addListEle).toBeInTheDocument();
    fireEvent.click(addListEle);
  });

  test("Signout Action", () => {
    render(
      <Provider store={setupStore()}>
        <Sidebar />
      </Provider>
    );
    const signoutBtn = screen.getByTestId("signout-btn");
    expect(signoutBtn).toBeInTheDocument();
    fireEvent.click(signoutBtn);
  });
});
