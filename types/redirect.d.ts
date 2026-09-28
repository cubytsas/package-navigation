export type RedirectOptions = { replace?: boolean };

export declare function resolveRedirectTarget(
  destination: string,
  base?: string,
): URL;
export declare function redirect(
  destination: string,
  options?: RedirectOptions,
): void;
export declare function safeNextPath(value?: string): string | undefined;
export declare function redirectWithNext(
  destination: string,
  nextPath?: string,
): void;
