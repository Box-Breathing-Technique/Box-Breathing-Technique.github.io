/**
 * @file SettingNote.tsx
 * @module SettingNote
 * @author Joshua Linehan
 */

import React from "react";
import "./SettingNote.css";
import { SettingNoteProps } from "../Settings.types";

export const testId: string = "setting-note";

/**
 * @returns {React.ReactElement}
 */
function SettingNote({ text }: SettingNoteProps): React.ReactElement {
    const hidden: boolean = text ? false : true;
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
