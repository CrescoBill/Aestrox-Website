- Keep the homepage as a continuous scrolling product overview, with dedicated leaf pages for product and company navigation because users need shareable working pages.
- Render the product previews as interactive React interfaces rather than embedding the reference screenshot, so they stay crisp and usable.
- Pre-optimize the homepage's React-based UI dependencies in Vite to avoid late dependency discovery mixing React chunks in already-open previews.

- Share navigation, demo dialogs, and scroll reveals through SiteShell in the root layout so every page stays consistent.
- Keep sample billing interactions client-side and label simulated transactions clearly because no payment or booking service is connected.
