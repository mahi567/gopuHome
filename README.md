# gopuhomestays website

A static website built with [Astro](https://astro.build). There is no backend and no
database: every property is a small file in this folder, and `Build site` turns
everything into plain HTML you upload to your own server.

Content is edited with [Decap CMS](https://decapcms.org), which runs on this
computer only. It is never uploaded to the live site.

## One-time setup

1. Install Node.js (version 20 or newer) from https://nodejs.org.
2. Keep this whole folder somewhere safe. It is the master copy of the site.

## Editing content

1. Double-click **`Edit site.bat`** (or run `npm run edit`). Keep the black window open.
2. The editor opens at http://localhost:4321/admin/. Press **Login** (there is no password).
3. Choose **Properties** to add, change or delete a property, or **Site settings**
   for the phone number, WhatsApp number, social links and category text.
4. Press **Publish** to save. The preview at http://localhost:4321/ updates straight away.
5. Close the black window when you are done.

The editor loads its screen from the internet (unpkg.com), so the computer needs to
be online while editing.

### Adding a property

Press **+ Property**, fill in the form and upload photos. The first photo becomes
the card photo. Resize large photos to about 1200 px wide first.

The new property automatically gets its own page, a card in the listings, its photos
in the Gallery, and is counted on the home page.

Its page address comes from the name. "Gopu Homestay PG (G8)" becomes
`/stays/gopu-homestay-pg-g8/`.

## Putting the site live on your server

1. Double-click **`Build site.bat`** (or run `npm run build`).
2. Upload **everything inside the `dist` folder** to your web server's public folder
   (for example `public_html` or `/var/www/html`), replacing the old files.

Repeat both steps every time content changes. Any web server works (Apache, Nginx,
IIS, shared hosting); it only has to serve files.

Notes for the server:

- The site expects to live at the root of a domain (`https://example.com/`), not in
  a sub-folder.
- Pages are folders with an `index.html` (for example `/stays/pg-g1/index.html`),
  which every common web server handles by default.
- Once the domain is known, set `site` in `astro.config.mjs` so link previews on
  WhatsApp and Facebook show the right photo.

## Enquiries

Every enquiry goes to WhatsApp. The enquiry buttons across the site open a WhatsApp
chat with your number, and the form on the Contact page opens WhatsApp with the
visitor's details already written as a message. Call buttons dial the phone number.
Both numbers are in Site settings. No email address is shown on the site.

## Where things are

| What | Where |
|---|---|
| Properties (one file each) | `src/content/stays/` |
| Phone, WhatsApp, social links | `src/data/site.json` |
| Category names and text | `src/data/types.json` |
| Photos | `public/images/` (editor uploads go to `public/images/uploads/`) |
| Pages | `src/pages/` |
| Header, footer, page frame | `src/layouts/Base.astro` |
| Colours and layout | `src/styles/global.css` |
| Browser behaviour | `src/scripts/site.js` |
| Editor form fields | `public/admin/config.yml` |

## For developers

```
npm install
npm run dev      # site at http://localhost:4321
npm run edit     # site + editor helper, opens /admin/
npm run build    # writes dist/ (the editor is removed from dist)
npm run preview  # serve dist/ locally
```

Back up this folder, or keep it in a Git repository, so content history is not lost.
