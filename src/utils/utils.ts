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

export const formatDateToLocaleString = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Date(date).toLocaleString(undefined, options);
};
