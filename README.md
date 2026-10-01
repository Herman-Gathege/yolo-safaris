# YOLO Safaris website

A plain HTML, CSS and JavaScript site. No build step, no npm, no frameworks, no
external requests. It works by opening a file directly and by serving the folder
statically.

Every price, destination, FAQ entry and contact detail lives in one object in
`js/content.js`. The HTML files are structure only; `js/app.js` fills them in.

---

## 1. Open the site

Quickest way: just open the home page in a browser:

```
open index.html          # macOS
xdg-open index.html      # Linux
```

Better, and required if you want to test the booking form, which needs a real
HTTP origin:

```
python3 -m http.server 8099
```

Then open <http://localhost:8099/>.

Do not test the booking form by opening `contact.html` straight from disk. The
`file://` origin breaks `fetch`, so the form can only report a failure.

---

## 2. Deploy it

It is a static site, so anything that serves files will do.


**Netlify Drop.** Go to <https://app.netlify.com/drop> and drag the whole
folder onto the page. You get a live URL in seconds. Add a custom domain later
under Site settings → Domain management.

**GitHub Pages.** Push this repo to GitHub, then Settings → Pages → Source:
*Deploy from a branch*, branch `main`, folder `/ (root)`. The site appears at
`https://<user>.github.io/<repo>/`.

**Any other static host.** Upload the folder as-is. There is no build command
and no output directory.

`SITE.meta.url` in `js/content.js` is the canonical origin,
`https://yolo-safaris.onrender.com/`. It drives the canonical link, the Open
Graph and Twitter tags, and the absolute URLs in the page heads and
`sitemap.xml`. If the domain ever changes, update it in `js/content.js`,
`robots.txt`, `sitemap.xml` and the static page heads together.

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
| A destination's words | the matching object in `SITE.destinations` |
| An FAQ answer | `SITE.home.faq.items` |
| A footer line | `SITE.footer` |

The price and duration are written once and reused everywhere through tokens:
`{price}`, `{per}`, `{duration}`, `{durationLong}`, `{durationAdjective}`,
`{destinationCount}`, `{phone}`, `{email}`, `{year}`. Change the value in
`SITE.package` and the hero, the itinerary, the FAQ, the footer and the emails
all follow.

### Page titles and meta descriptions

`SITE.pages` holds one entry per page. Destination pages have their own
`metaTitle` / `metaDescription` inside `SITE.destinations`.

Because the pages are rendered by JavaScript, each HTML file also carries a
static copy of its title, description, canonical URL, Open Graph tags and
JSON-LD, so crawlers that do not run JavaScript still see them. After editing a
title or description in `js/content.js`, regenerate the static copies:

```
node scripts/gen-seo-heads.mjs
```

That one command also rewrites the favicon links and the structured data, so it
is the only thing to run after any change to titles, the routes or the price.
See section 8 for what the generator writes and why.

### Which sections appear on which page

Each page's HTML is a list of empty containers:

```html
<section class="section" data-render="points" data-key="home.why"></section>
```

`data-render` picks the builder in `js/app.js`; `data-key` is the path into
`SITE`. To reorder sections, move those lines. To drop a section, delete the
line. `data-render` names available: `header`, `footer`, `hero`, `points`,
`prose`, `covered`, `itinerary`, `booking`, `impact`, `faq`, `closing`,
`featured`, `destination-grid`, `team`, `page-head`, `destination`, `contact`.

### Adding an eighth destination

1. Add one object to `SITE.destinations` in `js/content.js`, copying an existing one
   and changing the fields. Set `region` to one of `SITE.destinationsPage.regions`,
   and add `featured: true` if it should also appear on the home page.
2. Copy `destinations/diani.html` to `destinations/<new-slug>.html`.
3. In the new file, change `data-destination="diani"` on the `<body>` tag to your new
   slug. That is the only line that differs.

The nav, the destinations grid, the footer list, the home cards and the
previous/next links all pick it up automatically.

### Swapping a placeholder for a real photo

Every image slot already has a generated placeholder behind it, so nothing is
ever broken.

1. Drop your photo into the matching folder, keeping the same name but using
   `.jpg`, for example `images/destinations/maasai-mara.jpg`.
2. Point the entry in `js/content.js` at the new file:

```js
card:   "images/destinations/maasai-mara.jpg",   // 16:9, destination cards and banners
banner: "images/destinations/maasai-mara.jpg",
gallery: [
  { src: "images/destinations/maasai-mara-1.jpg", alt: "..." },   // 3:2
  ...
],
```

3. Update `alt` to describe the photograph, and leave `width` and `height`
   alone unless your file has a different shape.

Slot sizes: **16:9** for banners and destination cards (`1600 x 900`), **3:2** for
gallery shots (`1200 x 800`), **4:5** for the guide portraits in
`images/team/` (`900 x 1125`).

