# Publish This Interactive Deck

This is a static site. The files that must be uploaded together are:

- `index.html`
- `styles.css`
- `app.js`
- `data.js`

## Fastest Share Link

Use a static-site host such as Netlify Drop, Vercel, Cloudflare Pages, or GitHub Pages.

For the lowest-friction path:

1. Upload the whole `kinetic-interactive-deck` folder to a static-site host.
2. Make sure `index.html` is at the root of the site.
3. Open the generated URL and test the sidebar, visual toggle, and bottom controls.
4. Share the generated URL.

## Custom Domain

After the static site is live:

1. Buy or use a domain you already own.
2. In your hosting provider, add the custom domain.
3. In your domain registrar, update DNS using the records your host gives you.
4. Wait for DNS to propagate, then test the final URL.

## Notes

- Section links use URL hashes, such as `#overview` and `#competitors`, so no special routing setup is required.
- External source links open in new tabs.
- The deck uses Google Fonts, so it needs internet access for the exact typography.
