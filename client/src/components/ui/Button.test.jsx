import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

test("clicking the button calls event handler", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const btn = screen.getByText("Click me");
    fireEvent.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
});
