/**
 * @file BreathingAnimation.tsx
 * @module BreathingAnimation
 * @author Joshua Linehan
 */

import React, { useEffect, useRef } from "react";
import "./BreathingAnimation.css";

interface BreathingAnimationProps {
    inDuration?: number;
    holdInDuration?: number;
    outDuration?: number;
    holdOutDuration?: number;
}

/** Animation that demonstrates the box breathing technique
 *
 * @property {number} [inDuration=4] How long the dot takes to move along the
 * left side of the box, i.e. the breathe in duration
 * @property {number} [holdInDuration=4] How long the dot takes to move along
 * the top of the box, i.e. the hold breath in duration
 * @property {number} [outDuration=4] How long the dot takes to move along the
 * right side of the box, i.e. the breathe out duration
 * @property {number} [holdOutDuration=4] How long the dot takes to move along
 * the bottom of the box, i.e. the hold breath out duration
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
    // calculate percentages for animation
    const animationDuration: number =
        inDuration + holdInDuration + outDuration + holdOutDuration;
    const inPercentage: number = inDuration / animationDuration;
    const holdInPercentage: number =
        holdInDuration / animationDuration + inPercentage;
    const outPercentage: number =
        outDuration / animationDuration + holdInPercentage;

    // set dot animation
    const animationTimingFunction: string = "cubic-bezier(0.4, 0.1, 0.6, 0.9)";
    const dotRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const dot = dotRef.current;
        if (!dot) return;
        const keyframes: Keyframe[] = [
            {
                top: "100%",
                left: "0%",
                easing: animationTimingFunction,
                offset: 0,
            },
            {
                top: "0%",
                left: "0%",
                easing: animationTimingFunction,
                offset: inPercentage,
            },
            {
                top: "0%",
                left: "100%",
                easing: animationTimingFunction,
                offset: holdInPercentage,
            },
            {
                top: "100%",
                left: "100%",
                easing: animationTimingFunction,
                offset: outPercentage,
            },
            {
                top: "100%",
                left: "0%",
                easing: animationTimingFunction,
                offset: 1,
            },
        ];

        const animation = dot.animate(keyframes, {
            duration: animationDuration * 1000,
            iterations: Infinity,
            easing: "linear",
        });

        // cleanup
        return () => {
            animation.cancel();
        };
    });

    // set gradient animation
    const gradientRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const gradient = gradientRef.current;
        if (!gradient) return;
        const keyframes: Keyframe[] = [
            {
                height: "0%",
                easing: animationTimingFunction,
                offset: 0,
            },
            {
                height: "100%",
                easing: animationTimingFunction,
                offset: inPercentage,
            },
            {
                height: "100%",
                easing: animationTimingFunction,
                offset: holdInPercentage,
            },
            {
                height: "0%",
                easing: animationTimingFunction,
                offset: outPercentage,
            },
            {
                height: "0%",
                easing: animationTimingFunction,
                offset: 1,
            },
        ];

        const animation = gradient.animate(keyframes, {
            duration: animationDuration * 1000,
            iterations: Infinity,
            easing: "linear",
        });

        // cleanup
        return () => {
            animation.cancel();
        };
    });

    return (
        <div
            className="BreathingAnimationContainer"
            data-testid="breathing-animation"
        >
            <div className="BreathingAnimationBox">
                <div
                    className="BreathingAnimationGradient"
                    ref={gradientRef}
                ></div>
                <div
                    className="BreathingAnimationDot"
                    ref={dotRef}
                ></div>
            </div>
        </div>
    );
}

export default BreathingAnimation;
