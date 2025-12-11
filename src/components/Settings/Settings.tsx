/**
 * @file Settings.tsx
 * @module Settings
 * @author Joshua Linehan
 */

import React, { useState } from "react";
import "./Settings.css";
import {
    SettingDescriptionProps,
    SettingInputProps,
    SettingNoteProps,
    SettingsItem,
} from "./Settings.types";
import SettingDescription from "./SettingDescription";
import SettingInput from "./SettingInput";
import SettingNote from "./SettingNote";

export const testId: string = "settings";

interface SettingsProps {
    settingsItems: SettingsItem[];
}

interface ElementRowProps {
    settingsItem: SettingsItem;
    index: number;
}

/**
 * @returns {React.ReactElement}
 */
function Settings({ settingsItems }: SettingsProps): React.ReactElement {
    // generate elements
    const elements: React.ReactElement[] = [];
    const ElementRow: (props: ElementRowProps) => React.ReactElement = ({
        settingsItem,
        index,
    }) => {
        const [error, setError] = useState<string | undefined>(undefined);
        return (
            <>
                <SettingDescription
                    key={`desc-${index}`}
                    {...(settingsItem.description as SettingDescriptionProps)}
                />

                <SettingInput
                    key={`input-${index}`}
                    {...({
                        ...settingsItem.input,
                        ...{ setError: setError },
                    } as SettingInputProps)}
                />

                <SettingNote
                    key={`note-${index}`}
                    {...({
                        ...settingsItem.note,
                        ...{ error: error },
                    } as SettingNoteProps)}
                />
            </>
        );
    };
    settingsItems.forEach((value, index) => {
        elements.push(
            <ElementRow
                key={`row-${index}`}
                settingsItem={value}
                index={index}
            />,
        );
    });

    return (
        <div
            className="Settings"
            data-testid="settings"
        >
            {elements}
        </div>
    );
}

export default Settings;
