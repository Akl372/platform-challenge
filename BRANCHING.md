# Team Branching Strategy

## Branch Structure
* `main` — Production branch (Protected; direct commits forbidden).
* `feature/...` — Used for developing new features and API endpoints.
* `fix/...` — Used for resolving bugs and failing tests.
* `chore/...` — Used for infrastructure, CI/CD, Docker, and documentation.

## Rules
1. All work must take place on a prefixed branch (`feature/`, `fix/`, or `chore/`).
2. Merging into `main` requires 1 teammate approval and passing CI status checks.
3. Commit messages must be descriptive (e.g., "Add PR template", not "update").
