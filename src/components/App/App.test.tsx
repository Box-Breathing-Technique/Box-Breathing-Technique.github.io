/**
 * @file App.test.tsx
 * @module App
 * @author Joshua Linehan
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
    it("renders without crashing", () => {
        render(<App />);
        expect(screen.getByTestId("app")).toBeInTheDocument();
    });

    it("has correct CSS class", () => {
        render(<App />);
        expect(screen.getByTestId("app")).toHaveClass("App");
    });

    it("has main landmark role", () => {
        render(<App />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});
