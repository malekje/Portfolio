# Malek Mayeh — Portfolio

Static site (HTML + CSS + vanilla JS, no build step), deployed with GitHub Pages.

- `index.html` — content
- `styles.css` — design system & layout
- `main.js` — nav, scroll reveal, interactive architecture diagrams

## Placeholders to fill
Every unverified detail is marked with `class="ph"` and renders as an amber dashed chip ("✎ …").
Find them all with:

    grep -n 'class="[^"]*ph' index.html

## Local preview

    python -m http.server 8000
