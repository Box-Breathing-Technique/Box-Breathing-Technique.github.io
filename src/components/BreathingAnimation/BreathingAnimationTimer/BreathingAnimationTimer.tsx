/**
 * @file BreathingAnimationTimer.tsx
 * @module BreathingAnimationTimer
 * @author Joshua Linehan
 */

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import "./BreathingAnimationTimer.css";
import {
    MIN_IN_HR,
    MS_IN_HR,
    MS_IN_MIN,
    MS_IN_SEC,
    SEC_IN_MIN,
} from "../../../constants";
import { BreathingAnimationTimerRef } from "../BreathingAnimation.types";

export const testId: string = "breathing-animation-timer";

const START_TEXT: string = "00:00:00";

interface BreathingAnimationTimerProps {
    hidden: boolean;
}

/**
 * @returns {React.ReactElement}
 */
function BreathingAnimationTimer(
    { hidden }: BreathingAnimationTimerProps,
    ref: React.Ref<BreathingAnimationTimerRef>,
): React.ReactElement {
    const [timerStart, setTimerStart] = useState<number>(Date.now());
    const [timerText, setTimerText] = useState<string>(START_TEXT);
    const [active, setActive] = useState<boolean>(false);

    const start: () => void = () => {
        setTimerStart(Date.now());
        setActive(true);
    };

    const reset: () => void = () => {
        setActive(false);
        setTimerText(START_TEXT);
    };

    useEffect(() => {
        let interval = setInterval(() => {
            if (active) {
                const duration: number = Date.now() - timerStart;
                setTimerText(
                    `${`${Math.floor(duration / MS_IN_HR)}`.padStart(2, "0")}:${`${Math.floor(duration / MS_IN_MIN) % MIN_IN_HR}`.padStart(2, "0")}:${`${Math.floor(duration / MS_IN_SEC) % SEC_IN_MIN}`.padStart(2, "0")}`,
                );
            }
        }, 1 * MS_IN_SEC);
        // Cleanup function
        return () => {
            clearInterval(interval ?? undefined);
        };
    }, [timerStart, active]);

    useImperativeHandle(ref, () => ({
        start,
        reset,
    }));

    return (
        <div
            className={`BreathingAnimationTimer ${hidden ? "hidden" : ""}`}
            data-testid={testId}
        >
            {timerText}
        </div>
    );
}

export default forwardRef(BreathingAnimationTimer);
