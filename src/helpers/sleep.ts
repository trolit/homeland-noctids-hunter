export function sleep(seconds: number) {
  if (!seconds || seconds < 0) {
    throw new Error(`Seconds arg '${seconds}' is invalid}!`);
  }

  if (seconds > 30) {
    throw new Error(
      `You tried to invoke sleep for ${seconds} seconds. Seems like typo.`,
    );
  }

  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
