import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
    test("renders without crashing", () => {
        render(<App />);
        expect(screen.getByTestId("app")).toBeInTheDocument();
    });

    test("has correct CSS class", () => {
        render(<App />);
        expect(screen.getByTestId("app")).toHaveClass("App");
    });

    test("has main landmark role", () => {
        render(<App />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});
