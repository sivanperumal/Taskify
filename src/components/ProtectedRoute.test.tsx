import { render } from "@testing-library/react";
import { useUser } from "../redux/slices/user.slice";
import ProtectedRoute from "./ProtectedRoute";
import { setupStore } from "../redux/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

jest.mock("../redux/slices/user.slice", () => ({
  ...jest.requireActual("../redux/slices/user.slice"),
  useUser: jest.fn(),
}));

const mockUserdata = { isAuthenticated: true };
describe("Protected Route Component", () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue(mockUserdata);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Renders Correctly", () => {
    render(
      <Provider store={setupStore()}>
        <ProtectedRoute />
      </Provider>
    );
  });
  test("Protected Route fails", () => {
    (useUser as jest.Mock).mockReturnValue({
      ...mockUserdata,
      isAuthenticated: false,
    });
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <ProtectedRoute />
        </MemoryRouter>
      </Provider>
    );
  });
});
