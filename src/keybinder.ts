export class Keybinder {
  createKeybind(keys: string[], callback: () => void): void {
    const pressedKeys: Set<string> = new Set<string>();
    document.addEventListener('keydown', (e) => {
      pressedKeys.add(e.key);

      const pressedArray = Array.from(pressedKeys);

      if (pressedArray.length === keys.length) {
        if (pressedArray.sort().join(',') === keys.sort().join(',')) {
          callback();
        }
      }
    });
  }
}