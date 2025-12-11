/**
 * @file SettingInput.tsx
 * @module SettingInput
 * @author Joshua Linehan
 */

import React, { useRef } from "react";
import "./SettingInput.css";
import { SettingInputProps } from "../Settings.types";
import SettingTextInput from "./SettingTextInput";
import SettingCheckboxInput from "./SettingCheckboxInput";

export const testId: string = "setting-input";

/** Accepts and handles input for a settings item
 *
 * @property {SettingInputType} type set the type of input
 * @property {string | undefined} [placeholder] the placeholder text before input
 * is entered
 * @property {(string | boolean) => void} handleInput function to handle input
 * to this component
 * @property {((string) => boolean) | undefined} [validateInput] function to flag
 * improper input
 * @property {React.Dispatch<React.SetStateAction<string | undefined>> | undefined} [setError]
 * function to set error message on failing validateInput. Should be from
 * setState
 * @property {string | undefined} [errorMessage] Message to be displayed on
 * failure of validateInput
 * @property {() => string | boolean} [value] Getter function for the current
 * value of the setting
 * @returns {React.ReactElement}
 */
function SettingInput({
    type,
    placeholder,
    handleInput,
    validateInput,
    setError,
    errorMessage,
    value,
}: SettingInputProps): React.ReactElement {
    const divRef = useRef<HTMLDivElement>(null);
    return (
        <div
            className="SettingInput"
            data-testid="setting-input"
            ref={divRef}
        >
            {(() => {
                switch (type) {
                    case "text":
                        return (
                            <SettingTextInput
                                placeholder={placeholder!}
                                handleInput={handleInput}
                                validateInput={validateInput}
                                setError={setError}
                                errorMessage={errorMessage}
                            />
                        );
                    case "checkbox":
                        return (
                            <SettingCheckboxInput
                                handleInput={handleInput}
                                value={value! as () => boolean}
                            />
                        );
                }
            })()}
        </div>
    );
}

export default SettingInput;
