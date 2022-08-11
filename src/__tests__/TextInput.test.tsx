import React from "react";
import { render, screen } from "../test-utils/testing-library-utils";

import TextInput from "../components/TextInput";

describe("TextInput", () => {
  describe("When the page is loaded", () => {
    it("Should have the text input and send button", () => {
      render(<TextInput />);

      const testInput = screen.getByLabelText("text-input");
      expect(testInput).toBeInTheDocument();
    });
  });
});
