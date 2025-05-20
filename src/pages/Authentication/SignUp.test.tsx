import { fireEvent, render, screen } from "@testing-library/react";
import { useUser } from "../../redux/slices/user.slice";
import { Provider } from "react-redux";
import SignUp from "./SignUp";
import { setupStore } from "../../redux/store";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../redux/slices/user.slice", () => ({
  ...jest.requireActual("../../redux/slices/user.slice"),
  useUser: jest.fn(),
}));
const mockUserData = {
  isAuthenticated: false,
};
describe("SignUp Component", () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue(mockUserData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Renders correctly", () => {
    (useUser as jest.Mock).mockReturnValue({
      ...mockUserData,
      isAuthenticated: true,
    });
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );

    const usernameField = screen.getByLabelText(
      /username/i
    ) as HTMLInputElement;
    fireEvent.change(usernameField, {
      target: { value: "s.perumal2013@gmail.com" },
    });
    const emailField = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(emailField, {
      target: { value: "s.perumal2013@gmail.com" },
    });
    const passwordField = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    fireEvent.change(passwordField, {
      target: { value: "s.perumal2013@gmail.com" },
    });
    const signupbtn = screen.getByTestId("signup-btn");
    fireEvent.click(signupbtn);
  });

  test("Error state handling", () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );

    const usernameField = screen.getByLabelText(
      /username/i
    ) as HTMLInputElement;
    fireEvent.change(usernameField, {
      target: { value: "" },
    });
    const signupbtn = screen.getByTestId("signup-btn");
    fireEvent.click(signupbtn);
  });
});
