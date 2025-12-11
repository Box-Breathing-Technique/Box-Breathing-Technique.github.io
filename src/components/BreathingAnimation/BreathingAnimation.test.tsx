/**
 * @file BreathingAnimation.test.tsx
 * @module BreathingAnimation
 * @author Joshua Linehan
 */

import React from "react";
import {
    act,
    render,
    screen,
    fireEvent,
    waitFor,
} from "@testing-library/react";
import BreathingAnimation, { startDelay } from "./BreathingAnimation";
import { MS_IN_SEC } from "../../constants";
import { BreathingAnimationRef } from "./BreathingAnimation.types";
import { DEFAULT_BREATH_DURATION } from "../../utils";

const phase0Class = "phase0";
const phase1Class = "phase1";
const phase2Class = "phase2";
const phase3Class = "phase3";
const startButtonText = "START";

jest.useFakeTimers();

describe("BreathingAnimation", () => {
    beforeEach(() => {
        jest.clearAllTimers();
        jest.resetAllMocks();
    });

    it("should render without crashing", () => {
        render(<BreathingAnimation />);
        expect(screen.getByTestId("breathing-animation")).toBeInTheDocument();
    });

    it("should render all subcomponents", () => {
        render(<BreathingAnimation />);
        expect(screen.getByText("BREATHE IN")).toBeInTheDocument();
        expect(screen.getAllByText("HOLD").pop()).toBeInTheDocument();
        expect(screen.getByText("BREATHE OUT")).toBeInTheDocument();
    });

    it("should start in inactive state", () => {
        render(<BreathingAnimation />);
        expect(screen.getByText(startButtonText)).toBeInTheDocument();
    });

    it("should trigger start animation when start button is clicked", () => {
        render(<BreathingAnimation />);
        const dot: HTMLElement = screen
            .getByTestId("breathing-animation")
            .querySelector(".BreathingAnimationDot")!;
        expect(dot).toHaveClass("hidden");

        act(() => {
            fireEvent.click(screen.getByText(startButtonText));
            jest.advanceTimersByTime(startDelay * MS_IN_SEC);
        });

        expect(dot).not.toHaveClass("hidden");
    });

    it("should cycle through all breathing phases", () => {
        const ref = React.createRef<BreathingAnimationRef>();
        render(<BreathingAnimation ref={ref} />);

        const startButton: HTMLElement = screen.getByText(startButtonText);
        act(() => {
            // click start button
            fireEvent.click(startButton);
            // advance through start delay
            jest.advanceTimersByTime(startDelay * MS_IN_SEC);
        });

        // Test each phase transition with appropriate timing
        const dot: HTMLElement = screen
            .getByTestId("breathing-animation")
            .querySelector(".BreathingAnimationDot")!;
        act(() => {
            jest.advanceTimersByTime(DEFAULT_BREATH_DURATION * MS_IN_SEC);
        });
        expect(dot).toHaveClass(phase0Class);
        act(() => {
            jest.advanceTimersByTime(DEFAULT_BREATH_DURATION * MS_IN_SEC);
        });
        expect(dot).toHaveClass(phase1Class);
        act(() => {
            jest.advanceTimersByTime(DEFAULT_BREATH_DURATION * MS_IN_SEC);
        });
        expect(dot).toHaveClass(phase2Class);
        act(() => {
            jest.advanceTimersByTime(DEFAULT_BREATH_DURATION * MS_IN_SEC);
        });
        expect(dot).toHaveClass(phase3Class);
        act(() => {
            jest.advanceTimersByTime(DEFAULT_BREATH_DURATION * MS_IN_SEC);
        });
        expect(dot).toHaveClass(phase0Class);
    });

    it("should expose reset method", () => {
        const ref = React.createRef<BreathingAnimationRef>();
        render(<BreathingAnimation ref={ref} />);

        const startButton: HTMLElement = screen.getByText(startButtonText);
        act(() => {
            // click start button
            fireEvent.click(startButton);
            // advance through start delay
            jest.advanceTimersByTime(startDelay * MS_IN_SEC);
        });

        expect(startButton).toHaveClass("start-triggered");

        act(() => {
            ref.current?.reset();
        });
        expect(startButton).not.toHaveClass("start-triggered");
    });

    it("should allow duration configuration", async () => {
        const ref = React.createRef<BreathingAnimationRef>();
        render(<BreathingAnimation ref={ref} />);

        const inDuration = 0.32;
        const holdInDuration = 0.3;
        const outDuration = 0.25;
        const holdOutDuration = 0.1;
        const gradientColor = "red";

        // Set the durations first
        act(() => {
            ref.current?.setInDuration(inDuration);
            ref.current?.setHoldInDuration(holdInDuration);
            ref.current?.setOutDuration(outDuration);
            ref.current?.setHoldOutDuration(holdOutDuration);
            ref.current?.setGradientColor(gradientColor);
        });

        const startButton: HTMLElement = screen.getByText(startButtonText);

        // Start the animation
        fireEvent.click(startButton);

        // Wait for the start delay to complete
        await act(async () => {
            jest.advanceTimersByTime(startDelay * MS_IN_SEC);
            // Allow React to process any state updates
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        const dot: HTMLElement = screen
            .getByTestId("breathing-animation")
            .querySelector(".BreathingAnimationDot")!;

        // The component should now be active and in some phase
        // Let's wait a bit for any initial transitions to settle
        await act(async () => {
            // Small advance to trigger any pending phase setup
            jest.advanceTimersByTime(1);
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Now test the phase transitions with the custom durations
        // Phase transition to phase 1
        await act(async () => {
            jest.advanceTimersByTime(inDuration * MS_IN_SEC);
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        await waitFor(() => {
            expect(dot).toHaveClass(phase1Class);
        });

        // Phase transition to phase 2
        await act(async () => {
            jest.advanceTimersByTime(holdInDuration * MS_IN_SEC);
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        await waitFor(() => {
            expect(dot).toHaveClass(phase2Class);
        });

        // Phase transition to phase 3
        await act(async () => {
            jest.advanceTimersByTime(outDuration * MS_IN_SEC);
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        await waitFor(() => {
            expect(dot).toHaveClass(phase3Class);
        });

        // Phase transition back to phase 0
        await act(async () => {
            jest.advanceTimersByTime(holdOutDuration * MS_IN_SEC);
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        await waitFor(() => {
            expect(dot).toHaveClass(phase0Class);
        });

        // Verify gradient color
        expect(
            screen
                .getByTestId("breathing-animation")
                .querySelector(".BreathingAnimationGradient"),
        ).toHaveStyle(`--gradient-color: ${gradientColor}`);
    });

    it("should clear timeouts on unmount", () => {
        const { unmount } = render(<BreathingAnimation />);

        act(() => {
            fireEvent.click(screen.getByText("START"));

            unmount();

            jest.advanceTimersByTime(startDelay * MS_IN_SEC);
        });

        expect(jest.getTimerCount()).toBe(0);
    });

    it("should clear timeouts on reset", () => {
        const ref = React.createRef<BreathingAnimationRef>();
        render(<BreathingAnimation ref={ref} />);

        act(() => {
            fireEvent.click(screen.getByText("START"));
            ref.current?.reset();
        });

        expect(jest.getTimerCount()).toBe(0);
    });

    it("should apply correct CSS custom properties", () => {
        const ref = React.createRef<BreathingAnimationRef>();
        const component = <BreathingAnimation ref={ref} />;
        const { rerender } = render(component);

        act(() => {
            ref.current?.setInDuration(3);
            ref.current?.setGradientColor("#00ff00");
        });

        rerender(component);

        const gradient = screen
            .getByTestId("breathing-animation")
            .querySelector(".BreathingAnimationGradient");
        expect(gradient).toHaveStyle("--in-duration: 3");
        expect(gradient).toHaveStyle("--gradient-color: #00ff00");
    });
});
