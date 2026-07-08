# Sqills Assessment

## How to Run & Build the Project

For development, make sure you have the following dependencies installed on your machine:
- Node.js
- npm

**Steps**

1. Run `npm install` to install the required dependencies.
2. Run `npm run dev` to start the development server.
3. Run `npm run build` to build the production application.
4. Run `npx serve -s dist` to locally preview the production build.

## Architecture Overview

`main.tsx` wraps the app in MUI's `ThemeProvider` (with `CssBaseline`) and renders `App`, which composes `Header` (title + theme toggle) and `Content` (the demo page). `Content` renders the two feature components side by side: `MultiOriginDestinationFilter` (Scope 3) and a standalone `StationAutocomplete` (Scope 2), so both scopes are visible together in one realistic "journey search" panel.

Both Autocomplete surfaces are thin configurations of MUI's `Autocomplete`, not a bespoke implementation — keyboard navigation, chip rendering/removal, and the clear-all control all come from MUI's own accessible, well-tested behaviour. What is custom is the data layer: `useStationSearchData` (debounced, cancels stale requests, accepts an optional `onSearch` override) and `useStationAutocompleteBase`, which wraps it and returns the MUI props shared by both the single- and multi-select Autocomplete components, so that shared configuration (loading/empty text, option equality, filtering) lives in one place instead of being duplicated. Match highlighting is a small pure function (`getMatchParts`) consumed by both. Scope 3's form state is managed by `react-hook-form`; the origin/destination overlap check and the "mirror" behaviour are pure, independently tested functions (`originDestinationFilter.ts`) rather than logic embedded in the component.

## Design & Theming Approach

The theme (`theme.ts`) uses MUI's `colorSchemes` API to define a light and dark palette (primary/secondary/background) that both resolve through CSS variables, so mode switching doesn't require a remount. `spacingTokens` (`spacing.ts`) is a small named scale (`xs`–`xl`) used directly in `sx` props (e.g. `sx={{ gap: spacingTokens.md }}`) to keep spacing consistent across components without every call site hard-coding numbers.

`useThemeMode` wraps MUI's `useColorScheme` hook and exposes a minimal `{ mode, toggleMode }` API. `Header` consumes it to drive a `Switch` that toggles between light and dark — this is the theme toggle required by the demo page.

## Accessibility Notes

Accessibility is achieved primarily by leaning on MUI's own accessible components rather than adding custom ARIA: `Autocomplete` provides keyboard navigation (↑/↓/Enter/Esc), chip removal (Backspace/Delete), and a clear-all control out of the box; `TextField` keeps labels always visible (never placeholder-only) and wires `label`/`helperText`/`error` to the input's accessible name and description automatically. The destination field's overlap validation error is surfaced through `TextField`'s `error`/`helperText` props, so it's announced the same way any other field error would be.

Match highlighting is currently done with font-weight only (bold matched substrings), which is a visual-only cue — it is not conveyed to screen readers. If this were taken further, wrapping matched segments in a semantic `<mark>` element would be the fix.

## Planning Notes

The sections below capture the thought process and technical direction used to plan this assignment, written before implementation started.

### Process

1. Analyse the requirements, ask questions, and make sure the whole context is clear.
2. Write this planning document before starting to code.
3. Review the document with Claude to validate the technical direction before implementation.
   - Prompt used: *"Hey Claude, here is my assessment and my thought process and technical direction. Review this, give me feedback and make sure I follow best practices. After this, return the whole md file in correct English and good structure."*
4. Set up the base project following the Vite + React documentation, and set up MUI following its own documentation.
5. Implement and test Scope 1 first, since it's an isolated feature compared to Scopes 2 and 3. I'd open a focused pull request that can be reviewed and merged into a feature branch — this keeps the pull request small and easy to review while maintaining steady progress.
6. Implement and test Scope 2.
7. Implement and test Scope 3.
8. Review the implemented code with Claude Code.
9. Finish and review the README, and check that all requirements are met.


### Technical Approach

#### Scope 1 — ThemeProvider

MUI's own theming documentation is sufficient for this scope: defining a light/dark palette, spacing tokens, and exposing a `useThemeMode` hook to toggle between modes.

#### Scope 2 — Autocomplete with Search & Match Highlighting

