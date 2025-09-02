/**
 * @file BreathingAnimation.tsx
 * @module BreathingAnimation
 * @author Joshua Linehan
 */

import React from "react";
import "./BreathingAnimation.css";

/** Animation that demonstrates the box breathing technique
 * @returns {React.ReactElement}
 */
function BreathingAnimation(): React.ReactElement {
    return (
        <div
            className="BreathingAnimationContainer"
            data-testid="breathing-animation"
        >
            <div className="BreathingAnimationBox">
                <div className="BreathingAnimationDot"></div>
            </div>
        </div>
    );
}

export default BreathingAnimation;
