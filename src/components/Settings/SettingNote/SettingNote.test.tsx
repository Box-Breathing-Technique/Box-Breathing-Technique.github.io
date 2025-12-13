/**
 * @file SettingNote.test.tsx
 * @module SettingNote
 * @author Joshua Linehan
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import SettingNote, { testId } from "./SettingNote";

describe("Rendering", () => {
    it("renders the component correctly", () => {
        const text: string = "Test note";
        render(<SettingNote text={text} />);
        const note = screen.getByTestId(testId);
        expect(note).toBeInTheDocument();
        expect(note).toHaveClass("SettingNote");
        expect(screen.getByText(text)).toBeInTheDocument;
    });

    it("renders with no props", () => {
        render(<SettingNote />);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it("displays error when provided", () => {
        render(<SettingNote error="This is an error" />);
        expect(screen.getByText("This is an error")).toBeInTheDocument();
    });

    it("handles null values gracefully", () => {
        render(
            <SettingNote
                text={null as any}
                error={null as any}
            />,
        );
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
});
