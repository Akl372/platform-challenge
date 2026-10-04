# Engineering Challenge — From Code to Container to Infrastructure

**Team:** 4 students  
**Platform:** GitHub + GitHub Actions  
**Technologies:** Node.js, Docker, Terraform

## Scenario

You have inherited a small Node.js application. The application contains a defect that causes an automated test to fail.

Your team must establish a professional development workflow:

**Issue → Branch → Code → Pull Request → Review → Approval → Merge → CI → Container → Package → Infrastructure validation**

There is **no cloud provider connection**. Terraform must be validated locally in CI; no cloud deployment is required.

## Mandatory objectives

### 1. GitHub collaboration

Create a GitHub repository.

- Do not develop directly on `main`.
- Use feature/fix branches.
- Use GitHub Issues.
- Create issue templates to handle bugs or feature requests.
- Create a Pull Request template.
- Protect `main`.
- Require at least **1 approval** before merging.
- Require successful CI checks before merging where practical.

The instructor must see at least one PR that was created from a branch, reviewed by another student, approved, validated by CI, and merged.

### 2. Team branching strategy

Define and document your branching strategy.

At minimum:

```text
main
 ├── feature/...
 ├── fix/...
 └── chore/...
```

Every branch must have a purpose.

Commit history should contain meaningful commits.

Bad:

```text
update
fix
test
final
final-final
```

Better:

```text
Add task status validation
Add regression test for invalid status
Add task filtering by status
```

### 3. Pull Requests and reviews

Create a Pull Request template and use it for every PR.

Every PR must:

- reference an issue;
- explain the changes;
- explain testing;
- contain the checklist;
- receive at least one review;
- address review feedback before merging.


Each student must review at least one Pull Request from another team member.

A review must contain at least one useful technical observation.

Do not create artificial comments such as "LGTM" only.


### 4. Fix the Node.js application

Start with the failing test.

Create an issue with:

- problem description,
- current behavior,
- expected behavior,
- acceptance criteria.

Create a branch, diagnose the root cause, fix it, and ensure:

```bash
npm test
```

passes.

Do not delete or weaken tests to make CI green.

### 5. Node.js CI

Create `.github/workflows/node-ci.yml`.

On pull requests and/or pushes to `main`, the workflow must:

1. check out the code,
2. install a supported Node.js version,
3. install dependencies,
4. run tests.

**Bonus:** dependency vulnerability scanning.

### 6. Add tasks feature
Each student must implement one feature. Create the issue using the template, implement and test it, create the pull request.
Another student reviews, CI pass and approval before merge.

#### Issue #1 — Add task listing
As a user, I want to retrieve all tasks so that I can see the current work items.
Acceptance criteria:
- GET /tasks returns HTTP 200.
- The response is a JSON array.
- Each task has id, title, and completed.
- Automated tests cover the endpoint.

#### Issue #2 — Create a task
As a user, I want to create a task.
Acceptance criteria:
- POST /tasks accepts { "title": "..." }.
- A unique ID is generated.
- The new task is returned.
- An empty title returns HTTP 400.
- Automated tests are included.

#### Issue #3 — Complete a task
- Add the ability to mark a task as completed.
PATCH /tasks/:id
Example:
```
{
  "completed": true
}
```
Acceptance criteria:
- Existing task can be updated.
- Unknown task returns HTTP 404.
- Invalid input returns HTTP 400.
- Tests are included.

#### Issue #4 — Delete a task
- Add DELETE /tasks/:id.
Acceptance criteria:
- Existing task is deleted.
- HTTP 204 is returned.
- Unknown task returns HTTP 404.
- Tests are included.



### 7. Docker

Create or improve:

- `Dockerfile`
- `.dockerignore`

The image must build and run:

```bash
docker build -t devops-platform-challenge .
docker run --rm -p 3000:3000 devops-platform-challenge
```

### 8. Docker CI/CD

Create `.github/workflows/docker.yml`.

The workflow must:

1. check out the repository,
2. build the image,
3. authenticate to GitHub Container Registry,
4. tag the image,
5. push it to the repository's package/container registry.

**Bonus:** scan the image for vulnerabilities.

### 9. Terraform validation

Create `.github/workflows/terraform.yml`.

There is no cloud provider.

At minimum run:

```bash
terraform fmt -check
terraform init
terraform validate
```

Trigger the workflow when Terraform files change.

### 10. README

Produce a professional README containing:

- project purpose,
- architecture,
- local setup,
- tests,
- Docker usage,
- CI/CD explanation,
- Terraform explanation,
- development workflow,
- useful commands.

A diagram is encouraged.

## Mandatory quality-gate demonstration

Demonstrate both:

### Broken change

Temporarily introduce a change that makes a test fail.

Expected:

- CI fails,
- the PR cannot be merged.

### Correct change

Fix the problem.

Expected:

- CI passes,
- a teammate approves,
- the PR can be merged.

Restore the repository to a working state.

## Suggested team organization

| Student | Initial responsibility |
|---|---|
| Student 1 | GitHub workflow, Issues, PR templates, branch protection |
| Student 2 | Node.js defect, tests, Node CI |
| Student 3 | Docker and container pipeline |
| Student 4 | Terraform pipeline and documentation |

Responsibilities should overlap through reviews. Each student should make at least one meaningful contribution.

## Bonuses

Only attempt these after mandatory requirements work:

- Node.js dependency vulnerability scan
- Docker vulnerability scan
- ESLint/code quality
- test coverage
- Node.js version matrix
- dependency caching
- non-root Docker execution
- smaller/multi-stage Docker image
- Terraform lint/security scanning
- automated GitHub Release
- image tagging from Git tags