- **Debounce:** The debounce duration will be configurable, since the right value depends on the use case. A debounced search input improves UX (avoiding unnecessary UI churn) and reduces unnecessary load on the backend by limiting request frequency.
- **Test data:** I initially considered [`Intl.DisplayNames`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames) as a source of realistic option data, since it's a native, widely supported JavaScript API and avoids adding a dependency that would need to be maintained and could introduce a future security risk. However, this API always returns results, which conflicts with the empty, loading, and no-results state requirements — so it isn't used as the data source; static/mocked data is used instead (see Assumptions).
- **Built-in behaviour:** For the remaining autocomplete features, MUI's `Autocomplete` component provides most of what's needed out of the box. I'm relying on MUI's implementation rather than adding custom behaviour, since custom logic takes longer to build, needs ongoing maintenance, and adds complexity.
- **Accessibility:** Labels remain always visible (MUI's default behaviour), paired with clear guiding labels and placeholders that help steer users toward the right input.

**Data-fetching: `useAutocompleteData` hook, not Context**

The component supports an async data source (`onSearch(query) => Promise<Option[]>`), so the data-fetching logic is separated from the input's presentation logic. I'm implementing this as a custom hook (`useAutocompleteData`) rather than a Context provider.

Reasoning:
- A Context is justified when multiple, unrelated components need access to the *same* data instance — for example, a shared cache, shared subscription, or state that must stay in sync across the tree.
- In this assignment, the data is scoped to a single Autocomplete instance at a time (the origin field and destination field in Scope 3 each query independently). There's no shared state to synchronise, so a Context would add an extra layer of indirection (provider setup, consumer wiring) without a corresponding benefit.
- A hook keeps the logic colocated with the component that uses it, is simpler to reason about, and is just as easy to unit test in isolation (call the hook via `renderHook`, assert on returned state).
- If a future requirement introduced shared/cached lookups across multiple components (e.g. the same station list reused in several places with a shared cache), that would be the point to introduce a Context or a dedicated data layer — not before.

Options are lazily loaded where the result set is reasonably small, so the UI isn't blocked and users can select as soon as data becomes available (see Assumptions on list size).

*Optional, out of scope for the core implementation:*
- A Levenshtein-distance-based suggestion feature could improve the search experience further, but this is beyond the assignment's scope.

#### Scope 3 — Multi-Origin-Destination Filter

- Since this involves multiple related inputs, I'm wrapping them in a form and letting React Hook Form manage form state, enabling basic validation — for example, ensuring origin and destination aren't the same.
- The inputs themselves use MUI's default components rather than custom ones.

#### Technical Setup

- TypeScript
- React
- Vite
- MUI

### Testing

Unit testing uses Vitest. Tests stay simple and clear. For MUI components, only a happy-path test is written, and the underlying MUI inputs aren't separately tested, since MUI is a well-established library with thorough test coverage of its own. Custom logic is always tested.

Test descriptions are written to double as documentation (in the spirit of TDD): a test named "allows the user to mirror destination and origin to plan their return journey more easily" communicates intent far better than something like "typing 'a' populates the input." Solid unit test coverage also allows integration and end-to-end tests to stay minimal, since those are comparatively expensive to write and run.

Accessibility testing can be automated with axe, integrated into Playwright, Cypress, or as a Storybook addon. For manual testing, I use the WAVE Evaluation Tool.

### Out of Scope

- **Storybook:** For a feature of this size, I'd normally build and test components in Storybook first — especially for larger features — and discuss them with design and stakeholders before final implementation, to validate direction early and iterate cheaply. For smaller changes, I'd only add Storybook entries if the component is meant to be shared or become part of a design system.
- **Integration/E2E testing:** I'd use Cypress or Playwright, potentially combined with Cucumber, to verify the feature integrates correctly with the rest of the application.
- **Mocking services:** Mock Service Worker or WireMock, combined with Faker.js for realistic mock data, would be my choice for integration testing — but this is overkill at this stage.
- **API client generation:** For the async data hook, I'd normally use a generator like Orval to produce a typed API client from an OpenAPI spec. Overkill for this stage.
- **Authentication:** In a real project, I'd expect authenticated calls to backend services, likely via Axios or an Orval-generated client with an interceptor handling JWT-based authorization. CASL could handle frontend permission checks — always paired with equivalent checks on the backend, since frontend-only permission checks are not a substitute for backend enforcement.
- **Localisation** (e.g. i18n) is out of scope.
- **CI/CD pipeline** setup is out of scope.
- **AI-assisted development optimisation:** To make Claude Code more efficient (and cost-effective) on this project, I'd consider [CodeGraph](https://github.com/colbymchenry/codegraph) to build a graph of the codebase that Claude Code can use as context. This becomes a bigger win as the codebase grows, but for the small codebase in this assignment, it's out of scope.

### Open Questions

**General**
1. What is the context of the problem we're trying to solve?
2. Who are the users?
   - For Scope 2, in a train-station context, a user searching for their next station to buy a ticket might benefit from suggested stations and a simple, clear design.
   - A train operator might need more options and finer control.
3. Is there an existing design system? Consistency with existing design patterns matters for user experience, so if one exists, its conventions should be followed.
4. What are the organisation's coding conventions?

**Scope 3**
1. What is meant by "emit a normalised filter payload"?
2. Why would there be multiple origins and multiple destinations?

### Assumptions

In the absence of answers to the open questions above, the following assumptions are made to keep the scope implementable:

- **No live backend:** No backend or API is available, so option data is static/mocked rather than fetched from a real service (this is also why `Intl.DisplayNames` was ruled out — see Scope 2).
- **List size:** Station lists are assumed small enough that a basic (non-virtualised) list and lazy-loaded options are sufficient, per the assignment's note that virtualisation is optional and a basic list is acceptable.
- **No design system:** No existing design system is provided, so MUI's default theme and components are used as the design foundation rather than custom styling.
- **Normalised filter payload:** Interpreted as an object with `origins: Station[]` and `destinations: Station[]` (or their ids), deduplicated, in a consistent shape regardless of how many chips are selected — pending clarification from the open question above.
- **Single-page scope:** "Realistic scenario" is interpreted as a single-page journey search filter panel, without routing, per the deliverables section of the assignment.
- **English-only UI:** The demo UI only needs to support English, since localisation is explicitly out of scope.

### Design Thoughts

**UI/UX**

It's worth keeping Nielsen Norman's 10 usability heuristics in mind when building features. For example:

*Heuristic 2: Match Between System and the Real World* — it's important to speak the user's language. A ticket-buying user might call something a "station," while a train operator might call the same thing a "terminal." Being aware of this kind of terminology mismatch matters when naming UI elements.

**Build Tooling**

Since this is a small, standalone project, npm is a reasonable choice, with Bun as a faster alternative. In a monorepo setting, pnpm, Nx, or Turborepo would be worth considering instead.

**Risks**

For every new feature, I check what potential security risks it could introduce. For this project, I don't see any specific risks introduced by these components themselves. That said, I'd double-check that the API backing the filter and autocomplete has rate-limiting and a solid caching strategy in place, to ensure it can handle load from a large number of concurrent users.