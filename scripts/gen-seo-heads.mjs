/* One-off generator: writes the SEO head of every page from js/content.js
   so the static HTML matches what js/app.js renders at runtime. */
import { readFileSync, writeFileSync } from "node:fs";

const URL_BASE = "https://yolo-safaris.onrender.com";
const SHARE_IMAGE = URL_BASE + "/assets/social-share.jpg";
const SHARE_ALT =
  "YOLO Safaris logo beside elephants, giraffes and acacia trees on the Kenyan savanna";
const ORG_ID = URL_BASE + "/#organization";
const SITE_ID = URL_BASE + "/#website";

const SITE = eval(readFileSync("js/content.js", "utf8") + "\n;SITE");

function tokens(value) {
  return String(value).replace(/\{(\w+)\}/g, function (match, name) {
    const map = {
      price: SITE.package.price,
      per: SITE.package.per,
      duration: SITE.package.duration,
      durationLong: SITE.package.durationLong,
      durationAdjective: SITE.package.durationAdjective,
      destinationCount: SITE.destinations.length,
      phone: SITE.contact.phoneDisplay,
      email: SITE.contact.email,
      year: new Date().getFullYear(),
    };
    return Object.prototype.hasOwnProperty.call(map, name) ? map[name] : match;
  });
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const ORGANISATION = {
  "@type": "TravelAgency",
  "@id": ORG_ID,
  name: SITE.meta.siteName,
  url: URL_BASE + "/",
  logo: URL_BASE + "/assets/logo.jpeg",
  image: SHARE_IMAGE,
  description:
    "A Kenya-based tour operator running guided safari routes from Nairobi " +
    "through the Rift Valley to the Maasai Mara, and to Mombasa and Diani.",
  email: SITE.contact.email,
  telephone: SITE.contact.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nakuru",
    addressCountry: "KE",
  },
  areaServed: { "@type": "Country", name: "Kenya" },
};

function graph(nodes) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }, null, 2)
    .split("\n")
    .map(function (line) {
      return line ? "  " + line : line;
    })
    .join("\n");
}

function breadcrumbs(items) {
  return {
    "@type": "BreadcrumbList",
    "@id": items[items.length - 1].url + "#breadcrumb",
    itemListElement: items.map(function (item, index) {
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      };
    }),
  };
}

function webPage(url, title, description, extra) {
  return Object.assign(
    {
      "@type": "WebPage",
      "@id": url + "#webpage",
      url: url,
      name: title,
      description: description,
      inLanguage: "en",
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      creator: {
        "@type": "Organization",
        name: SITE.footer.credit.label,
        url: SITE.footer.credit.href,
      },
    },
    extra || {}
  );
}

function structuredData(page) {
  const url = page.url;
  const nodes = [ORGANISATION];
  const trail = [{ name: "Home", url: URL_BASE + "/" }];

  if (page.key === "home") {
    nodes.push({
      "@type": "WebSite",
      "@id": SITE_ID,
      url: URL_BASE + "/",
      name: SITE.meta.siteName,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    });
    nodes.push(
      webPage(url, page.title, page.description, {
        isPartOf: { "@id": SITE_ID },
      })
    );
    nodes.push({
      "@type": "FAQPage",
      "@id": url + "#faq",
      url: url,
      inLanguage: "en",
      isPartOf: { "@id": SITE_ID },
      mainEntity: SITE.home.faq.items.map(function (item) {
        return {
          "@type": "Question",
          name: tokens(item.q),
          acceptedAnswer: { "@type": "Answer", text: tokens(item.a) },
        };
      }),
    });
  } else if (page.destination) {
    const destination = page.destination;
    nodes.push(webPage(url, page.title, page.description));
    trail.push({ name: "Destinations", url: URL_BASE + "/destinations.html" });
    trail.push({ name: destination.name, url: url });
    nodes.push(breadcrumbs(trail));
  } else {
    nodes.push(webPage(url, page.title, page.description));
    trail.push({ name: page.breadcrumb, url: url });
    nodes.push(breadcrumbs(trail));
  }

  return graph(nodes);
}

