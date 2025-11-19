/**
 * @file SettingCheckboxInput.tsx
 * @module SettingCheckboxInput
 * @author Joshua Linehan
 */

import React from "react";
import "./SettingCheckboxInput.css";

export const testId: string = "setting-checkbox-input";

interface SettingCheckboxInputProps {
    handleInput: (value: boolean) => void;
}

/**
 * @returns {React.ReactElement}
 */
function SettingCheckboxInput({
    handleInput,
}: SettingCheckboxInputProps): React.ReactElement {
    return (
        <input
            className="SettingCheckboxInput"
            data-testid="setting-checkbox-input"
            type="checkbox"
            onChange={(e) => {
                handleInput(e.target.checked);
            }}
        ></input>
    );
}

export default SettingCheckboxInput;
