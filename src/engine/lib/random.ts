/**
 * Generate a random number between two values.
 */
export const random = (min: number, max: number): number =>
  Math.random() * (max - min) + min;
