import { shared2 } from "./2.mjs";

export const one = () => {
  shared2();
};

export const shared1 = () => {
  console.log("This is a shared function from 1");
};

one();
