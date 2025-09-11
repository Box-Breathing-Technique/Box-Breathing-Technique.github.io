/**
 * @file SettingDescription.tsx
 * @module SettingDescription
 * @author Joshua Linehan
 */

import React from "react";
import "./SettingDescription.css";
import { SettingDescriptionProps } from "../Settings.types";

export const testId: string = "setting-description";

/**
 * @returns {React.ReactElement}
 */
function SettingDescription({
    text,
}: SettingDescriptionProps): React.ReactElement {
    return (
        <div
            className="SettingDescription"
            data-testid="setting-description"
        >
            {text}
        </div>
    );
}

export default SettingDescription;
