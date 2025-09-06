/**
 * @file BreathingAnimationStart.test.tsx
 * @module BreathingAnimationStart
 * @author Joshua Linehan
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import BreathingAnimationStart, { testId } from "./BreathingAnimationStart";

describe("BreathingAnimationStart", () => {
    const doNothing = () => {};

    it("renders button with correct text", () => {
        render(
            <BreathingAnimationStart
                startAnimation={doNothing}
                startTriggered={false}
                startDelay={3}
            />,
        );
        const component: HTMLElement = screen.getByTestId(testId);
        expect(component).toBeInTheDocument();
        expect(component.innerHTML).toBe("START");
    });

    it("has correct class in each state", () => {
        const rerender = render(
            <BreathingAnimationStart
                startAnimation={doNothing}
                startTriggered={false}
                startDelay={3}
            />,
        ).rerender;

        // startTriggered = false
        const button = screen.getByTestId(testId);
        expect(button).toHaveClass("BreathingAnimationStart");
        expect(button).not.toHaveClass("start-triggered");

        // startTriggered = true
        rerender(
            <BreathingAnimationStart
                startAnimation={doNothing}
                startTriggered={true}
                startDelay={3}
            />,
        );

        expect(button).toHaveClass("start-triggered");
    });

    it("correctly sets startDelay in CSS", () => {
        const startDelay = 5;
        render(
            <BreathingAnimationStart
                startAnimation={doNothing}
                startTriggered={false}
                startDelay={startDelay}
            />,
        );

        const button = screen.getByTestId(testId);
        expect(button).toHaveStyle({ "--start-delay": "5" });
    });
});
