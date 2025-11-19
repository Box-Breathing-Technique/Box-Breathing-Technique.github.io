/**
 * @file BreathingAnimation.types.ts
 * @module BreathingAnimation
 * @author Joshua Linehan
 */

import { RefObject } from "react";

export type Phase = -1 | 0 | 1 | 2 | 3;
export const START_PHASE: Phase = -1;
export const NUM_PHASES: number = 4;

export interface BreathingAnimationRef {
    reset: () => void;
    textContainerRef: RefObject<HTMLElement | null>;
    setInDuration: React.Dispatch<React.SetStateAction<number>>;
    setHoldInDuration: React.Dispatch<React.SetStateAction<number>>;
    setOutDuration: React.Dispatch<React.SetStateAction<number>>;
    setHoldOutDuration: React.Dispatch<React.SetStateAction<number>>;
    setGradientColor: React.Dispatch<React.SetStateAction<string>>;
}
