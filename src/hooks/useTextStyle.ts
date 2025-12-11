/**
 * @file useTextStyle.ts
 * @module hooks
 * @author Joshua Linehan
 */

import { useEffect, useState } from "react";
import { FontInfo } from "../types";

const defaultFontInfo: FontInfo = {
    fontSize: "",
    letterSpacing: "",
};

/** Generates a FontInfo object from a HTMLElement
 *
 * @param {() => HTMLElement | null | undefined} getElement Function that gets
 * the HTML element that font information is extracted from
 * @returns {FontInfo}
 *
 * @example
 * ref = useRef<HTMLElement>(null)
 * <element ref={ref}></element>
 * const fontInfo = useTextFormat(useCallback(() => ref.current), [])
 */
export function useTextStyle(
    getElement: () => HTMLElement | null | undefined,
): FontInfo {
    const [fontInfo, setFontInfo] = useState<FontInfo>(defaultFontInfo);

    useEffect(() => {
        const element = getElement();
        const updateSize = () => {
            if (!element) return;

            setFontInfo({
                fontSize:
                    getComputedStyle(element)?.fontSize ??
                    defaultFontInfo.fontSize,
                letterSpacing:
                    getComputedStyle(element)?.letterSpacing ??
                    defaultFontInfo.letterSpacing,
            });
        };
        updateSize();

        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, [getElement]);

    return fontInfo;
}
