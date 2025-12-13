/**
 * @file SettingTextInput.test.tsx
 * @module SettingTextInput
 * @author Joshua Linehan
 */

import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import SettingTextInput, { testId } from "./SettingTextInput";

describe("SettingTextInput", () => {
    const mockHandleInput = jest.fn();
    const submitDelay = 1000;

    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it("renders the component", () => {
        const placeHolderText: string = "Test";
        render(
            <SettingTextInput
                placeholder={placeHolderText}
                handleInput={mockHandleInput}
            />,
        );
        const input = screen.getByTestId(testId) as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.type).toBe("text");
        expect(input).toHaveClass("SettingTextInput");
        expect(screen.getByPlaceholderText(placeHolderText)).toBe(input);
        expect(input.value).toBe("");
    });

    it("handles empty string input", async () => {
        render(
            <SettingTextInput
                placeholder="Test"
                handleInput={mockHandleInput}
            />,
        );
        const input = screen.getByTestId(testId) as HTMLInputElement;
        fireEvent.change(input, { target: { value: "" } });
        act(() => {
            jest.advanceTimersByTime(submitDelay);
        });
        expect(mockHandleInput).not.toHaveBeenCalled();
    });

    it("handles long input strings", async () => {
        const longString = "a".repeat(1000);
        render(
            <SettingTextInput
                placeholder="Test"
                handleInput={mockHandleInput}
            />,
        );
        const input = screen.getByTestId(testId);
        fireEvent.change(input, { target: { value: longString } });
        act(() => {
            jest.advanceTimersByTime(submitDelay);
        });
        expect(mockHandleInput).toHaveBeenCalledWith(longString);
    });

    it("handles empty placeholder", () => {
        render(
            <SettingTextInput
                placeholder=""
                handleInput={mockHandleInput}
            />,
        );
        const input = screen.getByTestId(testId) as HTMLInputElement;
        expect(input.placeholder).toBe("");
    });
});
