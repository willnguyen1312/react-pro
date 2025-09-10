import { CircularDependencies } from "./CircularDependencies";
export const SHARED = "CircularDependencies";

export const greeting = () =>
  `Hello from ${CircularDependencies} and ${SHARED}`;
