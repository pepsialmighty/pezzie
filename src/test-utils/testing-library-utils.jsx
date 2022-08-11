import React from "react";
import { render } from "@testing-library/react";
import NotiProvider from "../context/NotiContext";

const AllTheProvider = ({ children }) => {
  return <NotiProvider>{children}</NotiProvider>;
};

const renderWithProvider = (ui, options) => {
  render(ui, { wrapper: AllTheProvider, ...options });
};

// re-export everything
export * from "@testing-library/react";

//override render method
export { renderWithProvider as render };
