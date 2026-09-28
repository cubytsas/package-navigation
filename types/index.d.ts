export type NavigationOptions = {
  /** Return true for same-origin paths handled by the current client-side router. */
  isInternalRoute?: (pathname: string) => boolean;
  /** Event dispatched after a same-origin route is pushed into browser history. */
  eventName?: string;
};

export declare function navigate(
  destination: string,
  options?: NavigationOptions,
): void;
export declare function withQuery(
  destination: string,
  values: Record<string, string | undefined>,
  base?: string,
): string;

export {
  redirect,
  redirectWithNext,
  resolveRedirectTarget,
  safeNextPath,
} from "./redirect.js";
