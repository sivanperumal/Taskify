import { fireEvent, render, screen } from "@testing-library/react";
import { useTodo } from "../redux/slices/todo.slice";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import GroupItems from "./GroupItems";

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
  ],
  selectedIds: {
    generateListByGroupId: 1,
    generateTaskByListId: 1,
    generateTaskByGroupId: null,
  },
};
const mockGroup = {
  groupId: 1,
  name: "First group",
  isOpen: true,
};
describe("Group Item component", () => {
  beforeEach(() => {
    (useTodo as jest.Mock).mockReturnValue(mockTodoData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("GroupItem Component Render Correctly", () => {
    render(
      <Provider store={setupStore()}>
        <GroupItems data={mockGroup} />
      </Provider>
    );
    const groupNameText = screen.getAllByTestId("groupname-text");
    const groupToggle = screen.getAllByTestId("group-toggle");
    const groupDelIcon = screen.getAllByTestId("groupname-delete");
    const listDelIcon = screen.getAllByTestId("listname-delete");
    const listSelectId = screen.getAllByTestId("listname-select");

    fireEvent.change(groupNameText[0], {
      target: { value: "Updated First Group" },
    });
    fireEvent.click(groupNameText[0]);
    fireEvent.click(groupToggle[0]);
    fireEvent.click(groupToggle[1]);
    fireEvent.click(groupDelIcon[0]);
    fireEvent.click(listDelIcon[0]);
    fireEvent.click(listSelectId[0]);

    expect(groupNameText[0]).toBeInTheDocument();
    expect(groupToggle[0]).toBeInTheDocument();
    expect(groupDelIcon[0]).toBeInTheDocument();
  });
});
