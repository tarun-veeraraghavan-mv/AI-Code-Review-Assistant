# 🧠 Code Standards - [Startup Name]

_Last Updated: 2025-06-02_

## 1. 🏗️ Project Structure

- Use `src/` for all logic.
- Group by **feature, not by type** (feature folders).
- Use `components/`, `hooks/`, `utils/`, `services/`, `lib/`, etc. inside `src/`.

```
src/
  └── dashboard/
      ├── components/
      ├── hooks/
      └── services/
```

## 2. 🧹 Naming Conventions

- Variables: `camelCase`
- Functions: `camelCase`
- Components: `PascalCase`
- Files/Folders: `kebab-case`
- Constants: `UPPER_SNAKE_CASE`

**✅ Good:**

```js
getUserData();
UserCard.jsx;
```

**❌ Bad:**

```js
Get_user_data();
usercard.jsx;
```

## 3. 🚨 Linting & Formatting

- Prettier + ESLint **must be set up**
- Use `.prettierrc` and `.eslintrc` shared across all repos
- Auto-format on save (use VSCode settings)

**Default Prettier Settings:**

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100
}
```

## 4. ⚙️ Git Rules

- Branch: `feature/xyz`, `fix/bug`, `hotfix/patch`
- Always PR with title and short description
- PR title format: `[feat|fix|refactor]: description`
- Avoid committing commented code or console logs

## 5. 📦 Dependencies

- No random packages — use only **approved tools**:
  - UI: Tailwind, shadcn/ui
  - HTTP: Axios or fetch
  - State: React Query or Redux Toolkit
  - Forms: React Hook Form
  - Auth: JWT / OAuth (no Firebase)

## 6. 🧪 Testing

- Use `Vitest` or `Jest` + `React Testing Library`
- Minimum 80% coverage for any **core** logic
- Write tests for:
  - Business logic
  - Edge cases
  - Major components

## 7. 🛠️ API & Backend Rules

- Use REST or GraphQL — **be consistent**
- Always document endpoints (Swagger or GraphQL Playground)
- Validate all inputs (Zod or class-validator)
- Return meaningful error messages, not stack traces

## 8. 🧠 Code Style

- Prefer `async/await` over `.then()`
- DRY: Reuse hooks/utils if used twice or more
- Keep components under **200 lines**
- Split reusable logic into hooks (`useXyz`)

## 9. 🔐 Security

- No secrets in code (use `.env`)
- Sanitize all user inputs
- Rate-limit auth endpoints
- Use HTTPS-only cookies if session-based

## 10. 🤝 Code Reviews

- Every PR needs review unless it's a hotfix
- Comments must be constructive and specific
- Reject code that:
  - Breaks lint rules
  - Has no test coverage (if needed)
  - Is unclear or uncommented complex logic

---

> 💥 _“We don’t ship perfect code, but we ship readable, reliable, and maintainable code.”_
