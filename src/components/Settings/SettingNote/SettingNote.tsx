/**
 * @file SettingNote.tsx
 * @module SettingNote
 * @author Joshua Linehan
 */

import React from "react";
import "./SettingNote.css";
import { SettingNoteProps } from "../Settings.types";

export const testId: string = "setting-note";

const emptyText: string = "empty";

/**
 * @returns {React.ReactElement}
 */
function SettingNote({
    text = emptyText,
    hidden = false,
}: SettingNoteProps): React.ReactElement {
    return (
        <div
            className={`SettingNote ${hidden ? "hidden" : ""}`}
            data-testid="setting-note"
        >
            {text}
        </div>
    );
}

export default SettingNote;
