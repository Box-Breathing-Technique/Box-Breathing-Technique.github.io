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
        >
            <p>
                The box breathing technique is a tool for reducing stress and
                anxiety. By guiding your breath in a controlled rhythm, it helps
                calm your body's natural stress response. The classic approach
                involves inhaling, holding, exhaling, and pausing for four
                seconds each, but the timing can be adjusted to suit your
                personal preference. For more information, visit{" "}
                <a href="https://mensline.org.au/deal-with-anxiety/breathing-exercises-for-reducing-stress-and-anxiety/">
                    MensLine Australia
                </a>
                .
            </p>
            <p>
                {" "}
                This project was inspired by{" "}
                <a href="https://lassebomh.github.io/box-breathing/">
                    https://lassebomh.github.io/box-breathing/
                </a>
                .
            </p>
            <br />
            <div className="Footer">
                <p style={{ justifySelf: "end" }}>
                    <a href="mailto:boxbreathingtechniqueonline@gmail.com">
                        Email
                    </a>
                </p>
                <p>|</p>
                <p style={{ justifySelf: "start" }}>
                    <a href="https://github.com/Box-Breathing-Technique/Box-Breathing-Technique.github.io">
                        GitHub
                    </a>
                </p>
            </div>
        </div>
    );
}

export default About;
