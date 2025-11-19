/**
 * @file Settings.types.ts
 * @module Settings
 * @author Joshua Linehan
 */

import { FontInfo } from "../../types";

export type SettingInputType = "text" | "checkbox";

export interface SettingDescriptionProps {
    text: string;
}

export interface SettingInputProps {
    type: SettingInputType;
    placeholder?: string;
    handleInput: (value: string | boolean) => void;
    validateInput?: (input: string) => boolean;
    setError?: React.Dispatch<React.SetStateAction<string | undefined>>;
    errorMessage?: string;
}

export interface SettingNoteProps {
    text?: string;
    error?: string;
}

export interface SettingsItem {
    description: Partial<SettingDescriptionProps>;
    input: Partial<SettingInputProps>;
    note?: Partial<SettingNoteProps>;
}

export interface SettingsContext {
    setInDuration?: (value: number) => void;
    setHoldInDuration?: (value: number) => void;
    setOutDuration?: (value: number) => void;
    setHoldOutDuration?: (value: number) => void;
    setGradientColor?: (value: string) => void;
    reset?: () => void;
    fontInfo?: FontInfo;
}
