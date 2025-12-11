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
import parseCSSColor from "parse-css-color";
import { DEFAULT_BREATH_DURATION, DEFAULT_COLOUR } from "../../utils";

const BREATHING_NOTE: string =
    "The recommended duration is 4 seconds, but can be customised to match your breathing rhythm.";
const COLOUR_NOTE: string = "Must be a valid CSS color value";
const BREATHING_ERROR: string = "Must be a number";
const COLOUR_ERROR: string = "Must be a valid CSS color value";

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
                <BreathingAnimation ref={breathingAnimationRef} />
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
                                handleInput(value) {
                                    breathingAnimationRef.current?.reset();
                                    breathingAnimationRef.current?.setInDuration(
                                        parseFloat(value as string),
                                    );
                                },
                                validateInput: validateBreathingInput,
                                errorMessage: BREATHING_ERROR,
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
                                handleInput(value) {
                                    breathingAnimationRef.current?.reset();
                                    breathingAnimationRef.current?.setHoldInDuration(
                                        parseFloat(value as string),
                                    );
                                },
                                validateInput: validateBreathingInput,
                                errorMessage: BREATHING_ERROR,
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
                                handleInput(value) {
                                    breathingAnimationRef.current?.reset();
                                    breathingAnimationRef.current?.setOutDuration(
                                        parseFloat(value as string),
                                    );
                                },
                                validateInput: validateBreathingInput,
                                errorMessage: BREATHING_ERROR,
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
                                handleInput(value) {
                                    breathingAnimationRef.current?.reset();
                                    breathingAnimationRef.current?.setHoldOutDuration(
                                        parseFloat(value as string),
                                    );
                                },
                                validateInput: validateBreathingInput,
                                errorMessage: BREATHING_ERROR,
                            },
                            note: { text: BREATHING_NOTE },
                        },
                        {
                            description: { text: "Colour" },
                            input: {
                                type: "text",
                                placeholder: DEFAULT_COLOUR,
                                handleInput(value) {
                                    breathingAnimationRef.current?.reset();
                                    breathingAnimationRef.current?.setGradientColor(
                                        value as string,
                                    );
                                },
                                validateInput(input) {
                                    return parseCSSColor(input) ? true : false;
                                },
                                errorMessage: COLOUR_ERROR,
                            },
                            note: { text: COLOUR_NOTE },
                        },
                        {
                            description: { text: "Show Timer" },
                            input: {
                                type: "checkbox",
                                handleInput(value) {
                                    breathingAnimationRef.current?.reset();
                                    // show timer
                                    breathingAnimationRef.current?.setTimerHidden(
                                        !(value as boolean),
                                    );
                                },
                                value() {
                                    return !(
                                        breathingAnimationRef.current?.getTimerHidden() ??
                                        true
                                    );
                                },
                            },
                        },
                    ]}
                />
            </Panel>
        </div>
    );
}

function validateBreathingInput(input: string): boolean {
    return parseFloat(input).toString() === input;
}

export default App;
