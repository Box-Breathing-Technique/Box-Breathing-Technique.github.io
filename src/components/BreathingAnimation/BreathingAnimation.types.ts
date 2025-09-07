/**
 * @file BreathingAnimation.types.ts
 * @module BreathingAnimation
 * @author Joshua Linehan
 *
 * Provides the union type Phase and related constants to control breathing
 * animation phase state
 */

export type Phase = -1 | 0 | 1 | 2 | 3;
export const START_PHASE: Phase = -1;
export const NUM_PHASES: number = 4;
