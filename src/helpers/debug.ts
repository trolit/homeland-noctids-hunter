export function debug(message: string) {
  if (process.env.FARM_DEBUG_MODE !== "1") {
    return;
  }

  console.log(`%cDEBUG:%c${message}`, "color: yellow;");
}
