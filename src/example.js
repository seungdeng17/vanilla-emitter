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
