export const createUrlWithQueryParams = (query: Record<string, string>, pathname: string) => {
  return `${pathname}?${new URLSearchParams(query).toString()}`;
};
