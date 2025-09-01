/**
 * @file WarningIcon.tsx
 * @module WarningIcon
 * @author Joshua Linehan
 */

import React from "react";
import "./WarningIcon.css";

interface WarningIconProps {
    size: number;
    weight: number;
    color?: string;
}

/**
 * A customizable warning icon from Google's Material Symbols. Renders the
 * "warning" symbol as an inline element with customizable size, weight, and
 * color via CSS custom properties.
 *
 * @see [Material Symbols](https://fonts.google.com/icons) for more information on the icon set.
 *
 * @property {number} [size=24] The fontsize and optical size of the icon
 * @property {number} [weight=100] The weight (thickness) of the icon
 * @property {string} [color="black"] The CSS color value for the icon
 * @returns {React.ReactElement}
 *
 * @example
 * // Default settings
 * <WarningIcon/>
 *
 * @example
 * // Custom size
 * <WarningIcon size={300} weight={300} />
 *
 * @example
 * // Custom size and colour
 * <WarningIcon size={300} weight={300} color="red" />
 *
 */
function WarningIcon({
    size = 24,
    weight = 100,
    color = "black",
}: WarningIconProps): React.ReactElement {
    const warningIconStyle: React.CSSProperties = {
        "--size": size,
        "--weight": weight,
        color: color,
    } as React.CSSProperties;
    return (
        <span
            className="WarningIcon"
            style={warningIconStyle}
            aria-label="Warning"
            role="img"
        >
            warning
        </span>
    );
}

export default WarningIcon;
