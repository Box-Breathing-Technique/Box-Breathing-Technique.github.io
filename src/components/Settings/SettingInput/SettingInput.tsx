/**
 * @file SettingInput.tsx
 * @module SettingInput
 * @author Joshua Linehan
 */

import React, { useRef } from "react";
import "./SettingInput.css";
import { SettingInputProps } from "../Settings.types";
import SettingTextInput from "./SettingTextInput";

export const testId: string = "setting-input";

/**
 * @returns {React.ReactElement}
 */
function SettingInput({
    type,
    placeholder,
    handleInput,
    validateInput,
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
                            />
                        );
                }
            })()}
        </div>
    );
}

export default SettingInput;
