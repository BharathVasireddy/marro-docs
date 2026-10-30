## Connected repositories

Marro is three repositories that describe one product. Keep them consistent: a change to a name, a feature, a
claim, the legal entity, pricing or positioning in one repository is made in the others in the same piece of work.

| Repository | What it is | GitHub | Local |
| --- | --- | --- | --- |
| marro-app | The CRM (app.marro.si), its API and the mobile app (`mobile/`) | https://github.com/BharathVasireddy/marro-app | `~/Documents/marro-app` |
| marro-site | The marketing site (marro.si) | https://github.com/BharathVasireddy/marro-site | `~/Documents/marro-site` |
| marro-docs | The documentation (docs.marro.si, Mintlify) | https://github.com/BharathVasireddy/marro-docs | `~/Documents/marro-docs` |

- Before renaming anything users see (a module, a page, a feature), search all three for the old name and change
  every mention, including the CRM's assistant wording and the mobile app.
- The API reference and `snippets/generated/` come from marro-app's OpenAPI document (`lib/api/openapi.ts` there):
  change it in marro-app and run `npm run update` here, never edit the generated files (see README.md).
- Every feature built or changed in marro-app also updates marro-docs in the same piece of work: the hand-written
  guide that covers it (or a new one), and `npm run update` there when the API changed. Docs that lag the product are a bug.
- Each repository commits and pushes on its own; say in the handoff which of them changed and which still need a push.
