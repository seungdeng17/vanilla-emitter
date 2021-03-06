# vanilla-emitter
상태 기반 이벤트 에미터

```javascript
import Emitter from "./Emitter.js";

const emitter = new Emitter({
  name: "Taek",
  str: 10,
  dex: 10,
  int: 10,
});

emitter.on("name", (nextState, prevState) => {
  console.log("이전 상태: ", prevState);
  console.log("현재 상태: ", nextState);
});

emitter.on(["str", "dex", "int"], (nextState, prevState) => {
  console.log("이전 상태: ", prevState);
  console.log("현재 상태: ", nextState);
});

emitter.set({
  name: "Seungtaek",
});

emitter.set({
  str: 20,
  dex: 15,
});

console.log('최종 상태: ', emitter.state);
```

```javascript
결과

// name 변경
이전 상태:  { name: 'Taek', str: 10, dex: 10, int: 10 }
현재 상태:  { name: 'Seungtaek', str: 10, dex: 10, int: 10 }

// str, dex 변경
이전 상태:  { name: 'Seungtaek', str: 10, dex: 10, int: 10 }
현재 상태:  { name: 'Seungtaek', str: 20, dex: 15, int: 10 }

최종 상태:  { name: 'Seungtaek', str: 20, dex: 15, int: 10 }
```
