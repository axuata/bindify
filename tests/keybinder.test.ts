import {describe, expect, test, vi} from "vitest";
import {Keybinder} from "../src";

describe("Keybinder", () => {
  test('triggers callback on correct keys with correct order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['Shift', 'a'], mockCallback);

    const eventShift = new KeyboardEvent('keydown', { key: 'Shift' });
    const eventA = new KeyboardEvent('keydown', { key: 'a' });

    document.dispatchEvent(eventShift);
    document.dispatchEvent(eventA);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('triggers callback on correct keys with wrong order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['Shift', 'a'], mockCallback);

    const eventA = new KeyboardEvent('keydown', { key: 'a' });
    const eventShift = new KeyboardEvent('keydown', { key: 'Shift' });

    document.dispatchEvent(eventA);
    document.dispatchEvent(eventShift);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('doesn\'t triggers callback on wrong keys with correct order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['Shift', 'a'], mockCallback);

    const eventShift = new KeyboardEvent('keydown', { key: 'Shift' });
    const eventA = new KeyboardEvent('keydown', { key: 'z' });

    document.dispatchEvent(eventShift);
    document.dispatchEvent(eventA);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });

  test('doesn\'t triggers callback on wrong keys with wrong order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['Shift', 'a'], mockCallback);

    const eventA = new KeyboardEvent('keydown', { key: 'z' });
    const eventShift = new KeyboardEvent('keydown', { key: 'Shift' });

    document.dispatchEvent(eventA);
    document.dispatchEvent(eventShift);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
});