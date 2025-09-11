/**
 * @file Settings.types.ts
 * @module Settings
 * @author Joshua Linehan
 */

export type SettingInputType = "text";

export interface SettingDescriptionProps {
    text: string;
}

export interface SettingInputProps {
    type: SettingInputType;
}

export interface SettingNoteProps {
    text?: string;
    hidden?: boolean;
}

export interface SettingsItem {
    description: SettingDescriptionProps;
    input: SettingInputProps;
    note?: SettingNoteProps;
}
