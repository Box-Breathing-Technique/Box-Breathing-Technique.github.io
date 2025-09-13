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

const DEFAULT_COLOUR: string = "#0096ffcc";
const DEFAULT_BREATH_DURATION: number = 4.0;
const BREATHING_NOTE: string =
    "The recommended duration is 4 seconds, but can be customised to match your breathing rhythm.";
const COLOUR_NOTE: string = "Must be a valid CSS color value";

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
    ] = useState<string>(DEFAULT_COLOUR);

    const resetBreathingAnimation: () => void = () => {
        breathingAnimationRef.current?.reset();
    };

    const fontInfo = useTextStyle(
        useCallback(
            () => breathingAnimationRef.current?.textContainerRef.current,
            [],
        ),
    );

    const [inDuration, setInDuration] = useState<number>(
        DEFAULT_BREATH_DURATION,
    );
    const [holdInDuration, setHoldInDuration] = useState<number>(
        DEFAULT_BREATH_DURATION,
    );
    const [outDuration, setOutDuration] = useState<number>(
        DEFAULT_BREATH_DURATION,
    );
    const [holdOutDuration, setHoldOutDuration] = useState<number>(
        DEFAULT_BREATH_DURATION,
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
                    inDuration={inDuration}
                    holdInDuration={holdInDuration}
                    outDuration={outDuration}
                    holdOutDuration={holdOutDuration}
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
                            description: {
                                text: "Breathe In Duration (seconds)",
                            },
                            input: {
                                type: "text",
                                placeholder: `${DEFAULT_BREATH_DURATION}`,
                                handleInput: (value) => {
                                    resetBreathingAnimation();
                                    setInDuration(parseFloat(value));
                                },
                            },
                            note: { text: BREATHING_NOTE },
                        },
                        {
                            description: {
                                text: "Hold Breath In Duration (seconds)",
                            },
                            input: {
                                type: "text",
                                placeholder: `${DEFAULT_BREATH_DURATION}`,
                                handleInput: (value) => {
                                    resetBreathingAnimation();
                                    setHoldInDuration(parseFloat(value));
                                },
                            },
                            note: { text: BREATHING_NOTE },
                        },
                        {
                            description: {
                                text: "Breathe Out Duration (seconds)",
                            },
                            input: {
                                type: "text",
                                placeholder: `${DEFAULT_BREATH_DURATION}`,
                                handleInput: (value) => {
                                    resetBreathingAnimation();
                                    setOutDuration(parseFloat(value));
                                },
                            },
                            note: { text: BREATHING_NOTE },
                        },
                        {
                            description: {
                                text: "Hold Breath Out Duration (seconds)",
                            },
                            input: {
                                type: "text",
                                placeholder: `${DEFAULT_BREATH_DURATION}`,
                                handleInput: (value) => {
                                    resetBreathingAnimation();
                                    setHoldOutDuration(parseFloat(value));
                                },
                            },
                            note: { text: BREATHING_NOTE },
                        },
                        {
                            description: { text: "Colour" },
                            input: {
                                type: "text",
                                placeholder: DEFAULT_COLOUR,
                                handleInput: (value) => {
                                    resetBreathingAnimation();
                                    setBreathingAnimationGradientColor(value);
                                },
                            },
                            note: { text: COLOUR_NOTE },
                        },
                        {
                            description: { text: "Show Timer" },
                            input: {
                                type: "text",
                                placeholder: "no",
                                handleInput: (value) => {
                                    resetBreathingAnimation();
                                    // show timer
                                },
                            },
                        },
                    ]}
                />
            </Panel>
        </div>
    );
}

export default App;
