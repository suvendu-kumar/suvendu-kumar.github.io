# Suvendu Kumar — Portfolio

A static, single-page portfolio site (HTML/CSS/JS, no build step required).

## Host it on GitHub Pages (free)

1. Create a new GitHub repository — e.g. `suvendukumar.github.io` (use exactly
   `<your-username>.github.io` if you want it at the root of your GitHub domain,
   or any name like `portfolio` if you're fine with a `/portfolio` sub-path).
2. Unzip this folder and upload **all three files** (`index.html`, `styles.css`,
   `script.js`, `README.md`) to the root of that repository — either by dragging
   them into the GitHub web UI ("Add file" → "Upload files") or via git:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`, then click **Save**.
5. Wait a minute or two — your site will be live at:
   - `https://<your-username>.github.io/` (if the repo is named `<your-username>.github.io`), or
   - `https://<your-username>.github.io/<repo-name>/` (for any other repo name).

## Editing content

- All text lives directly in `index.html` — search for the section you want to
  change (`<section id="overview">`, `<section id="publications">`, etc.).
- Colors, fonts, and spacing are controlled by CSS variables at the top of
  `styles.css` (the `:root` block) if you want to restyle without touching layout.
- `script.js` only handles the mobile menu and the active-section highlight in
  the sidebar — no build tools or dependencies needed.

## Local preview

Just open `index.html` in a browser, or run a tiny local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
