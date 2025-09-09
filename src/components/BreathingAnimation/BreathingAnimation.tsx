/**
 * @file BreathingAnimation.tsx
 * @module BreathingAnimation
 * @author Joshua Linehan
 */

import React, {
    useEffect,
    useState,
    useRef,
    useImperativeHandle,
    forwardRef,
    RefObject,
} from "react";
import "./BreathingAnimation.css";
import BreathingAnimationText from "./BreathingAnimationText";
import {
    BreathingAnimationRef,
    NUM_PHASES,
    Phase,
    START_PHASE,
} from "./BreathingAnimation.types";
import BreathingAnimationStart from "./BreathingAnimationStart";
import { MS_IN_SEC } from "../../constants";

export const startDelay: number = 1.5;

interface BreathingAnimationProps {
    inDuration?: number;
    holdInDuration?: number;
    outDuration?: number;
    holdOutDuration?: number;
    gradientColor?: string;
}

/** Animation that demonstrates the box breathing technique. Controls state of
 * subcomponents
 *
 * @property {number} [inDuration=4] How long the dot takes to move along the
 * left side of the box in seconds, i.e. the breathe in duration
 * @property {number} [holdInDuration=4] How long the dot takes to move along
 * the top of the box in seconds, i.e. the hold breath in duration
 * @property {number} [outDuration=4] How long the dot takes to move along the
 * right side of the box in seconds, i.e. the breathe out duration
 * @property {number} [holdOutDuration=4] How long the dot takes to move along
 * the bottom of the box in seconds, i.e. the hold breath out duration
 * @property {string} [gradientColor] The value --gradient-color is set to in
 * CSS. Determines color of breathing animation.
 * @property {React.Ref<BreathingAnimationRef>} ref Ref object to access
 * internal functions
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
 *     gradientColor={white}
 * />
 *
 * @example
 * // With ref to reset function
 * const resetRef = useRef<BreathingAnimationResetRef>(null);
 * <BreathingAnimation ref={resetRef} />
 */
function BreathingAnimation(
    {
        inDuration = 4,
        holdInDuration = 4,
        outDuration = 4,
        holdOutDuration = 4,
        gradientColor,
    }: BreathingAnimationProps,
    ref: React.Ref<BreathingAnimationRef>,
): React.ReactElement {
    // set phase cycle
    const [phase, setPhase] = useState<Phase>(START_PHASE); /* starting with an
    "invalid" value allows elements to start in default positions without a CSS
    subclass */
    const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        if (!active) {
            return;
        }

        const phases: number[] = [
            inDuration,
            holdInDuration,
            outDuration,
            holdOutDuration,
        ];

        if (phaseTimeoutRef.current) {
            clearTimeout(phaseTimeoutRef.current);
        }

        phaseTimeoutRef.current = setTimeout(() => {
            const nextPhase: Phase = ((phase + 1) % NUM_PHASES) as Phase;
            setPhase(nextPhase);
        }, phases[phase] * MS_IN_SEC);

        // Cleanup function
        return () => {
            clearTimeout(phaseTimeoutRef.current ?? undefined);
        };
    }, [
        phase,
        active,
        inDuration,
        holdInDuration,
        outDuration,
        holdOutDuration,
    ]);

    // set up start transition
    const [startTriggered, setStartTriggered] = useState<boolean>(false);
    const activeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // reset to start
    const reset = (): void => {
        // clear timeouts
        clearTimeout(activeTimeoutRef.current ?? undefined);
        clearTimeout(phaseTimeoutRef.current ?? undefined);
        // reset state variables
        setStartTriggered(false);
        setActive(false);
        setPhase(START_PHASE);
    };

    // expose reset and text container via ref
    const textContainerRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => ({
        reset: reset,
        textContainerRef: textContainerRef,
    }));

    // set phase transition style
    const phaseTransitionStyle: React.CSSProperties = {
        "--in-duration": inDuration,
        "--hold-in-duration": holdInDuration,
        "--out-duration": outDuration,
        "--hold-out-duration": holdOutDuration,
        "--transition-timing-function": "cubic-bezier(0.4, 0.1, 0.6, 0.9)",
    } as React.CSSProperties;

    // set start transition style
    const startStyle: React.CSSProperties = {
        "--start-delay": startDelay,
    } as React.CSSProperties;

    // set gradient colour
    const gradientStyle: React.CSSProperties = {
        "--gradient-color": gradientColor,
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
                    style={{ ...phaseTransitionStyle, ...gradientStyle }}
                ></div>
                <div
                    className="BreathingAnimationTextContainer"
                    ref={textContainerRef as RefObject<HTMLDivElement>}
                >
                    <BreathingAnimationText
                        text={"BREATHE\nIN"}
                        activePhase={0}
                        currentPhase={phase}
                    />
                    <BreathingAnimationText
                        text={"HOLD"}
                        activePhase={1}
                        currentPhase={phase}
                    />
                    <BreathingAnimationText
                        text={"BREATHE\nOUT"}
                        activePhase={2}
                        currentPhase={phase}
                    />
                    <BreathingAnimationText
                        text={"HOLD"}
                        activePhase={3}
                        currentPhase={phase}
                    />
                    <BreathingAnimationStart
                        startAnimation={() => {
                            setStartTriggered(true);
                            activeTimeoutRef.current = setTimeout(() => {
                                setActive(true);
                            }, startDelay * MS_IN_SEC);
                        }}
                        startTriggered={startTriggered}
                        startDelay={startDelay}
                    />
                </div>
                <div
                    className={`BreathingAnimationDot phase${phase} ${startTriggered ? "" : "hidden"}`}
                    style={{ ...phaseTransitionStyle, ...startStyle }}
                ></div>
            </div>
        </div>
    );
}

export default forwardRef(BreathingAnimation);
