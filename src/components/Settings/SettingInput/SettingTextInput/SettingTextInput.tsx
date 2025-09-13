/**
 * @file SettingTextInput.tsx
 * @module SettingTextInput
 * @author Joshua Linehan
 */

import React, { useRef } from "react";
import "./SettingTextInput.css";

export const testId: string = "setting-text-input";

const submitDelay: number = 1000;

interface SettingInputTextProps {
    placeholder: string;
    handleInput: (value: string) => void;
    validateInput?: (input: string) => boolean;
}

/**
 * @returns {React.ReactElement}
 */
function SettingTextInput({
    placeholder,
    handleInput,
    validateInput,
}: SettingInputTextProps): React.ReactElement {
    const inputRef = useRef<HTMLInputElement>(null);
    let timeout: NodeJS.Timeout;
    return (
        <input
            className="SettingTextInput"
            data-testid="setting-text-input"
            type="text"
            placeholder={placeholder}
            ref={inputRef}
            onChange={(e) => {
                clearTimeout(timeout);
                const value: string = e.target.value;
                if (value) {
                    timeout = setTimeout(() => {
                        if ((validateInput ?? (() => true))(value))
                            handleInput(value);
                    }, submitDelay);
                }
            }}
        />
    );
}

export default SettingTextInput;
