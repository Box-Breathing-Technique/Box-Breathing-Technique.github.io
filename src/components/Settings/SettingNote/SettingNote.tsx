/**
 * @file SettingNote.tsx
 * @module SettingNote
 * @author Joshua Linehan
 */

import React, { useRef } from "react";
import "./SettingNote.css";
import { SettingNoteProps } from "../Settings.types";

export const testId: string = "setting-note";

/**
 * @returns {React.ReactElement}
 */
function SettingNote({ text, error }: SettingNoteProps): React.ReactElement {
    // position error message
    const settingNoteRef = useRef<HTMLDivElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);
    const settingNoteElement = settingNoteRef.current;
    const errorElement = errorRef.current;
    const targetHeight = settingNoteElement?.clientHeight;
    const targetWidth = settingNoteElement?.clientWidth;
    const xPosDiff =
        (settingNoteElement?.clientLeft ?? 0) - (errorElement?.clientLeft ?? 0);
    const yPosDiff =
        (settingNoteElement?.clientTop ?? 0) - (errorElement?.clientTop ?? 0);
    const errorStyle: React.CSSProperties = {
        height: targetHeight,
        width: targetWidth,
        transform: `translate(${xPosDiff}, ${yPosDiff})`,
    };
    return (
        <div
            className={"SettingNote"}
            data-testid="setting-note"
            ref={settingNoteRef}
        >
            {text ? (
                <>
                    <div className="material-icons-outlined icon">info</div>
                    <div className="text">{text}</div>
                </>
            ) : (
                <></>
            )}

            <div
                className={`error ${error ? "" : "hidden"}`}
                style={errorStyle}
                ref={errorRef}
            >
                <div className="material-icons-outlined icon">info</div>
                <div className="text">{error}</div>
            </div>
        </div>
    );
}

export default SettingNote;
