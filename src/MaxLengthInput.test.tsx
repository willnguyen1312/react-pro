import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MaxLengthInput from "./MaxLengthInput";

describe("MaxLengthInput", () => {
  it("shows the initial value", () => {
    render(<MaxLengthInput initialValue="hello" />);

    expect(screen.getByRole("textbox", { name: "Cool name" })).toHaveValue(
      "hello",
    );
  });

  it("lets the user type up to 10 characters", async () => {
    const user = userEvent.setup();
    render(<MaxLengthInput />);
    const field = screen.getByRole("textbox", { name: "Cool name" });

    await user.type(field, "0123456789");

    expect(field).toHaveValue("0123456789");
  });

  it.each(Array.from({ length: 100 }, (_, i) => i))(
    "stops the user typing past 10 characters (iteration %i)",
    async () => {
      const user = userEvent.setup();
      render(<MaxLengthInput />);
      const field = screen.getByRole("textbox", { name: "Cool name" });

      await user.type(field, "a".repeat(100));
      // expect(field).toHaveAttribute("maxlength", "10");

      expect(field).toHaveValue("a".repeat(10));
    },
  );

  it("does not truncate an over-cap initial value (native maxLength only)", () => {
    render(<MaxLengthInput initialValue="0123456789EXTRA" />);

    expect(screen.getByRole("textbox", { name: "Cool name" })).toHaveValue(
      "0123456789EXTRA",
    );
  });
});
