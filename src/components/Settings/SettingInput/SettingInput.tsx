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

/**
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
