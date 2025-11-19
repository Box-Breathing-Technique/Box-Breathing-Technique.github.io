/**
 * @file SettingTextInput.tsx
 * @module SettingTextInput
 * @author Joshua Linehan
 */

import React, { useRef, useState } from "react";
import "./SettingTextInput.css";

export const testId: string = "setting-text-input";

const submitDelay: number = 1000;

interface SettingTextInputProps {
    placeholder: string;
    handleInput: (value: string) => void;
    validateInput?: (input: string) => boolean;
    setError?: React.Dispatch<React.SetStateAction<string | undefined>>;
    errorMessage?: string;
}

/**
 * @returns {React.ReactElement}
 */
function SettingTextInput({
    placeholder,
    handleInput,
    validateInput,
    setError,
    errorMessage,
}: SettingTextInputProps): React.ReactElement {
    const [value, setValue] = useState<string>("");
    const timeoutRef = useRef<NodeJS.Timeout>(undefined);
    return (
        <input
            className="SettingTextInput"
            data-testid="setting-text-input"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                setError?.(undefined);
                clearTimeout(timeoutRef.current);
                const newValue: string = e.target.value;
                setValue(newValue);
                if (newValue) {
                    timeoutRef.current = setTimeout(() => {
                        if ((validateInput ?? (() => true))(newValue)) {
                            handleInput(newValue);
                        } else {
                            setError?.(errorMessage ?? "Invalid input");
                        }
                    }, submitDelay);
                }
            }}
        />
    );
}

export default SettingTextInput;
