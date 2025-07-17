export const getWindowWidth = (): number => {
  if (typeof window === "undefined") {
    return 0;
  }
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
};
