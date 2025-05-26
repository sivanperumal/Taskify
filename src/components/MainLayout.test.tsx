import { render } from "@testing-library/react";
import MainLayout from "./MainLayout";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";

describe("Main Layout component", () => {
  test("Main Layout Renders Correctly", () => {
    render(
      <Provider store={setupStore()}>
        <MainLayout />
      </Provider>
    );
  });
});
