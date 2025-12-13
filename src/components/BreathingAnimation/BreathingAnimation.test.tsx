/**
 * @file BreathingAnimation.test.tsx
 * @module BreathingAnimation
 * @author Joshua Linehan
 */

import React from "react";
import { act, render, screen, fireEvent } from "@testing-library/react";
import BreathingAnimation, { startDelay } from "./BreathingAnimation";
import { MS_IN_SEC } from "../../constants";
import { BreathingAnimationRef } from "./BreathingAnimation.types";
import { DEFAULT_BREATH_DURATION } from "../../utils";

const START_BUTTON_TEXT: string = "START";

describe("BreathingAnimation", () => {
    let ref: React.RefObject<BreathingAnimationRef | null>;

    beforeEach(() => {
        jest.useFakeTimers();
        ref = React.createRef<BreathingAnimationRef>();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    it("renders the component", () => {
        render(<BreathingAnimation ref={ref} />);
        expect(screen.getByTestId("breathing-animation")).toBeInTheDocument();
        expect(screen.getByText("BREATHE IN")).toBeInTheDocument();
        expect(screen.getAllByText("HOLD")).toHaveLength(2);
        expect(screen.getByText("BREATHE OUT")).toBeInTheDocument();
    });

    it("cycles through phases correctly", () => {
        render(<BreathingAnimation ref={ref} />);
        const dot: HTMLElement = screen
            .getByTestId("breathing-animation")
            .querySelector(".BreathingAnimationDot")!;

        // initial phase
        expect(dot).toHaveClass("phase-1");

        // starts transitions
        const startButton = screen.getByText(START_BUTTON_TEXT);
        act(() => {
            fireEvent.click(startButton);
            jest.advanceTimersByTime(startDelay * MS_IN_SEC);
        });
        expect(dot).toHaveClass("phase-1");

        // phase 0
        act(() => {
            jest.advanceTimersByTime(DEFAULT_BREATH_DURATION * MS_IN_SEC);
        });
        expect(dot).toHaveClass("phase0");

        // phase 1
        act(() => {
            jest.advanceTimersByTime(DEFAULT_BREATH_DURATION * MS_IN_SEC);
        });
        expect(dot).toHaveClass("phase1");

        // phase 2
        act(() => {
            jest.advanceTimersByTime(DEFAULT_BREATH_DURATION * MS_IN_SEC);
        });
        expect(dot).toHaveClass("phase2");

        // phase 3
        act(() => {
            jest.advanceTimersByTime(DEFAULT_BREATH_DURATION * MS_IN_SEC);
        });
        expect(dot).toHaveClass("phase3");

        // returns to start phase
        act(() => {
            jest.advanceTimersByTime(DEFAULT_BREATH_DURATION * MS_IN_SEC);
        });
        expect(dot).toHaveClass("phase0");
    });

    it("exposes ref methods", () => {
        render(<BreathingAnimation ref={ref} />);
        expect(ref.current?.reset).toBeDefined();
        expect(ref.current?.setInDuration).toBeDefined();
        expect(ref.current?.setHoldInDuration).toBeDefined();
        expect(ref.current?.setOutDuration).toBeDefined();
        expect(ref.current?.setHoldOutDuration).toBeDefined();
        expect(ref.current?.setGradientColor).toBeDefined();
        expect(ref.current?.setTimerHidden).toBeDefined();
        expect(ref.current?.getTimerHidden).toBeDefined();
        expect(ref.current?.textContainerRef).toBeDefined();
    });

    it("resets to initial state", async () => {
        render(<BreathingAnimation ref={ref} />);

        // start animation
        const startButton = screen.getByText(START_BUTTON_TEXT);

        act(() => {
            fireEvent.click(startButton);
            jest.advanceTimersByTime(
                startDelay + DEFAULT_BREATH_DURATION * MS_IN_SEC,
            );
            // reset animation
            ref.current?.reset();
        });

        const dot: HTMLElement = screen
            .getByTestId("breathing-animation")
            .querySelector(".BreathingAnimationDot")!;
        expect(dot).toHaveClass("hidden");
        expect(dot).toHaveClass("phase-1");
    });

    it("resets to initial state during start delay", async () => {
        render(<BreathingAnimation ref={ref} />);

        const startButton = screen.getByText(START_BUTTON_TEXT);

        // reset before start delay completes
        act(() => {
            fireEvent.click(startButton);
            ref.current?.reset();
        });

        // advance past start delay
        act(() => {
            jest.advanceTimersByTime(startDelay * 10 * MS_IN_SEC);
        });
        expect(screen.getByText(START_BUTTON_TEXT)).toBeInTheDocument();
    });

    it("hides and shows timer", () => {
        render(<BreathingAnimation ref={ref} />);
        // hide timer
        act(() => {
            ref.current?.setTimerHidden(false);
        });
        expect(ref.current?.getTimerHidden()).toBe(false);
        // show timer
        act(() => {
            ref.current?.setTimerHidden(true);
        });
        expect(ref.current?.getTimerHidden()).toBe(true);
    });
});
