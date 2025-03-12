# ❓What is Bindify
**Bindify** is _an intuitive key binding_ library.

# 📝Example
```typescript
import {Keybinder} from '@axuata/bindify';

const keybinder = new Keybinder();

keybinder.createKeybind(['Shift', 'a'], () => {
  console.log('Shift + a');
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
=> [Keys](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values)
- `removeKeybind(keys: string[])`
=> Removes a keybind.

# 📜Changelog
## 0.1.1
- Removed axuata-bindify-0.1.0.tgz
## 0.2.0
- Add: removeKeybind function
- Add: JSDoc
- Add: Test codes for new features