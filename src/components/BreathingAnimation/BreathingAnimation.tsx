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
    BreathingAnimationTimerRef,
    NUM_PHASES,
    Phase,
    START_PHASE,
} from "./BreathingAnimation.types";
import BreathingAnimationStart from "./BreathingAnimationStart";
import { MS_IN_SEC } from "../../constants";
import { DEFAULT_BREATH_DURATION, DEFAULT_COLOUR } from "../../utils";
import BreathingAnimationTimer from "./BreathingAnimationTimer";

export const startDelay: number = 1.5;

/** Animation that demonstrates the box breathing technique. Controls state of
 * subcomponents
 *
 * @param {React.Ref<BreathingAnimationRef>} ref Ref object to access
 * internal functions
 * @returns {React.ReactElement}
 *
 * @example
 * // Default settings
 * <BreathingAnimation />
 */
function BreathingAnimation(
    _props: {},
    ref: React.Ref<BreathingAnimationRef>,
): React.ReactElement {
    const timerRef = useRef<BreathingAnimationTimerRef>(null);
    // set phase cycle
    const [phase, setPhase] = useState<Phase>(START_PHASE); /* starting with an
    "invalid" value allows elements to start in default positions without a CSS
    subclass */
    const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [active, setActive] = useState<boolean>(false);

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
    const [gradientColor, setGradientColor] = useState<string>(DEFAULT_COLOUR);

    // handle timer functions
    const [timerHidden, setTimerHidden] = useState<boolean>(true);
    const getTimerHidden: () => boolean = () => timerHidden;

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
        // reset timer
        timerRef.current?.reset();
    };

    // generate ref
    const textContainerRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => ({
        reset,
        textContainerRef,
        setInDuration,
        setHoldInDuration,
        setOutDuration,
        setHoldOutDuration,
        setGradientColor,
        setTimerHidden,
        getTimerHidden,
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
                                timerRef.current?.start();
                            }, startDelay * MS_IN_SEC);
                        }}
                        startTriggered={startTriggered}
                        startDelay={startDelay}
                    />
                    <BreathingAnimationTimer
                        ref={timerRef}
                        hidden={timerHidden}
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
