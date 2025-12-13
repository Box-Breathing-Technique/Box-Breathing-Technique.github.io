/**
 * @file BreathingAnimationStart.tsx
 * @module BreathingAnimationStart
 * @author Joshua Linehan
 */

import React from "react";
import "./BreathingAnimationStart.css";

export const testId: string = "breathing-animation-start";

interface BreathingAnimationStartProps {
    startAnimation: () => void;
    startTriggered: boolean;
    startDelay: number;
}
/** Button that starts the breathing animation
 *
 * @property {() => void} startAnimation The function called when the when the
 * button is pressed, should be used to trigger start of the animation
 * @property {boolean} startTriggered if the start has been triggered, should be
 *  set in parent using useState. Used to set CSS class
 * @property {number} startDelay The time in seconds until the animation starts
 * after the start button is pressed. Should be consistent with other elements.
 * Used to set transition durations
 * @returns {React.ReactElement}
 *
 * @example
 * // Start button featuring state variables for start triggered and animation active
 * const [startTriggered, setStartTriggered] = useState<boolean>(false);
 * const [active, setActive] = useState<boolean>(false);
 * const startDelay: number = 1.5;
 * <BreathingAnimationStart
 *     startAnimation={() => {
 *         setStartTriggered(true);
 *         setTimeout(() => {
 *             setActive(true);
 *         }, startDelay * MS_IN_SEC);
 *     }}
 *     startTriggered={startTriggered}
 *     startDelay={startDelay}
 * />
 */
function BreathingAnimationStart({
    startAnimation,
    startTriggered,
    startDelay,
}: BreathingAnimationStartProps): React.ReactElement {
    const style: React.CSSProperties = {
        "--start-delay": startDelay,
    } as React.CSSProperties;
    return (
        <button
            className={`BreathingAnimationStart ${
                startTriggered ? "start-triggered" : ""
            }`}
            data-testid="breathing-animation-start"
            onClick={startAnimation}
            style={style}
        >
            START
        </button>
    );
}

export default BreathingAnimationStart;
