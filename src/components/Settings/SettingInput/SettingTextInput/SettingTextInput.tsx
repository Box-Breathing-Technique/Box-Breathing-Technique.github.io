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
 *
 * @property {string} placeholder the placeholder text before input is entered
 * @property {(string) => void} handleInput function to handle input to this
 * component
 * @property {((string) => boolean) | undefined} [validateInput] function to
 * flag improper input
 * @property {React.Dispatch<React.SetStateAction<string | undefined>> | undefined} [setError]
 * function to set error message on failing validateInput. Should be from
 * setState
 * @property {string | undefined} [errorMessage] Message to be displayed on
 * failure of validateInput
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
