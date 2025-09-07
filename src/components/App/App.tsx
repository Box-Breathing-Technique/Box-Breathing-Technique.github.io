/**
 * @file App.tsx
 * @module App
 * @author Joshua Linehan
 */

import React, { useState } from "react";
import "./App.css";
import BreathingAnimation from "../BreathingAnimation";
import Panel from "../Panel";
import { AppState, PanelState } from "../../types";

/** Master component for web app
 * @returns {React.ReactElement}
 *
 * @example
 * // Render app
 * const root = ReactDOM.createRoot(
 *   document.getElementById("root") as HTMLElement,
 * );
 * root.render(
 *   <React.StrictMode>
 *     <App />
 *   </React.StrictMode>,
 * );
 */
function App(): React.ReactElement {
    const [appState, setAppState] = useState<AppState>("animation");
    return (
        <div
            className="App"
            role="main"
            data-testid="app"
        >
            {/* animation panel */}
            <Panel
                stateFunction={(appState) => {
                    switch (appState) {
                        case "about":
                            return "below";
                        case "animation":
                            return "display";
                        case "settings":
                            return "above";
                    }
                }}
                state={appState}
            >
                <BreathingAnimation />
            </Panel>
        </div>
    );
}

export default App;
