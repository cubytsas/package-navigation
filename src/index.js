import { redirect, resolveRedirectTarget } from "./redirect.js";

/**
 * Navigate internally when a path belongs to the active SPA; otherwise do a full-page redirect.
 *
 * @param {string} destination
 * @param {{isInternalRoute?: (pathname: string) => boolean, eventName?: string}} [options]
 */
export function navigate(destination, options = {}) {
  if (typeof window === "undefined") return;
  const target = resolveRedirectTarget(destination);
  const { isInternalRoute, eventName = "cubyt:navigate" } = options;

  if (
    target.origin === window.location.origin &&
    isInternalRoute?.(target.pathname)
  ) {
    window.history.pushState(
      null,
      "",
      `${target.pathname}${target.search}${target.hash}`,
    );
    window.dispatchEvent(new Event(eventName));
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  redirect(target.href);
}

/** Build an absolute URL with query values while preserving existing parameters. */
export function withQuery(destination, values, base) {
  const url = resolveRedirectTarget(destination, base ?? window.location.href);
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, value);
  }
  return url.toString();
}
