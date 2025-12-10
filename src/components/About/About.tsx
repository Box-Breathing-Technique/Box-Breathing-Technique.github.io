/**
 * @file About.tsx
 * @module About
 * @author Joshua Linehan
 */

import React from "react";
import "./About.css";

export const testId: string = "about";

/**
 * @returns {React.ReactElement}
 */
function About(): React.ReactElement {
    return (
        <div
            className="About"
            data-testid="about"
        ></div>
    );
}

export default About;
