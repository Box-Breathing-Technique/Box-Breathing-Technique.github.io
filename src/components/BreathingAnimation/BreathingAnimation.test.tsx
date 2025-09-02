/**
@file BreathingAnimation.test.tsx
@module 
@author Joshua Linehan
*/

import React from "react";
import { render, screen } from "@testing-library/react";
import BreathingAnimation from "./BreathingAnimation";

describe("BreathingAnimation", () => {
    it("renders without crashing", () => {
        render(<BreathingAnimation />);
        expect(screen.getByTestId("breathing-animation")).toBeInTheDocument();
    });
});
