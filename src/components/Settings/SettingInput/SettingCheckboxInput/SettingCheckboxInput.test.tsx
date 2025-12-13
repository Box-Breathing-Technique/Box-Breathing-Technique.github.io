/**
 * @file SettingCheckboxInput.test.tsx
 * @module SettingCheckboxInput
 * @author Joshua Linehan
 */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SettingCheckboxInput, { testId } from "./SettingCheckboxInput";

describe("SettingCheckboxInput", () => {
    const mockHandleInput = jest.fn();
    const mockValueTrue = jest.fn(() => true);
    const mockValueFalse = jest.fn(() => false);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the component", () => {
        render(
            <SettingCheckboxInput
                handleInput={mockHandleInput}
                value={mockValueFalse}
            />,
        );
        const input = screen.getByTestId(testId) as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.type).toBe("checkbox");
        expect(input).toHaveClass("SettingCheckboxInput");
    });

    it("handles click", async () => {
        render(
            <SettingCheckboxInput
                handleInput={mockHandleInput}
                value={mockValueFalse}
            />,
        );
        const input = screen.getByTestId(testId) as HTMLInputElement;
        expect(input.checked).toBe(false);

        // checks when clicked
        fireEvent.click(input);
        expect(mockHandleInput).toHaveBeenCalledTimes(1);
        expect(mockHandleInput).toHaveBeenCalledWith(true);
        expect(input.checked).toBe(true);

        // unchecks when clicked again
        fireEvent.click(input);
        expect(mockHandleInput).toHaveBeenCalledTimes(2);
        expect(mockHandleInput).toHaveBeenCalledWith(false);
        expect(input.checked).toBe(false);
    });
});