---

## 4. Setting up the booking form

The form posts to [Formspree](https://formspree.io) over AJAX, so the guest
stays on the page and sees an inline confirmation.

The live form is `https://formspree.io/f/xjykzaal`, set in `SITE.form.endpoint`
in `js/content.js`, and it notifies `yolosafaris@gmail.com`.

If `SITE.form.endpoint` is ever emptied or reset to `REPLACE_WITH_FORM_ID` the
form deliberately does nothing except tell the guest to email or WhatsApp
instead, so a missing form ID can never post anywhere.

1. Create a free account at <https://formspree.io>.
2. Create a new form and set its notification address to
   `yolosafaris@gmail.com`. This is where enquiries arrive.
3. Copy the form's endpoint, which looks like
   `https://formspree.io/f/abcdwxyz`.
4. Open `js/content.js` and paste it into `SITE.form.endpoint`.
5. Serve the folder and test one real submission:

   ```
   python3 -m http.server 8099
   ```

   Open <http://localhost:8099/contact.html>, fill the form in with your own
   details, and send it.
6. Confirm two things: the page shows *"Thank you. We'll reply within 24
   hours."* without navigating away, and the enquiry arrives at
   `yolosafaris@gmail.com`. Reply to that email to check it goes back to the
   guest. Formspree uses the `email` field as the Reply-To address.

If anything fails, the page keeps the guest's details and shows the direct
email and WhatsApp links underneath, so nobody is ever stranded.

### Why enquiries land in Gmail's Spam folder

Two different things get called "spam" here. Keep them apart, because the fix
for each is different.

*Spam submissions* are bots filling the form in. `_gotcha` and Formspree's own
filter already handle those, and nothing needs doing.

*Spam placement* is a real enquiry that Formspree emailed correctly but Gmail
filed under Spam. The form is not at fault: a test post to the live endpoint
returns `{"ok":true}`, so submissions reach Formspree and Formspree sends the
notification. What happens next is decided by Gmail.

Formspree sends notifications from its own domain, `@formspree.io`, with the
guest's address as the Reply-To. A personal Gmail account has no history with
that domain, and a short form dump that contains an email address and a
free-text message looks like the contact-form phishing that spammers send, so
Gmail scores it up. Nothing in `js/app.js` or `js/content.js` changes that.

Fix it in this order:

1. **Train the mailbox.** Open the message in Spam, choose *Not spam*, then
   reply to it once. Add `no-reply@formspree.io` to Contacts. This is instant
   and usually enough on its own.
2. **Add a filter.** In Gmail, *Settings → Filters → Create a filter*, set
   `From: @formspree.io`, and choose *Never send it to Spam*, plus a label such
   as `Enquiries`. Use `Has the words: YOLO Safaris` if you prefer to keep the
   scope narrow.
3. **Send from your own domain (the durable fix).** In Formspree, verify a
   domain you control and send notifications from it, then publish its SPF,
   DKIM and DMARC records in DNS. Mail signed by a domain you own lands in the
   inbox far more reliably than mail from a shared form provider.
4. **Move off a personal Gmail address.** A mailbox on your own domain (Google
   Workspace, Zoho, Fastmail) has domain records you can control and far fewer
   false positives than a free Gmail account.

Whichever you pick, keep the `email` field in the form named `email`: that is
the field Formspree reads to set the Reply-To, so a reply in Gmail goes back to
the guest and not to Formspree.

### What the form sends

`name`, `email`, `country`, `dates`, `guests`, `tripType`, `message`, plus two
hidden fields: `_subject` (the notification subject line) and `package` (the
current price and duration, so every email says which package was enquired
about). A hidden `_gotcha` field catches spam bots.

---

## 5. Files

```
index.html                     home, with a parallax hero
about.html                     about us, with a parallax hero
destinations.html              all destinations grouped by region, with a parallax hero
destinations/<slug>.html       one page per destination (seven), each with a parallax hero
contact.html                   contact and booking form, with a parallax hero
googleed60a8b79f45490f.html    Google Search Console ownership proof. Do not rename or delete.
robots.txt                     allows all crawlers and points to the sitemap
sitemap.xml                    the public pages, their lastmod date and their images
favicon.ico                    site-root icon, a copy of assets/favicon.ico
scripts/gen-seo-heads.mjs      regenerates the static SEO head of every page
css/styles.css                 all styling, every token in one :root block
js/content.js                  ALL copy and data. The only file you edit
js/app.js                      renders the pages from content.js
js/parallax.js                 the banner parallax helper
assets/                        logo, brochure, favicons and the share image
assets/logo-512.png            square 512x512 logo used by the structured data
assets/favicon-32.png          favicon, 32x32
assets/favicon-48.png          favicon, 48x48 — Google's minimum for search results
assets/favicon-96.png          favicon, 96x96 — used by Google on high-DPI screens
assets/favicon-192.png         favicon, 192x192
assets/favicon.ico             multi-size icon: 16, 32, 48, 64, 128 and 256
assets/apple-touch-icon.png    home-screen icon on iOS, 180x180
images/home-hero.jpeg          hero for the home page
images/destinations-hero.jpeg  hero for the destinations page
images/about-hero.jpeg         hero for the about page
images/contact-hero.jpeg       hero for the contact page
images/destinations/           destination cards (16:9), gallery shots (3:2)
images/team/                   guide portrait placeholders
```

### The hero images

Every page opens with the same parallax banner. The four page heroes are the
four `*-hero.jpeg` files above; Lake Elementaita, Mombasa and Diani also have
real photos at `images/destinations/<slug>.jpg`. Nairobi, Nyeri, Maasai Mara and
Narok still show generated placeholders, so drop a photo in as
`images/destinations/<slug>.jpg` and point `card` and `banner` at it in
`js/content.js`.

The banner height is `--parallax-height` in `css/styles.css`, and the darkening
over the photograph is the single `.banner::after` gradient in the same file.

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
5. **Formspree form ID.** Done: `SITE.form.endpoint` is
   `https://formspree.io/f/xjykzaal`. What is still open is deliverability —
   verifying a sending domain so notifications stop landing in Spam. See
   section 4 above.
6. **Guides.** The guides section was removed from the about page on request.
   Add `SITE.about.team` back and restore the `data-render="team"` line in
   `about.html` if it should return, then supply real names and photographs.
7. **The Maasai Mara to the coast leg.** Confirm whether guests travel by road
   or by a domestic flight, then say so in the Mombasa entry of `SITE.destinations`.
8. **Payment methods.** `SITE.home.faq.items` says details are sent on
   confirmation; name the methods you actually accept.
9. **Group size.** The FAQ answer is generic until you set a usual and maximum
   number.
10. **Photography.** Every image is a generated placeholder except the home
    hero and the share image, which are crops from the brochure. Replace them
    with real photographs when you have them.
11. **Site URL.** Done: `SITE.meta.url` is `https://yolo-safaris.onrender.com/`,
    and `robots.txt`, `sitemap.xml` and the page heads use the same origin.

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

---

## 8. Being found: the brand, the favicon and the Google side

### The brand name is not unique

At least one other operator runs a safari site as "YOLO Safaris", including
`yolosafaris.com`. A brand search for the plain name will not be won on words
alone, so everything these pages publish says which operator this is:

* every title and description carries **Kenya**, and the home title reads
  **"YOLO Safaris Kenya"**;
* the structured data sets `alternateName: "YOLO Safaris Kenya"` and gives the
  Nakuru address, the Kenyan phone number, the price and the two routes;
* the routes are published as priced `Offer` and `TouristTrip` entries in an
  `OfferCatalog`, so the packages read as bookable trips rather than as prose.

The single biggest remaining lever is the domain. The canonical origin is a
free `onrender.com` subdomain while the competitor holds an exact-match `.com`,
and search engines treat the older, exact-match domain as the better answer for
"YOLO Safaris". A domain of your own (`yolo-safaris.co.ke`, or any other)
pointed at this host is worth more than any further on-page change. When it
happens, update `SITE.meta.url`, `robots.txt`, `sitemap.xml` and the generator's
`URL_BASE`, then re-run `node scripts/gen-seo-heads.mjs`.

Two things to add once they exist: real social profiles (Facebook, Instagram,
YouTube) in the `sameAs` list of the `TravelAgency` node, and a Google Business
Profile for the Nakuru address. Both tie this site to one entity and separate
it from the operator that shares the name.

### The favicon in search results and in tabs

Google shows a site icon beside the result, which is the favicon, and it only
accepts an icon that is square and a **multiple of 48px** — 48x48, 96x96 and so
on. The icon files here are generated from `assets/logo-mark.png`:

```
python3 - <<'PY'
from PIL import Image
mark = Image.open("assets/logo-mark.png").convert("RGBA")
for n, name in [(32,"favicon-32.png"),(48,"favicon-48.png"),(96,"favicon-96.png"),
                (192,"favicon-192.png")]:
    mark.resize((n,n), Image.LANCZOS).save("assets/"+name)
PY
```

`assets/favicon.ico` and the `favicon.ico` in the site root are built the same
way and carry 16, 32, 48, 64, 128 and 256px sizes. Every page declares the
48x48 and 96x96 PNGs, and the root `favicon.ico` is there for browsers and
crawlers that ask for it without reading the HTML.

Google re-reads the favicon when it next crawls, so a change here can take a
few weeks to appear. Confirm it in Search Console with **URL Inspection → Test
live URL** on the home page and check that `/favicon.ico` and
`/assets/favicon-96.png` both return 200.
