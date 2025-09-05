/**
 * @file BreathingAnimationText.tsx
 * @module BreathingAnimationText
 * @author Joshua Linehan
 */

import React from "react";
import "./BreathingAnimationText.css";

interface BreathingAnimationTextProps {
    text: string;
    activePhase: number;
    currentPhase: number;
    totalPhases: number;
}

/**
 * @returns {React.ReactElement}
 */
function BreathingAnimationText({
    text,
    activePhase,
    currentPhase,
    totalPhases,
}: BreathingAnimationTextProps): React.ReactElement {
    return (
        <div
            className={((): string => {
                let subclass: string;
                if (currentPhase === activePhase) {
                    subclass = "active";
                } else if (currentPhase === (activePhase + 1) % totalPhases) {
                    subclass = "after";
                } else {
                    subclass = "before";
                }
                return `BreathingAnimationText ${subclass}`;
            })()}
            data-testid="breathing-animation-text"
        >
            {text}
        </div>
    );
}

export default BreathingAnimationText;
