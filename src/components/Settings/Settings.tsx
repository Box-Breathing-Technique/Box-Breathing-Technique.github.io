/**
 * @file Settings.tsx
 * @module Settings
 * @author Joshua Linehan
 */

import React, { ReactElement, useRef } from "react";
import "./Settings.css";
import { SettingsItem } from "./Settings.types";
import SettingDescription from "./SettingDescription";
import SettingNote from "./SettingNote";
import SettingInput from "./SettingInput";

export const testId: string = "settings";

interface SettingsProps {
    settingsItems: SettingsItem[];
}

/**
 * @returns {React.ReactElement}
 */
function Settings({ settingsItems }: SettingsProps): React.ReactElement {
    // build element lists
    const descriptions: ReactElement[] = [];
    const inputs: ReactElement[] = [];
    const notes: ReactElement[] = [];
    settingsItems.forEach((value, index) => {
        descriptions.push(
            <SettingDescription
                key={`desc-${index}`}
                {...value.description}
            />,
        );
        inputs.push(
            <SettingInput
                key={`input-${index}`}
                {...value.input}
            />,
        );
        notes.push(
            <SettingNote
                key={`note-${index}`}
                {...value.note}
            />,
        );
    });

    // centre description and input columns
    const settingsRef = useRef<HTMLDivElement | null>(null);
    const alignmentRef = useRef<HTMLDivElement | null>(null);
    const targetPosition =
        (alignmentRef.current?.clientLeft ?? 0) +
        (alignmentRef.current?.clientWidth ?? 0) / 2;
    const actualPosition =
        (settingsRef.current?.clientLeft ?? 0) +
        (settingsRef.current?.clientWidth ?? 0) / 2;
    const offset = actualPosition - targetPosition;
    const settingsStyle: React.CSSProperties = {
        transform: `translate(-50%, -50%) translateX(${offset}px)`,
    };

    return (
        <div
            className="Settings"
            data-testid="settings"
            style={settingsStyle}
            ref={settingsRef}
        >
            {descriptions}
            {inputs}
            {notes}
            <div
                className="AlignmentElement"
                ref={alignmentRef}
            />
        </div>
    );
}

export default Settings;
