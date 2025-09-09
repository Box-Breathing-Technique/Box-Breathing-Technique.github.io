/**
 * @file PanelTransitionButton.test.tsx
 * @module PanelTransitionButton
 * @author Joshua Linehan
 */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PanelTransitionButton, { testId } from "./PanelTransitionButton";
import { FontInfo } from "../../types";

const defaultLabel: string = "Test";
const mockOnClick = jest.fn();
const defaultFontInfo: FontInfo = {
    fontSize: "16px",
    letterSpacing: "0.5px",
};

describe("PanelTransitionButton", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders with correct label", () => {
        render(
            <PanelTransitionButton
                label={defaultLabel}
                onClick={mockOnClick}
                fontInfo={defaultFontInfo}
            />,
        );

        expect(screen.getByText(defaultLabel)).toBeInTheDocument();
    });

    it("has the correct test id", () => {
        render(
            <PanelTransitionButton
                label={defaultLabel}
                onClick={mockOnClick}
                fontInfo={defaultFontInfo}
            />,
        );

        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it("calls onClick when clicked", () => {
        render(
            <PanelTransitionButton
                label={defaultLabel}
                onClick={mockOnClick}
                fontInfo={defaultFontInfo}
            />,
        );

        fireEvent.click(screen.getByTestId(testId));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("applies font size from fontInfo", () => {
        render(
            <PanelTransitionButton
                label={defaultLabel}
                onClick={mockOnClick}
                fontInfo={defaultFontInfo}
            />,
        );

        const button = screen.getByTestId(testId);
        expect(button).toHaveStyle(`font-size: ${defaultFontInfo.fontSize}`);
        expect(button).toHaveStyle(
            `letter-spacing: ${defaultFontInfo.letterSpacing}`,
        );
    });

    it("handles undefined fontInfo properties gracefully", () => {
        const partialFontInfo: Partial<FontInfo> = {
            fontSize: "18px",
            // letterSpacing omitted
        };

        render(
            <PanelTransitionButton
                label={defaultLabel}
                onClick={mockOnClick}
                fontInfo={partialFontInfo as FontInfo}
            />,
        );

        const button = screen.getByTestId(testId);
        expect(button).toHaveStyle(`font-size: ${partialFontInfo.fontSize}`);
        // should not crash with undefined letterSpacing
    });

    it("applies empty fontInfo without errors", () => {
        const emptyFontInfo: FontInfo = {} as FontInfo;

        render(
            <PanelTransitionButton
                label={defaultLabel}
                onClick={mockOnClick}
                fontInfo={emptyFontInfo}
            />,
        );

        const button = screen.getByTestId(testId);
        expect(button).toBeInTheDocument(); // should render without crashing
    });

    it("renders with empty label", () => {
        const emptyLabel: string = "";
        render(
            <PanelTransitionButton
                label={emptyLabel}
                onClick={mockOnClick}
                fontInfo={defaultFontInfo}
            />,
        );

        const button = screen.getByTestId(testId);
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(emptyLabel);
    });

    it("handles multiple clicks correctly", () => {
        render(
            <PanelTransitionButton
                label={defaultLabel}
                onClick={mockOnClick}
                fontInfo={defaultFontInfo}
            />,
        );

        const button = screen.getByTestId(testId);
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalledTimes(3);
    });
});
