/**
 * @file Panel.test.tsx
 * @module Panel
 * @author Joshua Linehan
 */

import React, { act, ReactElement, useState } from "react";
import { render, screen } from "@testing-library/react";
import Panel, { testId } from "./Panel";
import { AppState, PanelState } from "../../types";

describe("Panel", () => {
    const defaultAppState: AppState = "animation";
    const defaultPanelState: PanelState = "display";

    it("renders with child content", () => {
        render(
            <Panel
                stateFunction={() => {
                    return defaultPanelState;
                }}
                state={defaultAppState}
            >
                <div>Test Content</div>
            </Panel>,
        );
        expect(screen.getByTestId(testId)).toBeInTheDocument();
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("handles empty children", () => {
        const stateFunction: (appState: AppState) => PanelState = (appState) =>
            defaultPanelState;
        const appState: AppState = defaultAppState;

        render(
            <Panel
                stateFunction={stateFunction}
                state={appState}
            >
                {null}
            </Panel>,
        );

        const panel = screen.getByTestId(testId);
        expect(panel).toBeEmptyDOMElement();
    });

    it("applies correct CSS class based on AppState", () => {
        const stateFunction: (appState: AppState) => PanelState = (
            appState,
        ) => {
            switch (appState) {
                case "about":
                    return "below";
                case "animation":
                    return "display";
                case "settings":
                    return "above";
            }
        };

        const component: (appState: AppState) => ReactElement = (appState) => (
            <Panel
                stateFunction={stateFunction}
                state={appState}
            >
                {null}
            </Panel>
        );

        // appState = "animation"
        const rerender = render(component("animation")).rerender;
        const componentRef: HTMLElement = screen.getByTestId(testId);
        expect(componentRef).not.toHaveClass("above");
        expect(componentRef).toHaveClass("display");
        expect(componentRef).not.toHaveClass("below");

        // appState = "about"
        rerender(component("about"));
        expect(componentRef).not.toHaveClass("above");
        expect(componentRef).not.toHaveClass("display");
        expect(componentRef).toHaveClass("below");

        // appState = "settings"
        rerender(component("settings"));
        expect(componentRef).toHaveClass("above");
        expect(componentRef).not.toHaveClass("display");
        expect(componentRef).not.toHaveClass("below");
    });
});
