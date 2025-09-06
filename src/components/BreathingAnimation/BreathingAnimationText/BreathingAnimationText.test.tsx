/**
 * @file BreathingAnimationText.test.tsx
 * @module BreathingAnimationText
 * @author Joshua Linehan
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import BreathingAnimationText, { testId } from "./BreathingAnimationText";
import { Phase, START_PHASE } from "../Phases";

type Subclass = "before" | "active" | "after";
const before: Subclass = "before";
const active: Subclass = "active";
const after: Subclass = "after";

describe("BreathingAnimationText", () => {
    it("renders without crashing", () => {
        render(
            <BreathingAnimationText
                text={"TEST"}
                activePhase={0}
                currentPhase={0}
            />,
        );
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
    it("renders supplied text", () => {
        const testText: string = "TEST";
        render(
            <BreathingAnimationText
                text={testText}
                activePhase={0}
                currentPhase={0}
            />,
        );
        expect(screen.getByText(testText)).toBeInTheDocument();
    });
    it("has appropriate class in each phase", () => {
        const inText: string = "BREATHE IN";
        const holdText: string = "HOLD";
        const outText: string = "BREATHE OUT";
        const components = (phase: Phase): React.ReactElement => {
            return (
                <>
                    <BreathingAnimationText
                        text={inText}
                        activePhase={0}
                        currentPhase={phase}
                    />
                    <BreathingAnimationText
                        text={holdText}
                        activePhase={1}
                        currentPhase={phase}
                    />
                    <BreathingAnimationText
                        text={outText}
                        activePhase={2}
                        currentPhase={phase}
                    />
                    <BreathingAnimationText
                        text={holdText}
                        activePhase={3}
                        currentPhase={phase}
                    />
                </>
            );
        };
        // phase = 0
        const rerender = render(components(0)).rerender;
        expect(screen.getByText(inText)).toHaveClass(active);
        expect(screen.getAllByText(holdText)[0]).toHaveClass(before);
        expect(screen.getByText(outText)).toHaveClass(before);
        expect(screen.getAllByText(holdText)[1]).toHaveClass(after);

        // phase = 1
        rerender(components(1));
        expect(screen.getByText(inText)).toHaveClass(after);
        expect(screen.getAllByText(holdText)[0]).toHaveClass(active);
        expect(screen.getByText(outText)).toHaveClass(before);
        expect(screen.getAllByText(holdText)[1]).toHaveClass(before);

        // phase = 2
        rerender(components(2));
        expect(screen.getByText(inText)).toHaveClass(before);
        expect(screen.getAllByText(holdText)[0]).toHaveClass(after);
        expect(screen.getByText(outText)).toHaveClass(active);
        expect(screen.getAllByText(holdText)[1]).toHaveClass(before);

        // phase = 3
        rerender(components(3));
        expect(screen.getByText(inText)).toHaveClass(before);
        expect(screen.getAllByText(holdText)[0]).toHaveClass(before);
        expect(screen.getByText(outText)).toHaveClass(after);
        expect(screen.getAllByText(holdText)[1]).toHaveClass(active);
    });
    it("handles start phase", () => {
        render(
            <BreathingAnimationText
                text={"TEST"}
                activePhase={0}
                currentPhase={START_PHASE}
            />,
        );
        const component: HTMLElement = screen.getByTestId(testId);
        expect(component).toHaveClass("BreathingAnimationText");
        expect(component).not.toHaveClass(before);
        expect(component).not.toHaveClass(active);
        expect(component).not.toHaveClass(after);
    });
});
