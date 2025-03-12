export class Keybinder {
  private binds: {keys: string[], callback: () => void, keydownListener: (e: KeyboardEvent) => void, keyupListener: (e: KeyboardEvent) => void}[] = [];

  /**
   * Creates a keybind.
   *
   * @param {string[]} keys - **An array of keys** that need to be pressed together.
   * @param {() => void} callback - **The function to be triggered** when the keys are pressed.
   */
  createKeybind(keys: string[], callback: () => void): void {
    const pressedKeys: Set<string> = new Set<string>();

    const keydownListener = (event: KeyboardEvent): void => {
      pressedKeys.add(event.key);

      const pressedArray = Array.from(pressedKeys);

      if (pressedArray.length === keys.length) {
        if (pressedArray.sort().join(',') === keys.sort().join(',')) {
          callback();
        }
      }
    }

    const keyupListener = (event: KeyboardEvent): void => {
      pressedKeys.delete(event.key);
    }

    document.addEventListener('keydown', keydownListener);
    document.addEventListener('keyup', keyupListener);

    this.binds.push({keys, callback, keydownListener, keyupListener});
  }

  /**
   * Removes a keybind.
   *
   * @param {string[]} keys - **An array of keys** to remove the keybind for.
   */
  removeKeybind(keys: string[]): void {
    const bindIndex = this.binds.findIndex(keyCallback => keyCallback.keys.every(key => keys.includes(key)));

    if (bindIndex !== -1) {
      const bind = this.binds[bindIndex];

      document.removeEventListener('keydown', bind.keydownListener);
      document.removeEventListener('keyup', bind.keyupListener);

      this.binds.splice(bindIndex, 1);
    }
  }
}