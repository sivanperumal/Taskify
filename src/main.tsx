//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider as ReduxStore } from "react-redux";
import store from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ReduxStore store={store}>
    <App />
  </ReduxStore>
  // </StrictMode>
);
