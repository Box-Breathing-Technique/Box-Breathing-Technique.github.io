/**
 * @file SettingInput.test.tsx
 * @module SettingInput
 * @author Joshua Linehan
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import SettingInput, { testId } from "./SettingInput";

describe("SettingInput", () => {
    const mockHandleInput = jest.fn();
    const mockValue = jest.fn(() => true);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the component", () => {
        render(
            <SettingInput
                type="text"
                placeholder="Test"
                handleInput={mockHandleInput}
            />,
        );
        const input = screen.getByTestId(testId);
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass("SettingInput");
    });

    it("displays text input when specified", () => {
        render(
            <SettingInput
                type="text"
                handleInput={mockHandleInput}
            />,
        );
        const component = screen.getByTestId(testId);
        const inputElement = component.querySelector("input");
        expect(inputElement).toHaveAttribute("type", "text");
    });

    it("displays checkbox when specified", () => {
        render(
            <SettingInput
                type="checkbox"
                handleInput={mockHandleInput}
                value={mockValue}
            />,
        );
        const component = screen.getByTestId(testId);
        const inputElement = component.querySelector("input");
        expect(inputElement).toHaveAttribute("type", "checkbox");
    });
});
