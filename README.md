# YOLO Safaris — website

A plain HTML, CSS and JavaScript site. No build step, no npm, no frameworks, no
external requests. It works by opening a file directly and by serving the folder
statically.

Every price, destination, FAQ entry and contact detail lives in one object in
`js/content.js`. The HTML files are structure only; `js/app.js` fills them in.

---

## 1. Open the site

Quickest way — just open the home page in a browser:

```
open index.html          # macOS
xdg-open index.html      # Linux
```

Better, and required if you want to test the booking form, which needs a real
HTTP origin:

```
python3 -m http.server 8099
```

Then visit <http://localhost:8099/>.

Do not test the booking form by opening `contact.html` straight from disk. The
`file://` origin breaks `fetch`, so the form can only report a failure.

---

## 2. Deploy it

It is a static site, so anything that serves files will do.

**Netlify Drop** — go to <https://app.netlify.com/drop> and drag the whole
folder onto the page. You get a live URL in seconds. Add a custom domain later
under Site settings → Domain management.

**GitHub Pages** — push this repo to GitHub, then Settings → Pages → Source:
*Deploy from a branch*, branch `main`, folder `/ (root)`. The site appears at
`https://<user>.github.io/<repo>/`.

**Any other static host** — upload the folder as-is. There is no build command
and no output directory.

Once the real domain is live, update `SITE.meta.url` in `js/content.js`. It is
used for the canonical link and the social share tags.

---

## 3. Edit the content

Everything the visitor reads is in `js/content.js`, inside one object:

```js
const SITE = { ... };
```

Nothing else needs touching. A few examples:

| To change | Edit |
| --- | --- |
| The price | `SITE.package.price` |
| The duration | `SITE.package.duration` and `durationLong` |
| Phone, WhatsApp, email | `SITE.contact` |
| The hero headline | `SITE.home.hero.headline` |
| A destination's words | the matching object in `SITE.visits` |
| An FAQ answer | `SITE.home.faq.items` |
| A footer line | `SITE.footer` |

The price and duration are written once and reused everywhere through tokens:
`{price}`, `{per}`, `{duration}`, `{durationLong}`, `{visitCount}`, `{phone}`,
`{email}`, `{year}`. Change the value in `SITE.package` and the hero, the
itinerary, the FAQ, the footer and the emails all follow.

### Page titles and meta descriptions

`SITE.pages` holds one entry per page. Visit pages have their own
`metaTitle` / `metaDescription` inside `SITE.visits`.

### Which sections appear on which page

Each page's HTML is a list of empty containers:

```html
<section class="section" data-render="points" data-key="home.why"></section>
```

`data-render` picks the builder in `js/app.js`; `data-key` is the path into
`SITE`. To reorder sections, move those lines. To drop a section, delete the
line. `data-render` names available: `header`, `footer`, `hero`, `points`,
`prose`, `covered`, `itinerary`, `booking`, `impact`, `faq`, `closing`,
`featured`, `visit-grid`, `team`, `page-head`, `visit`, `contact`.

### Adding an eighth visit

1. Add one object to `SITE.visits` in `js/content.js`, copying an existing one
   and changing the fields. Set `region` to one of `SITE.visitsPage.regions`,
   and add `featured: true` if it should also appear on the home page.
2. Copy `visits/diani.html` to `visits/<new-slug>.html`.
3. In the new file, change `data-visit="diani"` on the `<body>` tag to your new
   slug. That is the only line that differs.

The nav, the visits grid, the footer list, the home cards and the
previous/next links all pick it up automatically.

### Swapping a placeholder for a real photo

Every image slot already has a generated placeholder behind it, so nothing is
ever broken.

1. Drop your photo into the matching folder, keeping the same name but using
   `.jpg` — for example `images/destinations/maasai-mara.jpg`.
2. Point the entry in `js/content.js` at the new file:

```js
card:   "images/destinations/maasai-mara.jpg",   // 16:9, visit cards and banners
banner: "images/destinations/maasai-mara.jpg",
gallery: [
  { src: "images/destinations/maasai-mara-1.jpg", alt: "..." },   // 3:2
  ...
],
```

3. Update `alt` to describe the photograph, and leave `width` and `height`
   alone unless your file has a different shape.

Slot sizes: **16:9** for banners and visit cards (`1600 x 900`), **3:2** for
gallery shots (`1200 x 800`), **4:5** for the guide portraits in
`images/team/` (`900 x 1125`).

---

## 4. Setting up the booking form

