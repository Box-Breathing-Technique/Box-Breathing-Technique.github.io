/**
 * @file BreathingAnimation.test.tsx
 * @module BreathingAnimation
 * @author Joshua Linehan
 */

import React from "react";
import { act, render, screen, fireEvent } from "@testing-library/react";
import BreathingAnimation, { startDelay } from "./BreathingAnimation";
import { MS_IN_SEC } from "../../constants";

const phase0Class = "phase0";
const phase1Class = "phase1";
const phase2Class = "phase2";
const phase3Class = "phase3";

jest.useFakeTimers();

describe("BreathingAnimation", () => {
    beforeEach(() => {
        jest.clearAllTimers();
        jest.resetAllMocks();
    });

    it("renders without crashing", () => {
        render(<BreathingAnimation />);
        expect(screen.getByTestId("breathing-animation")).toBeInTheDocument();
    });

    it("renders with custom durations", () => {
        render(
            <BreathingAnimation
                inDuration={3}
                holdInDuration={2}
                outDuration={5}
                holdOutDuration={1}
            />,
        );
        expect(screen.getByTestId("breathing-animation")).toBeInTheDocument();
    });

    it("has correct class in initial phase", () => {
        render(<BreathingAnimation />);
        const dot: HTMLElement = screen
            .getByTestId("breathing-animation")
            .querySelector(".BreathingAnimationDot")!;
        expect(dot).not.toHaveClass(phase0Class);
        expect(dot).not.toHaveClass(phase1Class);
        expect(dot).not.toHaveClass(phase2Class);
        expect(dot).not.toHaveClass(phase3Class);
        expect(dot).toHaveClass("hidden");
    });

    it("should start phase transitions when start button is clicked", () => {
        const durationS: number = 0.1;
        const durationMs: number = 100;
        render(
            <BreathingAnimation
                inDuration={durationS}
                holdInDuration={durationS}
                outDuration={durationS}
                holdOutDuration={durationS}
            />,
        );
        const dot: HTMLElement = screen
            .getByTestId("breathing-animation")
            .querySelector(".BreathingAnimationDot")!;

        const startButton: HTMLElement = screen.getByRole("button");
        act(() => {
            // click start button
            fireEvent.click(startButton);
            // advance through start delay
            jest.advanceTimersByTime(startDelay * MS_IN_SEC);
        });

        // advance past start phase
        act(() => {
            jest.advanceTimersByTime(durationMs);
        });

        expect(dot).toHaveClass(phase0Class);
    });

    it("transitions through phases correctly", () => {
        const durationS: number = 0.1;
        const durationMs: number = 100;
        render(
            <BreathingAnimation
                inDuration={durationS}
                holdInDuration={durationS}
                outDuration={durationS}
                holdOutDuration={durationS}
            />,
        );
        const dot: HTMLElement = screen
            .getByTestId("breathing-animation")
            .querySelector(".BreathingAnimationDot")!;

        const startButton: HTMLElement = screen.getByRole("button");
        act(() => {
            // click start button
            fireEvent.click(startButton);
            // advance through start delay
            jest.advanceTimersByTime(startDelay * MS_IN_SEC);
        });

        // phase -1 to phase 0
        act(() => {
            jest.advanceTimersByTime(durationMs);
        });

        expect(dot).toHaveClass(phase0Class);

        // phase 0 to phase 1
        act(() => {
            jest.advanceTimersByTime(durationMs);
        });

        expect(dot).toHaveClass(phase1Class);

        // phase 1 to phase 2
        act(() => {
            jest.advanceTimersByTime(durationMs);
        });

        expect(dot).toHaveClass(phase2Class);

        // phase 2 to phase 3
        act(() => {
            jest.advanceTimersByTime(durationMs);
        });

        expect(dot).toHaveClass(phase3Class);

        // phase 3 to phase 0
        act(() => {
            jest.advanceTimersByTime(durationMs);
        });

        expect(dot).toHaveClass(phase0Class);
    });
});
