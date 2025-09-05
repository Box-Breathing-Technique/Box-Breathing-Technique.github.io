/**
 * @file BreathingAnimation.test.tsx
 * @module BreathingAnimation
 * @author Joshua Linehan
 */

import React from "react";
import { act, render, screen } from "@testing-library/react";
import BreathingAnimation from "./BreathingAnimation";

const phase0Class = "phase0";
const phase1Class = "phase1";
const phase2Class = "phase2";
const phase3Class = "phase3";

jest.useFakeTimers();

describe("BreathingAnimation", () => {
    beforeEach(() => {
        jest.clearAllTimers();
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
        const dot = screen
            .getByTestId("breathing-animation")
            .querySelector(".BreathingAnimationDot");
        expect(dot).not.toHaveClass(phase0Class);
        expect(dot).not.toHaveClass(phase1Class);
        expect(dot).not.toHaveClass(phase2Class);
        expect(dot).not.toHaveClass(phase3Class);
    });

    test("transitions through phases correctly", () => {
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

        // phase -1 to phase 0
        act(() => {
            jest.advanceTimersByTime(durationMs);
        });

        expect(
            screen
                .getByTestId("breathing-animation")
                .querySelector(".BreathingAnimationDot"),
        ).toHaveClass(phase0Class);

        // phase 0 to phase 1
        act(() => {
            jest.advanceTimersByTime(durationMs);
        });

        expect(
            screen
                .getByTestId("breathing-animation")
                .querySelector(".BreathingAnimationDot"),
        ).toHaveClass(phase1Class);

        // phase 1 to phase 2
        act(() => {
            jest.advanceTimersByTime(durationMs);
        });

        expect(
            screen
                .getByTestId("breathing-animation")
                .querySelector(".BreathingAnimationDot"),
        ).toHaveClass(phase2Class);

        // phase 2 to phase 3
        act(() => {
            jest.advanceTimersByTime(durationMs);
        });

        expect(
            screen
                .getByTestId("breathing-animation")
                .querySelector(".BreathingAnimationDot"),
        ).toHaveClass(phase3Class);

        // phase 3 to phase 0
        act(() => {
            jest.advanceTimersByTime(durationMs);
        });

        expect(
            screen
                .getByTestId("breathing-animation")
                .querySelector(".BreathingAnimationDot"),
        ).toHaveClass(phase0Class);
    });
});
