/**
 * @file Settings.tsx
 * @module Settings
 * @author Joshua Linehan
 */

import React, { ReactElement, useEffect, useRef, useState } from "react";
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
    settingsItems.forEach((value) => {
        descriptions.push(SettingDescription(value.description));
        inputs.push(SettingInput(value.input));
        notes.push(
            value.note
                ? SettingNote(value.note)
                : SettingNote({ hidden: true }),
        );
    });

    // give SettingsContainer width to NotesContainer
    const settingsContainerRef = useRef<HTMLDivElement>(null);
    const [settingsContainerWidth, setSettingsContainerWidth] = useState(0);
    useEffect(() => {
        if (!settingsContainerRef) {
            return;
        }
        const settingsContainer = settingsContainerRef.current;
        setSettingsContainerWidth(settingsContainer?.clientWidth ?? 0);
    }, []);
    const notesContainerStyle: React.CSSProperties = {
        transform: `translateX(${settingsContainerWidth / 2}px) translateX(-25%)`,
    };

    return (
        <div
            className="Settings"
            data-testid="settings"
        >
            <div
                className="SettingsContainer"
                ref={settingsContainerRef}
            >
                {descriptions}
                {inputs}
            </div>
            <div
                className="NotesContainer"
                style={notesContainerStyle}
            >
                {notes}
            </div>
        </div>
    );
}

export default Settings;
