/**
 * @file PanelTransitionButton.tsx
 * @module PanelTransitionButton
 * @author Joshua Linehan
 */

import React from "react";
import "./PanelTransitionButton.css";
import { FontInfo } from "../../types";
import { useTextStyle } from "../../hooks";

export const testId: string = "panel-transition-button";

interface PanelTransitionButtonProps {
    label: string;
    onClick: () => void;
    fontInfo: FontInfo;
}

/** Used to change the displayed panel
 *
 * @property {string} label The text displayed on the button
 * @property {() => void} onClick Function called when button is pressed
 * @property {FontInfo} fontInfo Data for size and spacing of text
 * @returns {React.ReactElement}
 *
 * @example
 * <PanelTransitionButton
 *     label={"SETTINGS"}
 *     onClick={() => setAppState("settings")}
 *     fontInfo={fontInfo}
 * />
 */
function PanelTransitionButton({
    label,
    onClick,
    fontInfo,
}: PanelTransitionButtonProps): React.ReactElement {
    const style: React.CSSProperties = {
        fontSize: fontInfo?.fontSize,
        letterSpacing: fontInfo?.letterSpacing,
    };
    return (
        <button
            className="PanelTransitionButton"
            data-testid="panel-transition-button"
            onClick={onClick}
            style={style}
        >
            {label}
        </button>
    );
}

export default PanelTransitionButton;
