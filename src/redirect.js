const currentHref = () =>
  typeof window === "undefined" ? "http://localhost/" : window.location.href;

/** Resolve a target URL and reject executable or unsupported URL schemes. */
export function resolveRedirectTarget(destination, base = currentHref()) {
  const target = new URL(destination, base);
  if (target.protocol !== "http:" && target.protocol !== "https:") {
    throw new TypeError("Redirect targets must use HTTP or HTTPS.");
  }
  return target;
}

/** Perform a full-page redirect in the browser. */
export function redirect(destination, options = {}) {
  if (typeof window === "undefined") return;
  const target = resolveRedirectTarget(destination);
  if (options.replace) window.location.replace(target.href);
  else window.location.assign(target.href);
}

/** Normalize a return destination to a same-origin path. */
export function safeNextPath(value) {
  if (!value || value.includes("\\") || typeof window === "undefined")
    return undefined;

  try {
    const target = new URL(value, window.location.origin);
    if (target.origin !== window.location.origin) return undefined;
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return undefined;
  }
}

/** Redirect to another app and attach a validated local return path. */
export function redirectWithNext(destination, nextPath) {
  const target = resolveRedirectTarget(destination);
  const safeNext = safeNextPath(nextPath);
  if (safeNext) target.searchParams.set("next", safeNext);
  redirect(target.toString());
}
