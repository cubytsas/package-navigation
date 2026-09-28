# @cubyt/navigation

Shared browser navigation and redirect helpers for Cubyt applications. It has no runtime dependencies and does not require a framework.

## Install

```sh
npm install @cubyt/navigation
```

For local development in this repository:

```sh
npm install ../branding/packages/navigation
```

## SPA navigation with a full-page fallback

```ts
import { navigate } from "@cubyt/navigation";

navigate("/es/monitor", {
  isInternalRoute: (pathname) =>
    pathname.startsWith("/es/") || pathname.startsWith("/en/"),
});
```

Known same-origin SPA routes use the History API and dispatch `cubyt:navigate` by default. Other destinations use `window.location.assign`, which supports navigation between separately deployed Cubyt apps.

## Redirects and auth return paths

```ts
import {
  redirect,
  redirectWithNext,
  safeNextPath,
} from "@cubyt/navigation/redirect";

redirect("https://auth.cubyt.co/login");
redirectWithNext("https://auth.cubyt.co/login", "/projects?tab=recent");
const next = safeNextPath(
  new URLSearchParams(location.search).get("next") ?? undefined,
);
```

Redirect helpers only accept HTTP(S) URLs. `safeNextPath` rejects cross-origin return targets to reduce open-redirect risk. Use the function when accepting a `next` value from a URL; do not redirect directly to an unchecked query parameter.

`withQuery(url, values)` builds an absolute URL and preserves existing query parameters. The package is intended for browser apps; redirect functions are no-ops during server-side rendering.

## Publishing

This package is maintained at [CubytsAS/package-navigation](https://github.com/CubytsAS/package-navigation). Use its **Publish to npm** GitHub Actions workflow to publish after validating the package contents. The workflow calls the shared organization workflow in [`CubytsAS/.github`](https://github.com/CubytsAS/.github).

The organization must provide an Actions secret named `NPM_TOKEN` with publish access to the `@cubyt` npm scope. Do not commit npm credentials or place them in package files. Increment `version` in `package.json` before publishing; npm versions are immutable.
