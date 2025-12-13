/**
 * @file Settings.test.tsx
 * @module Settings
 * @author Joshua Linehan
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Settings, { testId } from "./Settings";
import { SettingInputType, SettingsItem } from "./Settings.types";

// Mock child components
jest.mock("./SettingDescription", () => ({
    __esModule: true,
    default: jest.fn(({ text }) => (
        <div data-testid="setting-description">{text}</div>
    )),
}));

jest.mock("./SettingInput", () => ({
    __esModule: true,
    default: jest.fn(({ type, placeholder, handleInput, value, setError }) => {
        const displayValue = value ? value() : "";
        return (
            <input
                data-testid="setting-input"
                type={type === "checkbox" ? "checkbox" : "text"}
                placeholder={placeholder}
                value={type === "checkbox" ? undefined : String(displayValue)}
                checked={
                    type === "checkbox" ? Boolean(displayValue) : undefined
                }
                onChange={(e) => {
                    const newValue =
                        type === "checkbox" ? e.target.checked : e.target.value;
                    handleInput?.(newValue);
                    setError?.(undefined);
                }}
            />
        );
    }),
}));

jest.mock("./SettingNote", () => ({
    __esModule: true,
    default: jest.fn(({ text, error }) => (
        <div data-testid="setting-note">{error || text || ""}</div>
    )),
}));

describe("Settings", () => {
    const mockHandleInput = jest.fn();
    const mockValidateInput = jest.fn(() => true);
    const mockValueGetter = jest.fn(() => "john_doe");
    const mockEmailValueGetter = jest.fn(() => "john@example.com");

    const mockSettingsItems: SettingsItem[] = [
        {
            description: {
                text: "Username",
            },
            input: {
                type: "text",
                placeholder: "Enter username",
                handleInput: mockHandleInput,
                validateInput: mockValidateInput,
                errorMessage: "Invalid username",
            },
            note: {
                text: "Enter your username",
            },
            value: mockValueGetter,
        },
        {
            description: {
                text: "Email",
            },
            input: {
                type: "text",
                placeholder: "Enter email",
                handleInput: jest.fn(),
            },
            note: {
                text: "Enter your email address",
            },
            value: mockEmailValueGetter,
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("Rendering", () => {
        it("renders correctly", () => {
            render(<Settings settingsItems={mockSettingsItems} />);
            const settings = screen.getByTestId(testId);
            expect(settings).toBeInTheDocument();
            expect(settings.children).toHaveLength(0);
            expect(settings).toHaveClass("Settings");
        });
    });

    it("manages error state independently for each item", () => {
        render(<Settings settingsItems={mockSettingsItems} />);

        const SettingNote = require("./SettingNote").default;

        // verify each note receives its own error prop
        const calls = SettingNote.mock.calls;
        expect(calls[0][0].error).toBeUndefined();
        expect(calls[1][0].error).toBeUndefined();
    });

    it("renders each part of a settingsItem", () => {
        render(<Settings settingsItems={[mockSettingsItems[0]]} />);

        const SettingDescription = require("./SettingDescription").default;
        const SettingInput = require("./SettingInput").default;
        const SettingNote = require("./SettingNote").default;

        expect(SettingDescription).toHaveBeenCalledTimes(1);
        expect(SettingInput).toHaveBeenCalledTimes(1);
        expect(SettingNote).toHaveBeenCalledTimes(1);
    });
});
