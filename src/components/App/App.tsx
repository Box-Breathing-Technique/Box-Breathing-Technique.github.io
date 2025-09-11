/**
 * @file App.tsx
 * @module App
 * @author Joshua Linehan
 */

import React, { useState, useRef, useCallback } from "react";
import "./App.css";
import BreathingAnimation from "../BreathingAnimation";
import Panel from "../Panel";
import { AppState } from "../../types";
import { BreathingAnimationRef } from "../BreathingAnimation/BreathingAnimation.types";
import PanelTransitionButton from "../PanelTransitionButton";
import { useTextStyle } from "../../hooks";
import Settings from "../Settings";

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
    const breathingAnimationRef = useRef<BreathingAnimationRef>(null);
    const [
        breathingAnimationGradientColor,
        setBreathingAnimationGradientColor,
    ] = useState<string>("#0096ffcc");

    const resetBreathingAnimation: () => void = () => {
        breathingAnimationRef.current?.reset();
    };

    const fontInfo = useTextStyle(
        useCallback(
            () => breathingAnimationRef.current?.textContainerRef.current,
            [],
        ),
    );

    return (
        <div
            className="App"
            role="main"
            data-testid="app"
        >
            {/* about panel */}
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
                <PanelTransitionButton
                    label={"ABOUT"}
                    onClick={() => {}}
                    fontInfo={fontInfo}
                />
                <BreathingAnimation
                    ref={breathingAnimationRef}
                    gradientColor={breathingAnimationGradientColor}
                />
                <PanelTransitionButton
                    label={"SETTINGS"}
                    onClick={() => setAppState("settings")}
                    fontInfo={fontInfo}
                />
            </Panel>
            {/* settings panel */}
            <Panel
                stateFunction={(appState) => {
                    switch (appState) {
                        case "about":
                            return "below";
                        case "animation":
                            return "below";
                        case "settings":
                            return "display";
                    }
                }}
                state={appState}
            >
                <PanelTransitionButton
                    label={"DONE"}
                    onClick={() => setAppState("animation")}
                    fontInfo={fontInfo}
                />
                <Settings
                    settingsItems={[
                        {
                            description: { text: "desc1" },
                            input: { type: "text" },
                        },
                        {
                            description: { text: "desc2" },
                            input: { type: "text" },
                            note: { text: "note2" },
                        },
                    ]}
                />
            </Panel>
        </div>
    );
}

export default App;
