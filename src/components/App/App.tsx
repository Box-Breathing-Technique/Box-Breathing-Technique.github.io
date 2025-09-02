/**
 * @file App.tsx
 * @module App
 * @author Joshua Linehan
 */

import React from "react";
import "./App.css";
import WarningIcon from "../construction/WarningIcon";
import WarningMessage from "../construction/WarningMessage";
import ContactLink from "../construction/ContactLink";

/** Master component for web app
 * @returns {React.ReactElement}
 *
 * @example
 * // Render app
 * const root = ReactDOM.createRoot(
 *   document.getElementById("root") as HTMLElement,
 * );
 * root.render(
 *   <React.StrictMode>
 *     <App />
 *   </React.StrictMode>,
 * );
 */
function App(): React.ReactElement {
    return (
        <div
            className="App"
            role="main"
            data-testid="app"
        >
            <WarningIcon
                size={300}
                weight={300}
                color="grey"
            />
            <WarningMessage />
            <ContactLink />
        </div>
    );
}

export default App;
