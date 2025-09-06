/**
 * @file BreathingAnimationText.tsx
 * @module BreathingAnimationText
 * @author Joshua Linehan
 */

import React from "react";
import "./BreathingAnimationText.css";
import { Phase, NUM_PHASES, START_PHASE } from "../Phases";

export const testId: string = "breathing-animation-text";

interface BreathingAnimationTextProps {
    text: string;
    activePhase: Phase;
    currentPhase: Phase;
}

/** The text the appears in the centre of the breathing animation
 *
 * @property {string} text The text to be displayed
 * @property {Phase} activePhase The Phase when this text is displayed or
 * "active"
 * @property {Phase} currentPhase The current phase. Should be set with useState
 * @returns {React.ReactElement}
 *
 * @example
 * // Breathe in (first phase)
 * const [phase, setPhase] = useState<Phase>(START_PHASE);
 * // implement phase rotation system
 * setPhase(0);
 * <BreathingAnimationText
 *     text={"BREATHE IN"}
 *     activePhase={0}
 *     currentPhase={phase}
 * />
 */
function BreathingAnimationText({
    text,
    activePhase,
    currentPhase,
}: BreathingAnimationTextProps): React.ReactElement {
    return (
        <div
            className={((): string => {
                let subclass: string;
                if (currentPhase === activePhase) {
                    subclass = "active";
                } else if (currentPhase === (activePhase + 1) % NUM_PHASES) {
                    subclass = "after";
                } else if (currentPhase === START_PHASE) {
                    subclass = "none";
                } else {
                    subclass = "before";
                }
                return `BreathingAnimationText ${subclass}`;
            })()}
            data-testid={testId}
        >
            {text}
        </div>
    );
}

export default BreathingAnimationText;
