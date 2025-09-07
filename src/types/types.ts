/**
 * @file types.ts
 * @module types
 * @author Joshua Linehan
 *
 * Provides shared types for the project
 */

/** Describes the position of a Panel component */
export type PanelState = "above" | "display" | "below";

/** Describes the current content displayed by the app */
export type AppState = "settings" | "animation" | "about";
