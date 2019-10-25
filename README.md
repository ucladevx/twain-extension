# twain-extension

The chrome extension for the Twain scheduling app.

To install extension:

1. Pull latest version.
2. Run `npm install` to install dependencies and `npm run build` to create a build distribution in `/build`.
3. In Chrome's extension page, toggle 'Developer Mode'.
4. Select 'Load Unpacked' and select the `/build folder`.
5. Go to [Google calendar](https://calendar.google.com/calendar) and use the Twain icon to toggle the sidebar.

On any changes, run `npm run build` again to rebuild and refresh Twain in the extensions panel.
