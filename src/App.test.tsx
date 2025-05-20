import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";
import App from "./App";

describe("App Component", () => {
  test("Renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    );
  });
});
