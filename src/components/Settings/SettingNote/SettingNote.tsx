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
    return text ? (
        <div
            className={"SettingNote"}
            data-testid="setting-note"
        >
            <div className="material-icons-outlined icon">info</div>
            <div className="text">{text}</div>
        </div>
    ) : (
        <></>
    );
}

export default SettingNote;
