import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
} from "../test-utils/testing-library-utils";

import FormSection from "../components/FormSection";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("FormSection", () => {
  describe("When the page is loaded", () => {
    it("Should the text input and send button", () => {
      render(<FormSection />);

      const textContainer = screen.getByLabelText("formSectionContainer");
      expect(textContainer).toBeInTheDocument();

      const textInput = screen.getByLabelText("text-input");
      expect(textInput).toBeInTheDocument();

      const sendButton = screen.getByLabelText("send-button");
      expect(sendButton).toBeInTheDocument();
    });
  });
  describe("When user type in the input and press the send button", () => {
    it("Should submit the new noti", () => {
      jest.useFakeTimers("modern");

      render(<App />);

      const textContainer = screen.getByLabelText("formSectionContainer");
      expect(textContainer).toBeInTheDocument();

      const textInput = screen.getByLabelText("text-input");
      expect(textInput).toBeInTheDocument();

      const sendButton = screen.getByLabelText("send-button");
      expect(sendButton).toBeInTheDocument();

      fireEvent.change(textInput, {
        target: { value: "New Noti" },
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      act(() => {
        userEvent.click(sendButton);
      });

      expect(screen.getByLabelText("card-container")).toBeInTheDocument();
      expect(screen.getByText(/new noti/i)).toBeInTheDocument();
    });
  });
});
