import { one } from "./1.mjs";

export const two = () => {
  one();
};

export const shared2 = () => {
  console.log("This is a shared function from 2");
};
