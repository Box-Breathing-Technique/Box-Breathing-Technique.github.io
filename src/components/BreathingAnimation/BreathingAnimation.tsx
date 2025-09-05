/**
 * @file BreathingAnimation.tsx
 * @module BreathingAnimation
 * @author Joshua Linehan
 */

import React, { useEffect, useState, useRef } from "react";
import "./BreathingAnimation.css";
import BreathingAnimationText from "./BreathingAnimationText";

const MS_IN_SEC: number = 1000;
const NUM_PHASES = 4;

interface BreathingAnimationProps {
    inDuration?: number;
    holdInDuration?: number;
    outDuration?: number;
    holdOutDuration?: number;
}

/** Animation that demonstrates the box breathing technique
 *
 * @property {number} [inDuration=4] How long the dot takes to move along the
 * left side of the box in seconds, i.e. the breathe in duration
 * @property {number} [holdInDuration=4] How long the dot takes to move along
 * the top of the box in seconds, i.e. the hold breath in duration
 * @property {number} [outDuration=4] How long the dot takes to move along the
 * right side of the box in seconds, i.e. the breathe out duration
 * @property {number} [holdOutDuration=4] How long the dot takes to move along
 * the bottom of the box in seconds, i.e. the hold breath out duration
 * @returns {React.ReactElement}
 *
 * @example
 * // Default settings
 * <BreathingAnimation />
 *
 * @example
 * // Customized parameters
 * <BreathingAnimation
 *     inDuration={3}
 *     holdInDuration={2}
 *     outDuration={5}
 *     holdOutDuration={2}
 * />
 */
function BreathingAnimation({
    inDuration = 4,
    holdInDuration = 4,
    outDuration = 4,
    holdOutDuration = 4,
}: BreathingAnimationProps): React.ReactElement {
    // set phase cycle
    const [phase, setPhase] = useState(-1); // starting with an "invalid" value
    // allows elements to start in default positions without a CSS subclass
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        const phases: number[] = [
            inDuration,
            holdInDuration,
            outDuration,
            holdOutDuration,
        ];
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const nextPhase: number = (phase + 1) % NUM_PHASES;
            setPhase(nextPhase);
        }, phases[phase] * MS_IN_SEC);

        // Cleanup function
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [phase, inDuration, holdInDuration, outDuration, holdOutDuration]);

    // set transition style
    const transitionStyles: React.CSSProperties = {
        "--in-duration": inDuration,
        "--hold-in-duration": holdInDuration,
        "--out-duration": outDuration,
        "--hold-out-duration": holdOutDuration,
        "--transition-timing-function": "cubic-bezier(0.4, 0.1, 0.6, 0.9)",
    } as React.CSSProperties;

    return (
        <div
            className="BreathingAnimationContainer"
            data-testid="breathing-animation"
        >
            <div className="BreathingAnimationBox">
                <div
                    className={`BreathingAnimationGradient ${((): string => {
                        switch (phase) {
                            case 0:
                                return "in";
                            case 1:
                                return "in";
                            case 2:
                                return "out";
                            case 3:
                                return "out";
                            default:
                                return "";
                        }
                    })()}`}
                    style={transitionStyles}
                ></div>
                <BreathingAnimationText
                    text={"BREATHE IN"}
                    activePhase={0}
                    currentPhase={phase}
                    totalPhases={NUM_PHASES}
                />
                <BreathingAnimationText
                    text={"HOLD"}
                    activePhase={1}
                    currentPhase={phase}
                    totalPhases={NUM_PHASES}
                />
                <BreathingAnimationText
                    text={"BREATHE OUT"}
                    activePhase={2}
                    currentPhase={phase}
                    totalPhases={NUM_PHASES}
                />
                <BreathingAnimationText
                    text={"HOLD"}
                    activePhase={3}
                    currentPhase={phase}
                    totalPhases={NUM_PHASES}
                />
                <div
                    className={`BreathingAnimationDot phase${phase}`}
                    style={transitionStyles}
                ></div>
            </div>
        </div>
    );
}

export default BreathingAnimation;
