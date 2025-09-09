/**
 * @file Panel.tsx
 * @module Panel
 * @author Joshua Linehan
 */

import React from "react";
import "./Panel.css";
import { AppState, PanelState } from "../../types";

export const testId: string = "panel";

interface PanelProps {
    children: React.ReactNode;
    stateFunction: (appState: AppState) => PanelState;
    state: AppState;
}

/** Swappable panel that controls what is displayed on screen
 *
 * @property {React.ReactNode} children The child components to render within
 * the panel
 * @property {(AppState) => PanelState} stateFunction Function that returns the
 * PanelState this component should be in for each AppState
 * @property {AppState} state The current state of the app. Should be controlled
 * by parent using useState
 * @returns {React.ReactElement}
 */
function Panel({
    children,
    stateFunction,
    state,
}: PanelProps): React.ReactElement {
    return (
        <div
            className={`Panel ${stateFunction(state)}`}
            data-testid="panel"
        >
            {children}
        </div>
    );
}

export default Panel;
