export default class Emitter {
  #state;
  #listeners;
  #willUpdateListeners;

  constructor(initialState = {}) {
    this.#state = initialState;
    this.#listeners = new Map();
    this.#willUpdateListeners = new Set();
  }

  get state() {
    return this.#state;
  }

  on(props, listener) {
    if (!Array.isArray(props)) props = [props];

    props.forEach((prop) => {
      if (!this.#listeners.has(prop)) this.#listeners.set(prop, []);
      this.#listeners.get(prop).push(listener);
    });
  }

  set(state) {
    const prevState = { ...this.#state };
    const nextState = { ...this.#state, ...state };

    const changedProps = [...this.#listeners.keys()].filter((prop) => {
      const prevValue = this.#getValue(prevState, prop);
      const nextValue = this.#getValue(nextState, prop);
      return prevValue !== nextValue;
    });

    if (changedProps.length >= 1) this.#updateState(changedProps, nextState, prevState);
  }

  #getValue(state, prop) {
    return prop.split(".").reduce((obj, key) => obj[key], state);
  }

  #updateState(changedProps, nextState, prevState) {
    this.#state = nextState;

    changedProps.forEach((prop) => {
      [...this.#listeners.get(prop).values()].forEach((listener) => {
        this.#willUpdateListeners.add(listener);
      });
    });

    this.#willUpdateListeners.forEach((listener) => listener(nextState, prevState));
    this.#willUpdateListeners.clear();
  }
}
