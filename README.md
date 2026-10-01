# Marro docs

The documentation at https://docs.marro.si, built and hosted by [Mintlify](https://mintlify.com).

## After an API change: run one command

```bash
npm run update
```

That is the only thing to run. It:

1. downloads the API's OpenAPI document from https://app.marro.si/api/v1/openapi.json into `openapi.json`,
2. regenerates the snippets in `snippets/generated/` (scopes, errors, rate limits, filtering, the website guide's fields, responses and code),
3. regenerates one page per endpoint in `api-reference/` and the "API reference" tab in `docs.json`.

It is idempotent: if the API has not changed, nothing changes. Commit what it changed and push; Mintlify publishes on push.

Options: `OPENAPI_URL=<url> npm run update` reads another server; `OPENAPI_OFFLINE=1 npm run update` regenerates from the `openapi.json` already here.

Optional check before pushing (downloads the Mintlify CLI; does not start a server):

```bash
npm run check   # mint validate && mint broken-links
```

## What is written by hand, and what is not

Facts about the API (scopes, error codes, limits, request and response fields, filter operators, code samples) come only from `openapi.json`. Never edit `snippets/generated/`, `api-reference/` or the "API reference" tab in `docs.json`; change the CRM's OpenAPI document (`lib/api/openapi.ts` in the CRM) and run `npm run update`.

The pages at the root and in `guides/` are short glue: an intro, the website guide's steps, and links. Each includes its generated snippet.

| Page | File | Generated part |
| --- | --- | --- |
| Introduction | `index.mdx` | `snippets/generated/overview.mdx` |
| Getting started | `getting-started.mdx` | `snippets/generated/authentication.mdx` |
| Authentication | `authentication.mdx` | `snippets/generated/authentication.mdx` |
| Keys and scopes | `keys-and-scopes.mdx` | `snippets/generated/scopes.mdx` |
| Connect a website | `guides/connect-a-website.mdx` | `snippets/generated/capture.mdx` |
| Filtering leads | `guides/filtering.mdx` | `snippets/generated/filtering.mdx` |
| Errors | `errors.mdx` | `snippets/generated/errors.mdx` |
| Rate limits | `rate-limits.mdx` | `snippets/generated/rate-limits.mdx` |
| API reference | `api-reference/**` | all of it |

### Extensions the generator reads when the CRM's document has them

These are optional. When present, the matching tables appear on the next `npm run update`.

```jsonc
// components.securitySchemes.<scheme>
"x-scopes": { "leads.read": { "label": "Read leads", "description": "…", "module": "crm" } },
"x-key-types": [
  { "name": "Website form", "scopes": ["leads.capture"], "lifetimeDays": 730, "description": "…" },
  { "name": "Application", "lifetimeDays": 90, "description": "…" }
],

// document root
"x-rate-limits": [
  { "label": "Per key", "limit": 600, "window": "hour" },
  { "label": "Per organization", "limit": 3000, "window": "hour" }
],
"x-max-body-bytes": 100000,
"x-transport-errors": [{ "status": 400, "code": "KEY_IN_URL", "when": "…" }],

// the `filter` parameter of GET /api/v1/leads
"x-filter-operators": {
  "maxFilters": 10,
  "byType": [{ "types": ["text", "email"], "operators": [{ "id": "contains", "label": "contains", "takes": "`value`" }] }]
},

// any operation (also shown by Mintlify on the endpoint's page)
"x-codeSamples": [{ "lang": "php", "label": "PHP / WordPress", "source": "…" }]
```

The generator also moves schemas the CRM nests in `$defs` (referenced as `#/$defs/Name`) into `components.schemas`, because OpenAPI tools, Mintlify included, resolve those references from the document root and fail otherwise.

## Connecting Mintlify (one time)

1. In the [Mintlify dashboard](https://dashboard.mintlify.com), connect the GitHub repository `marro-docs`, branch `main`, docs at the repository root (where `docs.json` is).
2. Settings → Custom domain: add `docs.marro.si`. Mintlify then shows the DNS records to add at the domain provider:
   - `TXT _acme-challenge.docs.marro.si` with the value shown in the dashboard (the TLS certificate),
   - `TXT _cf-custom-hostname.docs.marro.si` with the value shown in the dashboard (domain ownership),
   - `CNAME docs.marro.si → cname.mintlify.builders`.
   Add the TXT records first, then the CNAME.

After that every push to `main` publishes.

## Look

Theme `willow`, primary colour `#008450`, font Plus Jakarta Sans (the app's font), text name "Marro" with no logo image, no background decoration. Set in `docs.json`.