The form posts to [Formspree](https://formspree.io) over AJAX, so the guest
stays on the page and sees an inline confirmation.

Until it is connected the form deliberately does nothing except tell the guest
to email or WhatsApp instead. That is the `REPLACE_WITH_FORM_ID` value in
`SITE.form.endpoint`.

1. Create a free account at <https://formspree.io>.
2. Create a new form and set its notification address to
   `yolosafaris@gmail.com`. This is where enquiries arrive.
3. Copy the form's endpoint, which looks like
   `https://formspree.io/f/abcdwxyz`.
4. Open `js/content.js` and paste it into `SITE.form.endpoint`, replacing
   `https://formspree.io/f/REPLACE_WITH_FORM_ID`.
5. Serve the folder and test one real submission:

   ```
   python3 -m http.server 8099
   ```

   Open <http://localhost:8099/contact.html>, fill the form in with your own
   details, and send it.
6. Confirm two things: the page shows *"Thank you — we'll reply within 24
   hours."* without navigating away, and the enquiry arrives at
   `yolosafaris@gmail.com`. Reply to that email to check it goes back to the
   guest — Formspree uses the `email` field as the Reply-To address.

If anything fails, the page keeps the guest's details and shows the direct
email and WhatsApp links underneath, so nobody is ever stranded.

### What the form sends

`name`, `email`, `country`, `dates`, `guests`, `tripType`, `message`, plus two
hidden fields: `_subject` (the notification subject line) and `package` (the
current price and duration, so every email says which package was enquired
about). A hidden `_gotcha` field catches spam bots.

---

## 5. Files

```
index.html                    home
about.html                    about us
visits.html                   all visits, grouped by region
visits/<slug>.html            one page per visit (seven)
contact.html                  contact and booking form
css/styles.css                all styling, every token in one :root block
js/content.js                 ALL copy and data — the only file you edit
js/app.js                     renders the pages from content.js
js/parallax.js                the banner parallax helper
assets/                       logo, brochure, favicons, hero and share image
images/destinations/          visit cards (16:9) and gallery shots (3:2)
images/team/                  guide portrait placeholders
```

### The parallax helper

`js/parallax.js` moves `.parallax-layer` inside anything marked
`data-parallax`. Each banner keeps a fixed height (`--parallax-height` in
`css/styles.css`) and clips the overflow, and the inner image is 115% tall, so
the movement can never expose a gap.

The instructions for copying the markup into a new section are in the comment
at the top of `js/parallax.js`. Keep the `data-parallax` number between `0.05`
and `0.2`. It starts writing `transform` from one `requestAnimationFrame` pass
per scroll, does nothing at all under `prefers-reduced-motion: reduce`, and is
switched off below 768px.

---

## 6. Still to confirm (all marked `TODO(owner)` in `js/content.js`)

Search `js/content.js` for `TODO(owner)`.

1. **Duration.** The printed brochure says *"7 Day Stay in Kenya"*; this build
   says 6 days / 5 nights. Fix `SITE.package.duration` and `durationLong`.
2. **Charity wording.** Confirm *"a portion of every booking"* is the approved
   phrasing. No percentage is stated anywhere.
3. **Deposit and balance terms.** `SITE.contactPage.payment` is generic until
   the real amounts and due date are set.
4. **Cancellation and refund wording.** `SITE.home.booking.note`.
5. **Formspree form ID.** `SITE.form.endpoint` — see section 4 above.
6. **Guides.** `SITE.about.team` has placeholder portraits and no names.
   Supply real names, roles and photographs.
7. **The Maasai Mara to the coast leg.** Confirm whether guests travel by road
   or by a domestic flight, then say so in the Mombasa entry of `SITE.visits`.
8. **Payment methods.** `SITE.home.faq.items` says details are sent on
   confirmation; name the methods you actually accept.
9. **Group size.** The FAQ answer is generic until you set a usual and maximum
   number.
10. **Photography.** Every image is a generated placeholder except the home
    hero and the share image, which are crops from the brochure. Replace them
    with real photographs when you have them.
11. **Site URL.** `SITE.meta.url`, once the domain is live.

---

## 7. Notes for whoever edits the code next

- No cookies, no tracking, no third-party embeds. The only outbound request the
  site ever makes is the Formspree submission.
- `js/app.js` writes text with `textContent`, never `innerHTML`, so text from
  `js/content.js` can never be treated as markup.
- Because the pages are rendered from `js/content.js`, a visitor with
  JavaScript switched off sees a short fallback: the price, the duration and
  the contact details, in the `<noscript>` block on every page. Keep those
  values in step with `SITE.package` and `SITE.contact` if you change them.
- Verify changes at a few widths before publishing. The layout was checked from
  280px up to 3440px wide: no horizontal scrolling, nothing spilling outside
  the viewport and no clipped banners at any size.
