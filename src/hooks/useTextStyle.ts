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

        let resizeTimeout: NodeJS.Timeout;
        const debouncedUpdateSize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateSize, 50);
        };

        window.addEventListener("resize", debouncedUpdateSize);

        return () => {
            window.removeEventListener("resize", debouncedUpdateSize);
            clearTimeout(resizeTimeout);
        };
    }, [getElement]);

    return fontInfo;
}
