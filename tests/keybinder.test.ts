import {describe, expect, test, vi} from "vitest";
import {Keybinder} from "../src";

describe("Keybinder", () => {
  test('should trigger callback on correct keys with correct order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['ShiftLeft', 'KeyA'], mockCallback);

    const eventShiftLeft = new KeyboardEvent('keydown', { code: 'ShiftLeft' });
    const eventKeyA = new KeyboardEvent('keydown', { code: 'KeyA' });

    document.dispatchEvent(eventShiftLeft);
    document.dispatchEvent(eventKeyA);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('should trigger callback on correct keys with wrong order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['ShiftLeft', 'KeyA'], mockCallback);

    const eventKeyA = new KeyboardEvent('keydown', { code: 'KeyA' });
    const eventShiftLeft = new KeyboardEvent('keydown', { code: 'ShiftLeft' });

    document.dispatchEvent(eventKeyA);
    document.dispatchEvent(eventShiftLeft);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('shouldn\'t trigger callback on wrong keys with correct order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['ShiftLeft', 'KeyA'], mockCallback);

    const eventShift = new KeyboardEvent('keydown', { code: 'ShiftLeft' });
    const eventA = new KeyboardEvent('keydown', { code: 'KeyZ' });

    document.dispatchEvent(eventShift);
    document.dispatchEvent(eventA);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });

  test('shouldn\'t trigger callback on wrong keys with wrong order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['ShiftLeft', 'KeyA'], mockCallback);

    const eventA = new KeyboardEvent('keydown', { code: 'KeyZ' });
    const eventShift = new KeyboardEvent('keydown', { code: 'ShiftLeft' });

    document.dispatchEvent(eventA);
    document.dispatchEvent(eventShift);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });

  test('should remove keybind on correct keys', () => {
    const keybinder = new Keybinder();
    const callback = vi.fn();
    const keys = ['ShiftLeft', 'KeyA'];

    keybinder.createKeybind(keys, callback);

    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ShiftLeft' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));

    keybinder.removeKeybind(keys);

    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ShiftLeft' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('shouldn\'t remove keybind on wrong keys', () => {
    const keybinder = new Keybinder();
    const callback = vi.fn();
    const keys = ['ShiftLeft', 'KeyA'];

    keybinder.createKeybind(keys, callback);

    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ShiftLeft' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyB' }));

    keybinder.removeKeybind(keys);

    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ShiftLeft' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyB' }));

    expect(callback).toHaveBeenCalledTimes(0);
  });
});