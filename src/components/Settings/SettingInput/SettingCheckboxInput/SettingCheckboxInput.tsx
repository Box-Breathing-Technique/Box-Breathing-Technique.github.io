/**
 * @file SettingCheckboxInput.tsx
 * @module SettingCheckboxInput
 * @author Joshua Linehan
 */

import React, { useState } from "react";
import "./SettingCheckboxInput.css";

export const testId: string = "setting-checkbox-input";

interface SettingCheckboxInputProps {
    handleInput: (value: boolean) => void;
    value: () => boolean;
}

/**
 * @returns {React.ReactElement}
 */
function SettingCheckboxInput({
    handleInput,
    value,
}: SettingCheckboxInputProps): React.ReactElement {
    const [checked, setChecked] = useState<boolean>(value());
    return (
        <input
            className="SettingCheckboxInput"
            data-testid="setting-checkbox-input"
            type="checkbox"
            checked={checked}
            onChange={(e) => {
                const newValue: boolean = e.target.checked;
                setChecked(newValue);
                handleInput(newValue);
            }}
        ></input>
    );
}

export default SettingCheckboxInput;
