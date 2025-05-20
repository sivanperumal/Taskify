import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../redux/store";
import SignIn from "./SiginIn";
import { MemoryRouter } from "react-router-dom";
import { useUser } from "../../redux/slices/user.slice";
jest.mock("../../redux/slices/user.slice", () => ({
  ...jest.requireActual("../../redux/slices/user.slice"),
  useUser: jest.fn(),
}));

const mockUserdata = { isAuthenticated: true };

describe("Signin Component", () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue(mockUserdata);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Renders Correctly", () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    const signinBtn = screen.getByTestId("signin-btn");
    fireEvent.change(emailInput, {
      target: { value: "s.perumal2013@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "asdfasdf" } });
    fireEvent.click(signinBtn);
  });

  test("Error for Empty form submission", () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    const signinBtn = screen.getByTestId("signin-btn");
    fireEvent.change(emailInput, {
      target: { value: "" },
    });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(signinBtn);
    expect(screen.getByText(/Please fill in both fields/i)).toBeInTheDocument();
  });
});
