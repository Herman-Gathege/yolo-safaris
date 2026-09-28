/* ==========================================================================
   YOLO Safaris app
   --------------------------------------------------------------------------
   Reads the SITE object from js/content.js and fills every element marked
   data-render="..." in the page. There is no site copy in this file.

   Each page says what it is on <body>:

     <body data-page="home">                          index.html
     <body data-page="about">                         about.html
     <body data-page="destinations">                        destinations.html
     <body data-page="destination" data-destination="maasai-mara"> destinations/maasai-mara.html
     <body data-page="contact">                       contact.html

   Every value is written with textContent, never innerHTML, so text from
   content.js can never be treated as markup.
   ========================================================================== */
(function () {
  "use strict";

  if (typeof SITE === "undefined") {
    console.error("js/content.js did not load, so the page cannot render.");
    return;
  }

  /* ================================================== Page context ====== */

  var pageName = document.body.getAttribute("data-page") || "home";
  var base = pageName === "destination" ? "../" : "";
  var slug = document.body.getAttribute("data-destination") || "";
  var destinationIndex = -1;
  SITE.destinations.forEach(function (item, index) {
    if (item.slug === slug) destinationIndex = index;
  });
  var destination = destinationIndex > -1 ? SITE.destinations[destinationIndex] : null;

  var HERO_SPEED = "0.12";  /* subtle: keep within 0.05 to 0.2 */
  var ABSOLUTE = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

  /* ======================================================= Helpers ====== */

  /* Reads "home.hero.headline" out of SITE. */
  function pick(path) {
    return path.split(".").reduce(function (node, key) {
      return node == null ? node : node[key];
    }, SITE);
  }

  /* Swaps {price}-style tokens for current SITE values, so a price or a
     phone number is only ever edited in one place. */
  function tokens(value) {
    if (value == null) return "";
    return String(value).replace(/\{(\w+)\}/g, function (match, name) {
      var map = {
        price: SITE.package.price,
        per: SITE.package.per,
        duration: SITE.package.duration,
        durationLong: SITE.package.durationLong,
        destinationCount: SITE.destinations.length,
        phone: SITE.contact.phoneDisplay,
        email: SITE.contact.email,
        year: new Date().getFullYear(),
        name: destination ? destination.name : "",
      };
      return Object.prototype.hasOwnProperty.call(map, name) ? map[name] : match;
    });
  }

  function text(path) {
    return tokens(pick(path));
  }

  /* Page links are written from the site root, so destination pages need "../". */
  function link(href) {
    if (!href || ABSOLUTE.test(href)) return href;
    return base + href;
  }

  /* Image files are written from the site root too. */
  function asset(path) {
    if (!path || ABSOLUTE.test(path)) return path || "";
    return base + path;
  }

  function make(tag, className, content, href) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (content != null) node.textContent = tokens(content);
    if (href) node.setAttribute("href", link(href));
    return node;
  }

  function para(className, content) {
    return make("p", className, content);
  }

  /* The one image helper: width, height and alt are always set, and
     everything except the home hero image is lazily loaded. */
  function image(src, alt, width, height, lazy) {
    var node = document.createElement("img");
    node.src = asset(tokens(src));
    node.alt = tokens(alt || "");
    node.width = width;
    node.height = height;
    if (lazy === false) node.decoding = "eager";
    else node.setAttribute("loading", "lazy");
    return node;
  }

  /* A <div class="wrap">, which every section body sits inside. */
  function wrap() {
    return make("div", "wrap");
  }

  /* A heading block: title, then one short intro line. */
  function head(data) {
    var box = make("div", "section__head");
    if (data.title) box.appendChild(make("h2", "section__title", data.title));
    if (data.intro) box.appendChild(para("section__intro", data.intro));
    return box;
  }

  /* ======================================================== Header ====== */

  function buildHeader(host) {
    var bar = make("div", "wrap header");

    var brand = make("a", "brand", null, "index.html");
    brand.appendChild(image(SITE.brand.mark, SITE.brand.markAlt, 256, 256, true));
    brand.appendChild(make("span", "brand__name", SITE.brand.name));
    bar.appendChild(brand);

    var nav = make("nav", "nav");
    nav.id = "site-menu";
    nav.setAttribute("aria-label", text("ui.navLabel"));
    var list = make("ul", "nav__list");
    SITE.nav.forEach(function (item) {
      var li = document.createElement("li");
      var anchor = make("a", "nav__link", item.label, item.href);
      if (item.page === pageName || (pageName === "destination" && item.page === "destinations")) {
        anchor.setAttribute("aria-current", "page");
        anchor.classList.add("is-current");
      }
      li.appendChild(anchor);
      list.appendChild(li);
    });
    nav.appendChild(list);
    bar.appendChild(nav);

    var actions = make("div", "header__actions");
    actions.appendChild(make("a", "btn btn--primary", SITE.headerCta.label, SITE.headerCta.href));

    var toggle = make("button", "menu-toggle");
    toggle.id = "menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-controls", "site-menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", text("ui.menuOpen"));
    for (var i = 0; i < 3; i++) {
      toggle.appendChild(make("span", "menu-toggle__bar"));
    }
    actions.appendChild(toggle);

    bar.appendChild(actions);
    host.appendChild(bar);
  }

  /* ======================================================== Footer ====== */

  function footerList(title, entries) {
    var column = document.createElement("div");
    column.appendChild(make("h2", "footer__title", title));
    var list = make("ul", "footer__list");
    entries.forEach(function (entry) {
      var li = document.createElement("li");
      li.appendChild(entry.link
        ? make("a", null, entry.label, entry.href)
        : make("span", null, entry.label));
      list.appendChild(li);
    });
    column.appendChild(list);
    return column;
  }

  function buildFooter(host) {
    var inner = make("div", "wrap footer__inner");

    var brandColumn = make("div", "footer__brand");
    brandColumn.appendChild(image(SITE.brand.mark, SITE.brand.markAlt, 256, 256, true));
    brandColumn.appendChild(para(null, SITE.footer.blurb));
    inner.appendChild(brandColumn);

    inner.appendChild(footerList(SITE.footer.exploreTitle, SITE.nav.map(function (item) {
      return { label: item.label, href: item.href, link: true };
    })));

    inner.appendChild(footerList(SITE.footer.destinationsTitle, SITE.destinations.map(function (item) {
      return { label: item.name, href: "destinations/" + item.slug + ".html", link: true };
    })));

    inner.appendChild(footerList(SITE.footer.contactTitle, [
      { label: SITE.contact.phoneDisplay, href: SITE.contact.phoneHref, link: true },
      { label: SITE.contact.whatsappLabel, href: SITE.contact.whatsappHref, link: true },
      { label: SITE.contact.email, href: SITE.contact.emailHref, link: true },
      { label: SITE.contact.base },
    ]));

    host.appendChild(inner);

    var small = make("div", "wrap footer__small");
    small.appendChild(para(null, SITE.footer.smallPrint));
    small.appendChild(para(null, SITE.footer.notIncludedLine));
    host.appendChild(small);
  }

  /* ========================================================== Hero ====== */

  /* A fixed-height parallax banner with a single legibility overlay. */
  function banner(src, alt, eyebrow, title, speed, variant) {
    var section = make("section", "banner" + (variant ? " " + variant : ""));
    section.setAttribute("data-parallax", speed);

    var layer = make("div", "parallax-layer");
    layer.appendChild(image(src, alt, 1600, 900, true));
    section.appendChild(layer);

    var content = make("div", "wrap banner__content");
    if (eyebrow) content.appendChild(para("eyebrow", eyebrow));
    content.appendChild(make("h1", "banner__title", title));
    section.appendChild(content);

    return section;
  }

  function buildHero(host) {
    var hero = SITE.home.hero;

    var section = banner(hero.image, hero.imageAlt, hero.eyebrow, hero.headline,
      HERO_SPEED, "banner--hero");
    host.appendChild(section);

    /* The brand line, the two calls to action and the five key facts sit on
       white directly under the banner, so the photograph carries the headline
       and nothing has to compete with it for room. */
    var body = wrap();
    body.classList.add("hero__body");
    body.appendChild(para("hero__tagline", hero.tagline));

    var actions = make("div", "actions");
    actions.appendChild(make("a", "btn btn--primary", hero.primaryCta.label, hero.primaryCta.href));
    actions.appendChild(make("a", "btn btn--outline", hero.secondaryCta.label, hero.secondaryCta.href));
    body.appendChild(actions);

    var facts = make("ul", "facts");
    hero.facts.forEach(function (fact) {
      facts.appendChild(make("li", null, fact));
    });
    body.appendChild(facts);
    host.appendChild(body);
  }

  /* ======================================================== Sections ==== */

  /* An inner page that opens like the landing page: the same parallax banner
     with the page name over the photograph, then a line under it. */
  function buildPageHero(host, data) {
    host.appendChild(banner(data.image, data.imageAlt, data.eyebrow, data.title, HERO_SPEED));
    var body = wrap();
    body.classList.add("hero__body", "page-hero__body");
    body.appendChild(para("hero__tagline", data.intro));
    host.appendChild(body);
  }

  function buildPoints(host, data) {
    var box = wrap();
    box.appendChild(head(data));
    var grid = make("div", "grid grid--three");
    (data.items || []).forEach(function (item) {
      var card = make("article", "card");
      card.appendChild(make("h3", "card__title", item.title));
      card.appendChild(para("card__line", item.line));
      grid.appendChild(card);
    });
    box.appendChild(grid);
    host.appendChild(box);
  }

  function buildProse(host, data) {
    var box = wrap();
    var prose = make("div", "prose");
    if (data.title) prose.appendChild(make("h2", "section__title", data.title));
    if (data.lead) prose.appendChild(para("prose__lead", data.lead));
    if (data.intro || data.line) prose.appendChild(para(null, data.intro || data.line));
    (data.body || []).forEach(function (line) {
      prose.appendChild(para(null, line));
    });
    box.appendChild(prose);
    host.appendChild(box);
  }

  function checklist(data, kind) {
    var panel = make("div", "panel panel--" + kind);
    panel.appendChild(make("h3", "panel__title", data.title));
    panel.appendChild(para("panel__intro", data.intro));
    var list = make("ul", "checklist checklist--" + kind);
    data.items.forEach(function (item) {
      list.appendChild(make("li", null, item));
    });
    panel.appendChild(list);
    if (data.note) panel.appendChild(para("panel__note", data.note));
    return panel;
  }

  function buildCovered(host) {
    var box = wrap();
    var heading = make("div", "section__head");
    heading.appendChild(make("h2", "section__title", SITE.home.included.sectionTitle));
    heading.appendChild(para("section__intro", SITE.home.included.sectionIntro));
    box.appendChild(heading);

    var grid = make("div", "grid grid--two");
    grid.appendChild(checklist(SITE.home.included, "in"));
    grid.appendChild(checklist(SITE.home.notIncluded, "out"));
    box.appendChild(grid);
    host.appendChild(box);
  }

  function buildItinerary(host, data) {
    var box = wrap();
    box.appendChild(head(data));
    var list = make("ol", "itinerary");
    data.days.forEach(function (day) {
      var item = make("li", "itinerary__item");
      item.appendChild(make("span", "itinerary__day", day.day));
      item.appendChild(make("span", "itinerary__line", day.line));
      list.appendChild(item);
    });
    box.appendChild(list);
    host.appendChild(box);
  }

  function buildBooking(host, data) {
    var box = wrap();
    box.appendChild(head(data));

    var steps = make("ol", "steps");
    data.steps.forEach(function (step) {
      var item = make("li", "step");
      item.appendChild(make("h3", "step__title", step.title));
      item.appendChild(para("step__line", step.line));
      steps.appendChild(item);
    });
    box.appendChild(steps);

    var grid = make("div", "grid grid--two");
    [data.upFront, data.noExtras].forEach(function (part) {
      var panel = make("div", "panel");
      panel.appendChild(make("h3", "panel__title", part.title));
      panel.appendChild(para(null, part.line));
      grid.appendChild(panel);
    });
    box.appendChild(grid);

    var note = make("p", "note");
    note.appendChild(make("strong", null, data.note.title + ": "));
    note.appendChild(document.createTextNode(tokens(data.note.line)));
    box.appendChild(note);

    host.appendChild(box);
  }

  function buildImpact(host, data) {
    var box = wrap();
    var heading = make("div", "section__head");
    heading.appendChild(make("h2", "section__title", data.title));
    heading.appendChild(para("section__lead", data.lead));
    box.appendChild(heading);

    var prose = make("div", "prose");
    data.body.forEach(function (line) {
      prose.appendChild(para(null, line));
    });
    box.appendChild(prose);

    var grid = make("div", "grid grid--three");
    data.cards.forEach(function (item) {
      var card = make("article", "card");
      card.appendChild(make("h3", "card__title", item.title));
      card.appendChild(para("card__line", item.line));
      grid.appendChild(card);
    });
    box.appendChild(grid);

    box.appendChild(para("impact__closing", data.closing));
    host.appendChild(box);
  }

  function buildFaq(host, data) {
    var box = wrap();
    box.appendChild(head(data));
    var list = make("div", "faq");
    data.items.forEach(function (item) {
      var details = document.createElement("details");
      details.appendChild(make("summary", "faq__question", item.q));
      details.appendChild(para("faq__answer", item.a));
      list.appendChild(details);
    });
    box.appendChild(list);
    host.appendChild(box);
  }

  function buildClosing(host, data) {
    var box = wrap();
    box.classList.add("closing");
    box.appendChild(make("h2", "closing__title", data.title));
    box.appendChild(para("closing__line", data.line));
    var actions = make("div", "actions");
    actions.appendChild(make("a", "btn btn--primary", data.cta.label, data.cta.href));
    if (data.secondary) {
      actions.appendChild(make("a", "btn btn--outline", data.secondary.label, data.secondary.href));
    }
    box.appendChild(actions);
    host.appendChild(box);
  }

  /* ========================================================= Destinations ===== */

  function destinationCard(item) {
    var card = make("article", "destination-card");
    card.appendChild(image(item.card, item.cardAlt, 1600, 900, true));
    var body = make("div", "destination-card__body");
    body.appendChild(make("h3", "destination-card__name", item.name));
    body.appendChild(para("destination-card__blurb", item.blurb));
    body.appendChild(make("a", "destination-card__link", SITE.ui.viewDetails,
      "destinations/" + item.slug + ".html"));
    card.appendChild(body);
    return card;
  }

  function buildFeatured(host, data) {
    var box = wrap();
    box.appendChild(head(data));
    var grid = make("div", "grid grid--four");
    SITE.destinations.forEach(function (item) {
      if (item.featured) grid.appendChild(destinationCard(item));
    });
    box.appendChild(grid);
    host.appendChild(box);
  }

  function buildDestinationGrid(host) {
    var box = wrap();
    SITE.destinationsPage.regions.forEach(function (region) {
      var group = SITE.destinations.filter(function (item) { return item.region === region; });
      if (!group.length) return;
      var block = make("section", "region");
      block.appendChild(make("h2", "region__title", region));
      var grid = make("div", "grid grid--three");
      group.forEach(function (item) { grid.appendChild(destinationCard(item)); });
      block.appendChild(grid);
      box.appendChild(block);
    });
    host.appendChild(box);
  }

  function buildTeam(host, data) {
    var box = wrap();
    box.appendChild(head(data));
    var grid = make("div", "grid grid--three");
    data.people.forEach(function (person) {
      var card = make("article", "card card--person");
      card.appendChild(image(person.image, person.alt, 900, 1125, true));
      var body = make("div", "card__body");
      body.appendChild(make("h3", "card__title", person.role));
      body.appendChild(para("card__line", person.line));
      card.appendChild(body);
      grid.appendChild(card);
    });
    box.appendChild(grid);
    host.appendChild(box);
  }

  function buildPageHead(host, data) {
    var box = wrap();
    box.appendChild(make("h1", "page-head__title", data.title));
    box.appendChild(para("page-head__intro", data.intro));
    host.appendChild(box);
  }

  /* ==================================================== Destination detail === */

  function bulletPanel(title, items) {
    var panel = make("div", "panel");
    panel.appendChild(make("h2", "panel__title", title));
    var list = make("ul", "bullet-list");
    items.forEach(function (item) {
      list.appendChild(make("li", null, item));
    });
    panel.appendChild(list);
    return panel;
  }

  function definitionRows(rows) {
    var list = make("dl", "definitions");
    rows.forEach(function (row) {
      list.appendChild(make("dt", null, row[0]));
      list.appendChild(make("dd", null, row[1]));
    });
    return list;
  }

  function destinationLink(label, item) {
    var anchor = make("a", "prevnext__link", null, "destinations/" + item.slug + ".html");
    anchor.appendChild(make("span", "prevnext__label", label));
    anchor.appendChild(make("span", "prevnext__name", item.name));
    return anchor;
  }

  function buildDestination(host) {
    if (!destination) return;
    var page = SITE.destinationPage;
    var count = SITE.destinations.length;
    var previous = SITE.destinations[(destinationIndex - 1 + count) % count];
    var next = SITE.destinations[(destinationIndex + 1) % count];

    host.appendChild(banner(destination.banner, destination.bannerAlt, destination.region, destination.name,
      HERO_SPEED, "banner--destination"));

    var introSection = make("section", "section section--tight");
    buildProse(introSection, { body: [destination.intro] });
    host.appendChild(introSection);

    var columnsSection = make("section", "section section--tight");
    var columns = wrap();
    var grid = make("div", "grid grid--two");
    grid.appendChild(bulletPanel(page.whyTitle, destination.whyGo));
    grid.appendChild(bulletPanel(page.doTitle, destination.doThis));
    columns.appendChild(grid);
    columnsSection.appendChild(columns);
    host.appendChild(columnsSection);

    var factsSection = make("section", "section");
    var facts = wrap();
    facts.appendChild(make("h2", "section__title", page.factsTitle));
    facts.appendChild(definitionRows([
      [page.bestTimeLabel, destination.bestTime],
      [page.gettingThereLabel, destination.gettingThere],
      [page.timeSpentLabel, destination.timeSpent],
    ]));
    facts.appendChild(make("p", "note", page.includedNote));
    factsSection.appendChild(facts);
    host.appendChild(factsSection);

    var gallerySection = make("section", "section section--tint");
    var galleryBox = wrap();
    galleryBox.appendChild(make("h2", "section__title", page.galleryTitle));
    var gallery = make("div", "grid grid--three");
    destination.gallery.forEach(function (shot) {
      var figure = document.createElement("figure");
      figure.className = "gallery__item";
      figure.appendChild(image(shot.src, shot.alt, 1200, 800, true));
      gallery.appendChild(figure);
    });
    galleryBox.appendChild(gallery);
    gallerySection.appendChild(galleryBox);
    host.appendChild(gallerySection);

    var navSection = make("section", "section section--tight");
    var navBox = wrap();
    navBox.classList.add("prevnext");
    navBox.appendChild(destinationLink(page.previousLabel, previous));
    navBox.appendChild(make("a", "prevnext__all", page.allDestinationsLabel, "destinations.html"));
    navBox.appendChild(destinationLink(page.nextLabel, next));
    navSection.appendChild(navBox);
    host.appendChild(navSection);

    var closingSection = make("section", "section section--tint");
    buildClosing(closingSection, page.cta);
    host.appendChild(closingSection);
  }

  /* ========================================================== Form ====== */

  function buildField(key) {
    var spec = SITE.form.fields[key];
    var id = "field-" + key;
    var field = make("div", "field field--" + key);
    var label = make("label", "field__label", spec.label);
    label.htmlFor = id;
    field.appendChild(label);

    var input;

    if (spec.type === "select") {
      input = document.createElement("select");
      spec.options.forEach(function (option) {
        var choice = document.createElement("option");
        choice.value = option;
        choice.textContent = tokens(option);
        input.appendChild(choice);
      });
    } else if (spec.type === "textarea") {
      input = document.createElement("textarea");
      input.rows = spec.rows || 4;
      field.classList.add("field--wide");
    } else {
      input = document.createElement("input");
      input.type = spec.type || "text";
    }

    input.id = id;
    input.name = key;
    if (spec.placeholder) input.placeholder = tokens(spec.placeholder);
    if (spec.autocomplete) input.autocomplete = spec.autocomplete;
    if (spec.min != null) input.min = spec.min;
    if (spec.max != null) input.max = spec.max;
    if (spec.required) input.required = true;
    /* defaultValue, not value, so form.reset() restores it. */
    if (spec.value != null && spec.type !== "textarea") input.defaultValue = spec.value;

    field.appendChild(input);

    var error = make("p", "field__error");
    error.hidden = true;
    error.setAttribute("data-error-for", key);
    field.appendChild(error);

    return field;
  }

  function hiddenInput(name, value) {
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = tokens(value);
    return input;
  }

  /* Invisible to guests, irresistible to bots. */
  function honeypot() {
    var field = make("div", "field field--gotcha");
    var label = make("label", "field__label", SITE.form.honeypotLabel);
    var input = document.createElement("input");
    label.htmlFor = "field-gotcha";
    input.id = "field-gotcha";
    input.type = "text";
    input.name = "_gotcha";
    input.tabIndex = -1;
    input.autocomplete = "off";
    input.setAttribute("aria-hidden", "true");
    field.appendChild(label);
    field.appendChild(input);
    return field;
  }

  function buildForm() {
    var form = make("form", "form");
    form.id = "enquiry-form";
    form.setAttribute("method", "post");
    form.setAttribute("action", SITE.form.endpoint);

    /* _subject and package make every notification email self-describing. */
    form.appendChild(hiddenInput("_subject", SITE.form.subject));
    form.appendChild(hiddenInput("package",
      SITE.package.price + " · " + SITE.package.duration + " · " + SITE.package.per));

    var fields = make("div", "form__fields");
    SITE.form.fieldOrder.forEach(function (key) {
      if (SITE.form.fields[key]) fields.appendChild(buildField(key));
    });
    fields.appendChild(honeypot());
    form.appendChild(fields);

    var button = make("button", "btn btn--primary", SITE.form.submit);
    button.type = "submit";
    form.appendChild(button);

    var status = make("p", "form__status");
    status.setAttribute("data-form-status", "");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.hidden = true;
    form.appendChild(status);

    return form;
  }

  function buildContact(host) {
    var box = wrap();
    box.classList.add("contact");
    var direct = SITE.contactPage.direct;

    var formColumn = make("div", "contact__form");
    formColumn.appendChild(make("h2", "section__title", SITE.form.title));
    formColumn.appendChild(para("section__intro", SITE.form.intro));
    formColumn.appendChild(buildForm());

    var fallback = make("p", "form__fallback");
    fallback.appendChild(make("span", null, SITE.form.fallbackLead));
    fallback.appendChild(document.createTextNode(" "));
    fallback.appendChild(make("a", null, SITE.contact.email, SITE.contact.emailHref));
    fallback.appendChild(document.createTextNode(" · "));
    fallback.appendChild(make("a", null, SITE.contact.whatsappLabel, SITE.contact.whatsappHref));
    formColumn.appendChild(fallback);
    box.appendChild(formColumn);

    var aside = make("div", "contact__direct");
    aside.appendChild(make("h2", "section__title", direct.title));
    aside.appendChild(definitionRows([
      [direct.labels.whatsapp, SITE.contact.phoneDisplay],
      [direct.labels.phone, SITE.contact.phoneDisplay],
      [direct.labels.email, SITE.contact.email],
      [direct.labels.basedIn, SITE.contact.base],
      [direct.labels.replyTime, SITE.contact.replyTime],
    ]));
    /* The first two rows are phone numbers, so link them. */
    var links = aside.querySelectorAll("dd");
    links[0].textContent = "";
    links[0].appendChild(make("a", null, SITE.contact.phoneDisplay, SITE.contact.whatsappHref));
    links[1].textContent = "";
    links[1].appendChild(make("a", null, SITE.contact.phoneDisplay, SITE.contact.phoneHref));
    links[2].textContent = "";
    links[2].appendChild(make("a", null, SITE.contact.email, SITE.contact.emailHref));
    aside.appendChild(make("a", "btn btn--outline", direct.whatsappCta, SITE.contact.whatsappHref));
    box.appendChild(aside);

    host.appendChild(box);
  }

  /* ========================================================== Build ===== */

  var BUILDERS = {
    "header": buildHeader,
    "footer": buildFooter,
    "hero": buildHero,
    "points": buildPoints,
    "prose": buildProse,
    "covered": buildCovered,
    "itinerary": buildItinerary,
    "booking": buildBooking,
    "impact": buildImpact,
    "faq": buildFaq,
    "closing": buildClosing,
    "featured": buildFeatured,
    "destination-grid": buildDestinationGrid,
    "team": buildTeam,
    "page-head": buildPageHead,
    "page-hero": buildPageHero,
    "destination": buildDestination,
    "contact": buildContact,
  };

  function renderPage() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-render]"), function (host) {
      var build = BUILDERS[host.getAttribute("data-render")];
      if (!build) return;
      var key = host.getAttribute("data-key");
      build(host, key ? pick(key) : null);
    });
  }

  /* =========================================================== Meta ===== */

  function absolute(path) {
    return SITE.meta.url.replace(/\/+$/, "/") + String(path).replace(/^\.\.\//, "");
  }

  function pageUrl() {
    if (pageName === "destination" && destination) return "destinations/" + destination.slug + ".html";
    if (pageName === "home") return "";
    return pageName + ".html";
  }

  function renderMeta() {
    var pages = SITE.pages;
    var fallback = pages[pageName] || pages.home;
    var title = pageName === "destination" && destination ? destination.metaTitle : fallback.title;
    var description = pageName === "destination" && destination ? destination.metaDescription : fallback.description;
    var url = absolute(pageUrl());
    var shareImage = absolute(SITE.meta.shareImage);

    document.title = tokens(title);

    function meta(selector, value) {
      var node = document.querySelector(selector);
      if (node) node.setAttribute("content", value);
    }

    meta('meta[name="description"]', tokens(description));
    meta('meta[property="og:title"]', tokens(title));
    meta('meta[property="og:description"]', tokens(description));
    meta('meta[property="og:url"]', url);
    meta('meta[property="og:image"]', shareImage);
    meta('meta[name="twitter:title"]', tokens(title));
    meta('meta[name="twitter:description"]', tokens(description));
    meta('meta[name="twitter:image"]', shareImage);

    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);
  }

  /* Fills simple placeholders left in the HTML: data-text, data-href,
     data-src, data-alt and data-aria. */
  function renderTokens() {
    function each(name, run) {
      Array.prototype.forEach.call(document.querySelectorAll("[" + name + "]"), function (node) {
        run(node, node.getAttribute(name));
      });
    }
    each("data-text", function (node, key) { node.textContent = text(key); });
    each("data-href", function (node, key) { node.setAttribute("href", link(text(key))); });
    each("data-src", function (node, key) { node.setAttribute("src", asset(text(key))); });
    each("data-alt", function (node, key) { node.setAttribute("alt", text(key)); });
    each("data-aria", function (node, key) { node.setAttribute("aria-label", text(key)); });
  }

  /* ========================================================== Menu ====== */

  /* The floating WhatsApp button stays out of the way until the banner has
     been scrolled past, so it can never cover the hero or the five key facts.
     Pages with no banner show it straight away. */
  function initFloatingContact() {
    var float = document.querySelector(".whatsapp-float");
    var hero = document.querySelector(".banner");
    if (!float) return;
    if (!hero || !window.IntersectionObserver) {
      float.classList.add("is-visible");
      return;
    }
    new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        float.classList.toggle("is-visible", !entry.isIntersecting);
      });
    }).observe(hero);
  }

  function initMenu() {
    var toggle = document.getElementById("menu-toggle");
    var nav = document.getElementById("site-menu");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", text(open ? "ui.menuClose" : "ui.menuOpen"));
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });

    var wide = window.matchMedia("(min-width: 900px)");
    if (wide.addEventListener) {
      wide.addEventListener("change", function (event) {
        if (event.matches) setOpen(false);
      });
    }
  }

  /* ========================================================== Form ====== */

  function clearErrors(form) {
    Array.prototype.forEach.call(form.querySelectorAll(".field__error"), function (node) {
      node.textContent = "";
      node.hidden = true;
    });
    Array.prototype.forEach.call(form.querySelectorAll(".field--invalid"), function (node) {
      node.classList.remove("field--invalid");
    });
  }

  function showFieldError(form, name, message) {
    var node = form.querySelector('[data-error-for="' + name + '"]');
    if (!node) return;
    node.textContent = tokens(message);
    node.hidden = false;
    node.parentNode.classList.add("field--invalid");
  }

  /* type is "success", "error" or "info". withContacts appends the direct
     email and WhatsApp links so a guest is never stranded. */
  function showStatus(node, message, type, withContacts) {
    if (!node) return;
    node.className = "form__status form__status--" + type;
    node.textContent = "";
    node.appendChild(document.createTextNode(tokens(message)));
    if (withContacts) {
      node.appendChild(document.createTextNode(" "));
      node.appendChild(make("a", null, SITE.contact.email, SITE.contact.emailHref));
      node.appendChild(document.createTextNode(" · "));
      node.appendChild(make("a", null, SITE.contact.whatsappLabel, SITE.contact.whatsappHref));
    }
    node.hidden = false;
  }

  function initForm() {
    var form = document.getElementById("enquiry-form");
    if (!form) return;

    var button = form.querySelector('button[type="submit"]');
    var status = form.querySelector("[data-form-status]");

    form.addEventListener("input", function (event) {
      var field = event.target.closest ? event.target.closest(".field--invalid") : null;
      if (!field) return;
      field.classList.remove("field--invalid");
      var note = field.querySelector(".field__error");
      if (note) { note.hidden = true; note.textContent = ""; }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors(form);
      status.hidden = true;
      status.textContent = "";
      status.className = "form__status";

      var gotcha = form.elements.namedItem("_gotcha");
      if (gotcha && gotcha.value !== "") return;

      /* Read the endpoint at submit time, so content.js stays the one source
         of truth and a missing form ID can never post anywhere. */
      var endpoint = String(SITE.form.endpoint || "");
      var connected = endpoint !== "" && endpoint.indexOf("REPLACE_WITH_FORM_ID") === -1;

      if (!connected) {
        showStatus(status, SITE.form.placeholderNotice, "info", true);
        return;
      }

      button.disabled = true;
      button.textContent = SITE.form.sending;

      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (response) {
          if (response.ok) {
            showStatus(status, SITE.form.success, "success", false);
            form.reset();
            return null;
          }
          return response.json().then(
            function (data) { return data; },
            function () { return null; }
          ).then(function (data) {
            var first = data && data.errors && data.errors[0];
            if (first && first.field && form.elements.namedItem(first.field)) {
              showFieldError(form, first.field, first.message || SITE.form.errorGeneral);
            } else {
              showStatus(status, (first && first.message) || SITE.form.errorGeneral,
                "error", true);
            }
          });
        })
        .catch(function () {
          showStatus(status, SITE.form.errorGeneral, "error", true);
        })
        .then(function () {
          button.disabled = false;
          button.textContent = SITE.form.submit;
        });
    });
  }

  /* ============================================================ Go ====== */

  function start() {
    renderMeta();
    renderTokens();
    renderPage();
    initMenu();
    initFloatingContact();
    initForm();
    if (window.Parallax) window.Parallax.refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
