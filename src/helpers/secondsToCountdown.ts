export function secondsToCountdown(durationInSeconds: number) {
  const hours = ~~(durationInSeconds / 3600);
  const minutes = ~~((durationInSeconds % 3600) / 60);
  const seconds = ~~durationInSeconds % 60;

  let result = "";

  if (hours > 0) {
    result += `${hours}h:${minutes < 10 ? "0" : ""}`;
  }

  result += `${minutes}m:${seconds < 10 ? "0" : ""}${seconds}s`;

  return result;
}
