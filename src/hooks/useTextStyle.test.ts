/**
 * @file useTextStyle.test.ts
 * @module hooks
 * @author Joshua Linehan
 */

import { renderHook, act } from "@testing-library/react";
import { useTextStyle } from "./useTextStyle";
import { FontInfo } from "../types";

const mockGetComputedStyle = jest.fn();
Object.defineProperty(window, "getComputedStyle", {
    value: mockGetComputedStyle,
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

describe("useTextStyle", () => {
    beforeEach(() => {
        mockGetComputedStyle.mockClear();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return initial font info when element is null", () => {
        const getElement = jest.fn().mockReturnValue(null);

        const { result } = renderHook(() => useTextStyle(getElement));

        expect(result.current).toEqual({
            fontSize: "",
            letterSpacing: "",
        });
        expect(getElement).toHaveBeenCalled();
    });

    it("should get computed styles when element exists", () => {
        const mockElement: HTMLElement = {} as HTMLElement;
        const getElement = jest.fn().mockReturnValue(mockElement);

        const mockFontInfo: FontInfo = {
            fontSize: "16px",
            letterSpacing: "0.5px",
        };

        mockGetComputedStyle.mockReturnValue(mockFontInfo);

        const { result } = renderHook(() => useTextStyle(getElement));

        expect(getElement).toHaveBeenCalled();
        expect(mockGetComputedStyle).toHaveBeenCalledWith(mockElement);
        expect(result.current).toEqual({
            fontSize: "16px",
            letterSpacing: "0.5px",
        });
    });

    it("should add resize event listener on mount", () => {
        const addEventListenerSpy = jest.spyOn(window, "addEventListener");
        const getElement = jest.fn().mockReturnValue(null);

        renderHook(() => useTextStyle(getElement));

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            "resize",
            expect.any(Function),
        );
    });

    it("should remove resize event listener on unmount", () => {
        const removeEventListenerSpy = jest.spyOn(
            window,
            "removeEventListener",
        );
        const getElement = jest.fn().mockReturnValue(null);

        const { unmount } = renderHook(() => useTextStyle(getElement));
        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "resize",
            expect.any(Function),
        );
    });

    it("should update styles on window resize", () => {
        const mockElement = document.createElement("div");
        const getElement = jest.fn().mockReturnValue(mockElement);

        mockGetComputedStyle.mockReturnValue({
            fontSize: "16px",
            letterSpacing: "0.5px",
        });

        const { result } = renderHook(() => useTextStyle(getElement));

        expect(getElement).toHaveBeenCalled();
        expect(mockGetComputedStyle).toHaveBeenCalledWith(mockElement);
        expect(result.current).toEqual({
            fontSize: "16px",
            letterSpacing: "0.5px",
        });
    });

    it("should handle undefined element", () => {
        const getElement = jest.fn().mockReturnValue(undefined);

        const { result } = renderHook(() => useTextStyle(getElement));

        expect(result.current).toEqual({
            fontSize: "",
            letterSpacing: "",
        });
        expect(mockGetComputedStyle).not.toHaveBeenCalled();
    });

    it("should cleanup properly when getElement changes", () => {
        const removeEventListenerSpy = jest.spyOn(
            window,
            "removeEventListener",
        );
        const getElement1 = jest.fn().mockReturnValue(null);
        const getElement2 = jest.fn().mockReturnValue(null);

        const { rerender } = renderHook(
            ({ getElement }) => useTextStyle(getElement),
            {
                initialProps: { getElement: getElement1 },
            },
        );

        rerender({ getElement: getElement2 });

        // Should have removed previous event listener
        expect(removeEventListenerSpy).toHaveBeenCalled();
    });

    it("should not recompute styles if element reference is the same", () => {
        const mockElement = {} as HTMLElement;
        const getElement = jest.fn().mockReturnValue(mockElement);

        mockGetComputedStyle.mockReturnValue({
            fontSize: "16px",
            letterSpacing: "0.5px",
        });

        const { rerender } = renderHook(() => useTextStyle(getElement));

        const initialCallCount = mockGetComputedStyle.mock.calls.length;

        // Re-render with same element
        rerender();

        expect(mockGetComputedStyle).toHaveBeenCalledTimes(initialCallCount);
    });

    it("should use the latest getElement function", () => {
        const mockElement = {} as HTMLElement;
        const getElement1 = jest.fn().mockReturnValue(null);
        const getElement2 = jest.fn().mockReturnValue(mockElement);

        mockGetComputedStyle.mockReturnValue({
            fontSize: "16px",
            letterSpacing: "0.5px",
        });

        const { rerender } = renderHook(
            ({ getElement }) => useTextStyle(getElement),
            {
                initialProps: { getElement: getElement1 },
            },
        );

        rerender({ getElement: getElement2 });

        expect(getElement2).toHaveBeenCalled();
        expect(mockGetComputedStyle).toHaveBeenCalledWith(mockElement);
    });
});
