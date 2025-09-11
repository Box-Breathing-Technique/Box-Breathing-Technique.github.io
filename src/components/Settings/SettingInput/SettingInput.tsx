/**
 * @file SettingInput.tsx
 * @module SettingInput
 * @author Joshua Linehan
 */

import React from "react";
import "./SettingInput.css";
import { SettingInputProps } from "../Settings.types";

export const testId: string = "setting-input";

/**
 * @returns {React.ReactElement}
 */
function SettingInput({ type }: SettingInputProps): React.ReactElement {
    return (
        <div
            className="SettingInput"
            data-testid="setting-input"
        >
            {type}
        </div>
    );
}

export default SettingInput;
