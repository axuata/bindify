# ❓What is Bindify
**Bindify** is _an intuitive key binding_ library.

# 📝Example
```typescript
import {Keybinder} from '@axuata/bindify';

const keybinder = new Keybinder();

keybinder.createKeybind(['ControlLeft', 'KeyS'], () => {
  console.log('Saved! (ControlLeft + KeyS)');
});
```

# 🚀Installation
- Requires **Node.js** version **>=18.0.0** (**18.0.0** or **above**)
```shell
# npm
npm install @axuata/bindify

# yarn
yarn add @axuata/bindify

# pnpm
pnpm install @axuata/bindify
```

# ⚙️Functions
- `createKeybind(keys: string[], callback: () => void)`  
=> Creates a keybind.  
=> [Keys values](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values)
- `removeKeybind(keys: string[])`
=> Removes a keybind.

# ⚠️Warning
- If you call `createKeybind` **multiple times with the same key**, running `removeKeybind` will remove **the first registered keybind**, not the most recent one.
  - so, It's recommended **not** to register **multiple keybinds** with **the same key**.

# 📜Changelog
## 0.1.1
- Removed axuata-bindify-0.1.0.tgz
## 0.2.0
- Add: removeKeybind function
- Add: JSDoc
- Add: Test codes for new features
## 0.2.1
- Add: Keywords for npm
- Docs: Update README.md to warn users
- Docs: Update JSDoc comment
## 0.3.0
- Add: Use `event.code`
- Refactor: Removed unnecessary `if` statement