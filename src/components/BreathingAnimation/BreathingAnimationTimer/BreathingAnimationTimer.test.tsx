/**
 * @file BreathingAnimationTimer.test.tsx
 * @module BreathingAnimationTimer
 * @author Joshua Linehan
 */

import React from "react";
import { render, screen, act } from "@testing-library/react";
import BreathingAnimationTimer, { testId } from "./BreathingAnimationTimer";
import { BreathingAnimationTimerRef } from "../BreathingAnimation.types";
import { MS_IN_HR, MS_IN_MIN, MS_IN_SEC } from "../../../constants";

describe("BreathingAnimationTimer", () => {
    let ref: React.RefObject<BreathingAnimationTimerRef | null>;
    const START_TEXT = "00:00:00";

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));
        ref = React.createRef<BreathingAnimationTimerRef>();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    it("renders correctly", () => {
        const { rerender } = render(
            <BreathingAnimationTimer
                hidden={false}
                ref={ref}
            />,
        );
        const timer = screen.getByTestId(testId);
        expect(timer).toBeInTheDocument();
        expect(screen.getByText(START_TEXT)).toBeInTheDocument();
        expect(timer).not.toHaveClass("hidden");
        // check hidden parameter works
        rerender(
            <BreathingAnimationTimer
                hidden={true}
                ref={ref}
            />,
        );
        expect(timer).toHaveClass("hidden");
    });

    it("exposes methods from ref", () => {
        render(
            <BreathingAnimationTimer
                hidden={false}
                ref={ref}
            />,
        );
        expect(ref.current?.start).toBeDefined();
        expect(typeof ref.current?.start).toBe("function");
        expect(ref.current?.reset).toBeDefined();
        expect(typeof ref.current?.reset).toBe("function");
    });

    it("displays correct time", () => {
        render(
            <BreathingAnimationTimer
                hidden={false}
                ref={ref}
            />,
        );

        // initial time is correct
        expect(screen.getByText(START_TEXT)).toBeInTheDocument();

        // time is correct before timers advance
        act(() => {
            ref.current?.start();
        });
        expect(screen.getByText(START_TEXT)).toBeInTheDocument();

        // displays correct time at different intervals
        act(() => {
            jest.advanceTimersByTime(1 * MS_IN_SEC);
        });
        expect(screen.getByText("00:00:01")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(59 * MS_IN_SEC);
        });
        expect(screen.getByText("00:01:00")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(59 * MS_IN_MIN);
        });
        expect(screen.getByText("01:00:00")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(61 * MS_IN_SEC);
        });
        expect(screen.getByText("01:01:01")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(10 * MS_IN_HR);
        });
        expect(screen.getByText("11:01:01")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(100 * MS_IN_HR);
        });
        expect(screen.getByText("111:01:01")).toBeInTheDocument();
    });

    it("resets timer correctly", () => {
        render(
            <BreathingAnimationTimer
                hidden={false}
                ref={ref}
            />,
        );

        // timer moves off of start text
        act(() => {
            ref.current?.start();
        });
        act(() => {
            jest.advanceTimersByTime(10 * MS_IN_SEC);
        });
        expect(screen.queryByText(START_TEXT)).not.toBeInTheDocument();

        // start text is present after reset
        act(() => {
            ref.current?.reset();
        });
        expect(screen.getByText(START_TEXT)).toBeInTheDocument();

        // start text still present while timer has not been restarted
        act(() => {
            jest.advanceTimersByTime(10 * MS_IN_SEC);
        });
        expect(screen.getByText(START_TEXT)).toBeInTheDocument();

        // start text gone after time is restarted
        act(() => {
            ref.current?.start();
        });
        act(() => {
            jest.advanceTimersByTime(10 * MS_IN_SEC);
        });
        expect(screen.queryByText(START_TEXT)).not.toBeInTheDocument();
    });

    it("clears interval on unmount", () => {
        const { unmount } = render(
            <BreathingAnimationTimer
                hidden={false}
                ref={ref}
            />,
        );
        act(() => {
            ref.current?.start();
        });
        const clearIntervalSpy = jest.spyOn(global, "clearInterval");
        unmount();
        expect(clearIntervalSpy).toHaveBeenCalled();
        clearIntervalSpy.mockRestore();
    });
});
