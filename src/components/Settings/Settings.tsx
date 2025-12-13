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

/** Content for the settings panel
 *
 * @property {SettingsItem[]} settingsItems a list of settings items to be displayed in the settings panel
 * @returns {React.ReactElement}
 *
 * @example
 * // a Settings component with a text input and a checkbox
 * <Settings
 *      settingsItems={[
 *          {
 *              description: { text: "Text Input" },
 *              input: {
 *                  type: "text",
 *                  handleInput(value) {
 *                      // handle text input
 *                  },
 *              },
 *              {
 *          },
 *              description: { text: "Checkbox Input" },
 *              input: {
 *                  type: "checkbox",
 *                  handleInput(value) {
 *                      // handle checkbox input
 *                  },
 *              },
 *          },
 *      ]}
 *  />
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
