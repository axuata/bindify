import {describe, expect, test, vi} from "vitest";
import {Keybinder} from "../src";

describe("Keybinder", () => {
  test('should trigger callback on correct keys with correct order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['Shift', 'a'], mockCallback);

    const eventShift = new KeyboardEvent('keydown', { key: 'Shift' });
    const eventA = new KeyboardEvent('keydown', { key: 'a' });

    document.dispatchEvent(eventShift);
    document.dispatchEvent(eventA);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('should trigger callback on correct keys with wrong order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['Shift', 'a'], mockCallback);

    const eventA = new KeyboardEvent('keydown', { key: 'a' });
    const eventShift = new KeyboardEvent('keydown', { key: 'Shift' });

    document.dispatchEvent(eventA);
    document.dispatchEvent(eventShift);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('shouldn\'t trigger callback on wrong keys with correct order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['Shift', 'a'], mockCallback);

    const eventShift = new KeyboardEvent('keydown', { key: 'Shift' });
    const eventA = new KeyboardEvent('keydown', { key: 'z' });

    document.dispatchEvent(eventShift);
    document.dispatchEvent(eventA);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });

  test('shouldn\'t trigger callback on wrong keys with wrong order', () => {
    const keybinder = new Keybinder();
    const mockCallback = vi.fn();
    keybinder.createKeybind(['Shift', 'a'], mockCallback);

    const eventA = new KeyboardEvent('keydown', { key: 'z' });
    const eventShift = new KeyboardEvent('keydown', { key: 'Shift' });

    document.dispatchEvent(eventA);
    document.dispatchEvent(eventShift);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });

  test('should remove keybind on correct keys', () => {
    const keybinder = new Keybinder();
    const callback = vi.fn();
    const keys = ['Shift', 'a'];

    keybinder.createKeybind(keys, callback);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

    keybinder.removeKeybind(keys);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('shouldn\'t remove keybind on wrong keys', () => {
    const keybinder = new Keybinder();
    const callback = vi.fn();
    const keys = ['Shift', 'a'];

    keybinder.createKeybind(keys, callback);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));

    keybinder.removeKeybind(keys);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));

    expect(callback).toHaveBeenCalledTimes(0);
  });
});