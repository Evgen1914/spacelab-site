import { useSyncExternalStore } from "react";

const noop = () => () => {};

// true только в браузере — чтобы не было расхождений с серверной разметкой (корзина в localStorage)
export const useMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
