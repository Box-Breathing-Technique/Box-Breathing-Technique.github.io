/**
 * @file WarningMessage.tsx
 * @module WarningMessage
 * @author Joshua Linehan
 */

import React from "react";
import "./WarningMessage.css";

/** The message displaying information about the site's construction
 * @returns {React.ReactElement}
 */
function WarningMessage(): React.ReactElement {
    const warningMessage: string = "This site is currently under construction";
    return <h1 className="WarningMessage">{warningMessage}</h1>;
}

export default WarningMessage;
