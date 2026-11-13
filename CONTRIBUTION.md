# 🤝 Contributing Guidelines

Thank you for your interest in contributing to the **Reminder Application**! To keep our codebase clean, stable, and collaborative, we enforce strict workflow and code review standards.

---

## 🚨 Golden Rules

1. **NO Direct Commits or Pushes to `main`**: 
   - Direct pushes to the `main` branch are strictly prohibited.
   - All changes must go through a feature branch and a Pull Request (PR).
2. **Mandatory Code Review**:
   - Every Pull Request must be reviewed and approved by **at least one other team member** before it can be merged.
   - Self-merges or unreviewed merges are not permitted.

---

## 🛠️ Step-by-Step Contribution Workflow

### 1. Create a Branch
Always branch off from an up-to-date `main` branch. Use a descriptive naming convention:

```bash
git checkout main
git pull origin main
git checkout -b <type>/<short-description>
```

**Branch naming examples:**
- `feature/email-notifications`
- `fix/timezone-calculation`
- `docs/update-readme`
- `refactor/api-endpoints`

---

### 2. Make Your Changes & Commit
- Write clean, formatted, and well-documented code.
- Write meaningful commit messages:
  ```bash
  git commit -m "feat: add recurring reminder scheduling logic"
  ```

---

### 3. Keep Your Branch Updated
Before opening a PR, ensure your branch is synced with the latest `main`:
```bash
git fetch origin
git rebase origin/main  # or: git merge origin/main
```

---

### 4. Open a Pull Request (PR)
1. Push your branch to the remote repository:
   ```bash
   git push -u origin <branch-name>
   ```
2. Open a Pull Request targeting the `main` branch.
3. Fill out the PR description with:
   - **Summary of changes**: What problem does this solve?
   - **How to test**: Steps for reviewers to verify the changes.
   - **Screenshots / Logs**: (if applicable).

---

### 5. Review & Approval Process
- Request a review from at least one teammate.
- Respond promptly to review comments or feedback.
- **Once at least one other member approves the PR and all checks pass**, the branch may be merged into `main`.
- Delete the feature branch after merging to keep the repository tidy.

---

## 💡 Code Quality & Best Practices
- Ensure code runs without errors or warnings locally before pushing.
- Avoid committing secrets, credentials, environment files (`.env`), or large build artifacts.
- Keep PRs focused: smaller, well-scoped PRs are reviewed and merged much faster.
