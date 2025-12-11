/**
 * @file SettingDescription.test.tsx
 * @module SettingDescription
 * @author Joshua Linehan
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import SettingDescription, { testId } from "./SettingDescription";

const defaultKey: number = 0;
const defaultText: string = "Test";

describe("SettingDescription", () => {
    it("renders without crashing", () => {
        render(
            <SettingDescription
                key={defaultKey}
                text={defaultText}
            />,
        );
    });

    it("has correct class", () => {
        render(
            <SettingDescription
                key={defaultKey}
                text={defaultText}
            />,
        );
        const component = screen.getByTestId(testId);
        expect(component).toHaveClass("SettingDescription");
    });

    it("displays correct text", () => {
        render(
            <SettingDescription
                key={defaultKey}
                text={defaultText}
            />,
        );
        const component = screen.getByTestId(testId);
        expect(component).toHaveTextContent(defaultText);
    });
});