const PAGES = [
  { file: "index.html", prefix: "", key: "home", path: "" },
  { file: "about.html", prefix: "", key: "about", path: "about.html", breadcrumb: "About" },
  {
    file: "destinations.html",
    prefix: "",
    key: "destinations",
    path: "destinations.html",
    breadcrumb: "Destinations",
  },
  { file: "contact.html", prefix: "", key: "contact", path: "contact.html", breadcrumb: "Contact" },
].concat(
  SITE.destinations.map(function (destination) {
    return {
      file: "destinations/" + destination.slug + ".html",
      prefix: "../",
      key: "destination",
      path: "destinations/" + destination.slug + ".html",
      destination: destination,
    };
  })
);

PAGES.forEach(function (page) {
  const source = readFileSync(page.file, "utf8");
  const comment = source.match(/<meta name="viewport"[^>]*>\n([\s\S]*?)  <title>/);
  const commentBlock = comment ? comment[1] : "\n";

  const title = tokens(
    page.destination ? page.destination.metaTitle : SITE.pages[page.key].title
  );
  const description = tokens(
    page.destination ? page.destination.metaDescription : SITE.pages[page.key].description
  );
  page.title = title;
  page.description = description;
  page.url = URL_BASE + "/" + page.path;

  const lines = [
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    commentBlock.replace(/\n$/, ""),
    "  <title>" + esc(title) + "</title>",
    '  <meta name="description" content="' + esc(description) + '">',
    '  <link rel="canonical" href="' + page.url + '">',
    '  <meta name="robots" content="index, follow, max-image-preview:large">',
    '  <meta name="theme-color" content="#003d13">',
    "",
    "  <!-- Icons generated from assets/logo.jpeg. See the README. -->",
    '  <link rel="icon" href="' + page.prefix + 'assets/favicon.ico" sizes="any">',
    '  <link rel="icon" type="image/png" sizes="32x32" href="' + page.prefix + 'assets/favicon-32.png">',
    '  <link rel="icon" type="image/png" sizes="192x192" href="' + page.prefix + 'assets/favicon-192.png">',
    '  <link rel="apple-touch-icon" href="' + page.prefix + 'assets/apple-touch-icon.png">',
    "",
    "  <!-- Open Graph and Twitter/X cards. js/app.js refreshes these from",
    "       SITE.pages and SITE.destinations when the page runs. -->",
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="' + SITE.meta.siteName + '">',
    '  <meta property="og:title" content="' + esc(title) + '">',
    '  <meta property="og:description" content="' + esc(description) + '">',
    '  <meta property="og:url" content="' + page.url + '">',
    '  <meta property="og:image" content="' + SHARE_IMAGE + '">',
    '  <meta property="og:image:width" content="1200">',
    '  <meta property="og:image:height" content="630">',
    '  <meta property="og:image:alt" content="' + esc(SHARE_ALT) + '">',
    '  <meta name="twitter:card" content="summary_large_image">',
    '  <meta name="twitter:title" content="' + esc(title) + '">',
    '  <meta name="twitter:description" content="' + esc(description) + '">',
    '  <meta name="twitter:image" content="' + SHARE_IMAGE + '">',
    '  <meta name="twitter:image:alt" content="' + esc(SHARE_ALT) + '">',
    "",
    "  <!-- Structured data: the business, this page and where it sits in the site. -->",
    '  <script type="application/ld+json">',
    structuredData(page),
    "  </script>",
    "",
    '  <link rel="stylesheet" href="' + page.prefix + 'css/styles.css">',
  ];

  const head = "<head>\n" + lines.join("\n") + "\n</head>";
  if (!/<head>[\s\S]*?<\/head>/.test(source)) throw new Error("no head in " + page.file);
  const output = source.replace(/<head>[\s\S]*?<\/head>/, function () {
    return head;
  });
  writeFileSync(page.file, output);
  console.log("wrote " + page.file + " -> " + page.url);
});
