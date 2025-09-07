/**
 * @file BreathingAnimation.types.ts
 * @module BreathingAnimation
 * @author Joshua Linehan
 */

export type Phase = -1 | 0 | 1 | 2 | 3;
export const START_PHASE: Phase = -1;
export const NUM_PHASES: number = 4;

export interface BreathingAnimationResetRef {
    reset: () => void;
}
