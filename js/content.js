/* ==========================================================================
   YOLO Safaris site content
   --------------------------------------------------------------------------
   Every string, price, destination, route, FAQ entry and contact detail on the
   site lives in the single SITE object below. js/app.js and js/parallax.js
   read it and build the pages. Edit this file and nothing else.

   Values are written once and reused through tokens, so a price or a phone
   number only has to be right in one place:

     {price}  {per}  {duration}  {durationLong}  {durationAdjective}
     {destinationCount}  {phone}  {email}  {year}

   The two routes
   --------------------------------------------------------------------------
   SITE.routes holds the Western Circuit and the Coast Circuit. Each route
   lists its stops by destination slug and carries its own six days. The home
   page route cards and the itinerary tabs both read from it.

   How to add a destination
   --------------------------------------------------------------------------
     1. Add one object to SITE.destinations below (copy an existing one).
     2. Add its slug to the `stops` of the route it belongs to.
     3. Copy destinations/diani.html to destinations/<new-slug>.html and change the
        data-destination="..." attribute on <body>.
     That is all. The nav, the destination grid, the route cards, the footer and
     the previous/next links all follow automatically.

   OPEN ITEMS FOR THE OWNER. Search for "TODO(owner)" to find each one.
   --------------------------------------------------------------------------
     1. Final duration. The printed brochure says "7 Day Stay in Kenya"; this
        build says 6 days / 5 nights. Fix SITE.package.duration.
     2. Charity wording. Confirm "a portion of every booking" is approved.
     3. Deposit and balance terms, see SITE.contactPage.payment.
     4. Cancellation and refund wording, see SITE.home.booking.note.
     5. Formspree form ID, see SITE.form.endpoint (README has the steps).
     6. The guides section was removed from the about page on request. Add
        SITE.about.team back and restore the data-render="team" line in
        about.html if it should return.
     7. Coast Circuit: SGR train or a flight from Nairobi to Mombasa, see
        SITE.destinations (mombasa.gettingThere).
     8. Western Circuit: the Day 5 drive from Thomsons Falls to the Mara is
        long. Confirm the overnight stop, see SITE.routes (western).
     9. Real photography. Any path ending in .svg is a placeholder waiting
        for a photo.
    10. Site URL. SITE.meta.url holds the canonical origin. If it ever moves,
        update it here plus robots.txt, sitemap.xml and the static page heads.
   ========================================================================== */

const SITE = {

  /* ==================================================================== */
  /* Site-wide                                                            */
  /* ==================================================================== */

  /* Link previews and the canonical URL. Page titles and descriptions live in
     `pages` below, one entry per page. */
  meta: {
    siteName: "YOLO Safaris",
    // The canonical origin. Used for canonical links, Open Graph and Twitter
    // tags, and the absolute URLs in the static page heads and sitemap.xml.
    url: "https://yolo-safaris.onrender.com/",
    shareImage: "assets/social-share.jpg",
  },

  /* Page titles and meta descriptions. `destination` is the fallback used by the
     destination pages, which override it from their own entry in `destinations`. */
  pages: {
    home: {
      title: "YOLO Safaris | {duration} in Kenya from {price}",
      description:
        "Two guided {durationAdjective} routes from Nairobi: the Rift Valley " +
        "and the Maasai Mara, or Mombasa and Diani. From {price} per guest.",
    },
    about: {
      title: "About YOLO Safaris, a Kenya-based safari operator",
      description:
        "Who we are, where we operate in Kenya, and how a portion of every " +
        "booking funds community charity work through Tembea Kenya.",
    },
    destinations: {
      title: "Destinations: two routes through Kenya | YOLO Safaris",
      description:
        "Every stop on the Western Circuit to the Maasai Mara and the Coast " +
        "Circuit to Mombasa and Diani, all included in the package price.",
    },
    contact: {
      title: "Contact and booking enquiries | YOLO Safaris",
      description:
        "Send a booking enquiry for a {durationAdjective} Kenya safari from " +
        "{price} per guest. Email, phone and WhatsApp, or use the form.",
    },
    destination: {
      title: "Destinations | YOLO Safaris",
      description: "A stop on a YOLO Safaris route through Kenya.",
    },
  },

  brand: {
    name: "YOLO Safaris",
    mark: "assets/logo-mark.png",
    markAlt: "YOLO Safaris: a sun rising over mountains and an acacia tree",
    logo: "assets/logo.jpeg",
    logoAlt: "YOLO Safaris logo",
    tagline: "Where the Love for Nature and Adventure meets God’s creatives…",
    positioning: "More than a holiday, a journey with purpose.",
  },

  /* Price and duration, once each. Both routes share them. */
  package: {
    price: "USD 3,200",
    per: "per guest",
    duration: "6 Days / 5 Nights",
    durationLong: "6 days and 5 nights",
    // Reads naturally mid-sentence, where "6 days and 5 nights routes" does not.
    durationAdjective: "6-day, 5-night",
    // TODO(owner): the brochure says "7 Day Stay in Kenya". Confirm the final
    // figure, then update `duration`, `durationLong` and `durationAdjective`.
  },

  contact: {
    phoneDisplay: "+254 727 720 566",
    phoneHref: "tel:+254727720566",
    whatsappHref: "https://wa.me/254727720566",
    whatsappLabel: "WhatsApp",
    email: "yolosafaris@gmail.com",
    emailHref: "mailto:yolosafaris@gmail.com",
    base: "Nakuru, Kenya",
    replyTime: "We reply within 24 hours.",
  },

  ui: {
    skipToContent: "Skip to content",
    navLabel: "Main",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    whatsappFloat: "Chat with YOLO Safaris on WhatsApp",
    viewDetails: "View details",
    viewPhoto: "View image",
    photoOverlay: "Photo overlay",
    photoClose: "Close photo",
    destinationCount: "{destinationCount} destinations",
    includedInPrice: "Included in the package price",
    routeStops: "Stops on this route",
    routeItinerary: "See the day-by-day",
  },

  nav: [
    { label: "Home", href: "index.html", page: "home" },
    { label: "About", href: "about.html", page: "about" },
    { label: "Destinations", href: "destinations.html", page: "destinations" },
    { label: "Contact", href: "contact.html", page: "contact" },
  ],
  headerCta: { label: "Book / Enquire", href: "contact.html" },

  footer: {
    blurb: "Kenya-based safari operator. {durationLong} in Kenya from {price} per guest.",
    exploreTitle: "Explore",
    destinationsTitle: "Destinations",
    contactTitle: "Contact",
    credit: {
      line: "Site by",
      label: "Web Bloom Tech Kenya",
      href: "https://webloomtechkenya.com/",
    },
    smallPrint:
      "© {year} YOLO Safaris. All prices in US dollars. Package price and " +
      "itinerary are confirmed in writing when you book.",
    notIncludedLine:
      "Not included: international flights, Kenyan visa or eVisa, travel " +
      "insurance, souvenirs and tips.",
  },

  /* ==================================================================== */
  /* The two routes                                                       */
  /* ---------------------------------------------------------------------- */
  /* stops -> destination slugs, in travel order.                          */
  /* days  -> exactly six, shown in the itinerary tabs on the home page.    */
  /* ==================================================================== */

  routes: [
    {
      id: "western",
      name: "Western Circuit",
      from: "Nairobi",
      to: "the Maasai Mara",
      line:
        "Rift Valley lakes, a geothermal spa, a waterfall and a Maasai " +
        "village, ending with game drives in the Mara.",
      image: "images/destinations/maasai-mara.jpeg",
      imageAlt: "The Maasai Mara on a YOLO Safaris game drive",
      stops: [
        "nairobi",
        "geothermal-spa",
        "soysambu-conservancy",
        "lake-elementaita",
        "lake-nakuru",
        "thomsons-falls",
        "narok",
        "maasai-village",
        "maasai-mara",
      ],
      // TODO(owner): Day 5 is a long drive from Thomsons Falls to the Mara.
      // Confirm where guests sleep on night 4 (Nyahururu or Nakuru).
      days: [
        {
          day: "Day 1",
          line: "Arrive in Nairobi. Airport transfer, the Giraffe Centre and the Museum of Illusions.",
        },
        {
          day: "Day 2",
          line: "Nairobi to Naivasha. Drive into the Rift Valley and soak at the Geothermal Spa.",
        },
        {
          day: "Day 3",
          line: "Soysambu Conservancy. Game drive among giraffe and zebra, then the shore of Lake Elementaita.",
        },
        {
          day: "Day 4",
          line: "Morning game drive in Lake Nakuru National Park, then north to Thomsons Falls.",
        },
        {
          day: "Day 5",
          line: "South through Narok to a Maasai village, then into the Mara for an afternoon game drive.",
        },
        {
          day: "Day 6",
          line: "Morning game drive in the Maasai Mara, then the drive back to Nairobi for your flight.",
        },
      ],
    },
    {
      id: "coast",
      name: "Coast Circuit",
      from: "Nairobi",
      to: "Mombasa and Diani",
      line:
        "The train to the Coast, then Mombasa’s history, wildlife parks and " +
        "a water park, ending on Diani Beach.",
      image: "images/destinations/mombasa.jpg",
      imageAlt: "Beach umbrellas and swimmers on a tropical shore",
      stops: [
        "nairobi",
        "mombasa",
        "haller-park",
        "fort-jesus",
        "mamba-village",
        "wild-waters",
        "diani",
      ],
      days: [
        {
          day: "Day 1",
          line: "Arrive in Nairobi. Airport transfer, the Giraffe Centre and the Museum of Illusions.",
        },
        {
          day: "Day 2",
          line: "SGR train to Mombasa, then an afternoon at Haller Park.",
        },
        {
          day: "Day 3",
          line: "Fort Jesus and a walk through Mombasa Old Town.",
        },
        {
          day: "Day 4",
          line: "Mamba Village in the morning, Wild Waters in the afternoon. Both are in Nyali.",
        },
        {
          day: "Day 5",
          line: "South to Diani. A full day on the beach.",
        },
        {
          day: "Day 6",
          line: "A slow Diani morning, then the transfer out for your flight.",
        },
      ],
    },
  ],

  /* ==================================================================== */
  /* Home                                                                 */
  /* ==================================================================== */

  home: {

    hero: {
      eyebrow: "More than a holiday, a journey with purpose.",
      headline:
        "Six days in Kenya, two ways: West to the Maasai Mara, or East to " +
        "the Coast.",
      tagline: "Where the Love for Nature and Adventure meets God’s creatives…",
      image: "images/home-hero.jpeg",
      imageAlt: "Wildebeest crossing the plains at sunset beside a safari vehicle",
      primaryCta: { label: "Reserve your spot", href: "contact.html" },
      secondaryCta: { label: "See the itinerary", href: "#itinerary" },
      /* Exactly five facts. Two of them read straight from `package`. */
      facts: [
        "From {price} {per}",
        "{duration}",
        "Accommodation included",
        "Two routes to choose from",
        "Part of every booking goes to charity",
      ],
    },

    why: {
      title: "Why YOLO Safaris",
      intro: "Three things we do differently.",
      /* The brand mark sits under the heading on this section only. */
      showMark: true,
      items: [
        {
          title: "One price, ground costs covered",
          line: "Accommodation, park fees, transport, transfers and meals sit inside the package.",
        },
        {
          title: "Guided from arrival to departure",
          line: "A Kenyan driver-guide stays with your group for the whole route.",
        },
        {
          title: "Part of every booking gives back",
          line: "A portion funds school fees and family support in Kenyan communities.",
        },
      ],
    },

    /* The photo section under "Why YOLO Safaris". */
    culture: {
      title: "🔥 Culture, Flavour & Good Vibes",
      body: [
        "Experience the richness of African culture, savour authentic African " +
        "flavours, enjoy a magical bonfire night, and indulge in the legendary " +
        "nyama choma.",
      ],
      images: [
        {
          src: "images/destinations/nyama-choma.jpeg",
          alt: "Nyama choma, Kenyan grilled meat, ready to share",
        },
        {
          src: "images/destinations/hakuna-matata.jpeg",
          alt: "A sign reading Hakuna Matata",
        },
      ],
    },

    /* The two route cards. The routes themselves live in SITE.routes. */
    routes: {
      title: "Where you go",
      intro: "Two routes from Nairobi. Both are {duration}, both from {price} {per}.",
    },

    itinerary: {
      title: "The itinerary",
      intro:
        "Pick a route to see it day by day. The final routing is confirmed " +
        "with you when you book.",
      tabsLabel: "Choose a route",
    },

    included: {
      sectionTitle: "What the price covers",
      sectionIntro:
        "One package price for the in-Kenya stay, whichever route you choose. " +
        "Here is what is in it, what is not, and what you pay for yourself.",
      title: "Included in the price",
      intro: "You will not be asked to pay for any of this again.",
      items: [
        "Accommodation for {durationLong}",
        "Ground transport inside Kenya",
        "Driver-guide and vehicle",
        "Park and reserve fees",
        "Listed excursions and activities",
        "Airport transfers",
        "Meals as per the itinerary",
      ],
    },

    notIncluded: {
      title: "Not included",
      intro: "These are yours to arrange before you travel.",
      items: [
        "International flights",
        "Kenyan visa or eVisa",
        "Travel insurance",
        "Souvenirs and other out-of-package purchases",
        "Tips",
      ],
      note:
        "Flight, visa and insurance support will be added to packages as the " +
        "company grows.",
    },

    booking: {
      title: "How booking works",
      intro: "Three steps, and one payment to us.",
      steps: [
        {
          title: "Send the enquiry",
          line: "Tell us your route, your dates, your country and how many guests are travelling.",
        },
        {
          title: "Confirm and pay the deposit",
          line: "We hold your dates and send you the deposit details.",
        },
        {
          title: "Pay the balance, then travel",
          line: "The balance clears before travel. We run the ground logistics from arrival to departure.",
        },
      ],
      upFront: {
        title: "Why the package is paid up front",
        line:
          "Lodges, excursions, drivers and vehicles are booked and paid for " +
          "before you arrive. Paying up front is what lets us confirm them in " +
          "your name.",
      },
      noExtras: {
        title: "No other payments to us",
        line:
          "Once the package is paid there is nothing further to pay YOLO " +
          "Safaris. Souvenirs, drinks and personal extras you settle directly.",
      },
      // TODO(owner): this cancellation line is a placeholder. Replace it with
      // the final cancellation and refund policy wording before launch.
      note: {
        title: "Cancellation",
        line:
          "Cancellation and refund terms are confirmed in writing before you " +
          "pay a deposit.",
      },
    },

    impact: {
      title: "Tembea Kenya",
      lead: "Tembea Kenya: empowering the lives of people.",
      image: "images/destinations/charity.jpeg",
      imageAlt: "YOLO Safaris community charity work",
      // TODO(owner): confirm this is the approved wording for the charity
      // promise. Do not state a percentage.
      body: [
        "A portion of every booking goes to community charity work in Kenya.",
        "That includes paying school fees for people facing hardship, and supporting families through difficult seasons.",
        "The work is delivered with people who live in these communities.",
      ],
      cards: [
        { title: "School fees", line: "Fees paid so a student can stay in school." },
        { title: "Family support", line: "Practical help for families facing hardship." },
        { title: "Local partners", line: "Chosen and run by people in the community." },
      ],
      closing: "Book a trip and part of what you pay stays here.",
    },

    tripStyles: {
      title: "Trip styles",
      intro: "Pick the trip that matches who you are travelling with.",
      items: [
        {
          title: "Group trips",
          line: "Join a small group of travellers on a set date.",
        },
        {
          title: "Family trips",
          line: "A slower pace and rooms planned around children and grandparents.",
        },
        {
          title: "Solo trips",
          line: "Come on your own and travel with the group.",
        },
      ],
    },

    faq: {
      title: "Questions travellers ask",
      intro: "Short answers. Anything else, ask us in the enquiry form.",
      items: [
        {
          q: "Which route should I choose?",
          a:
            "Choose the Western Circuit for game drives, Rift Valley lakes and " +
            "a Maasai village. Choose the Coast Circuit for history, beaches " +
            "and a slower pace. Both cost the same.",
        },
        {
          q: "Is the price per person?",
          a:
            "Yes. {price} is {per} for the {durationLong} in-Kenya stay, on " +
            "either route. Ask us about solo travellers and single-room options.",
        },
        {
          q: "Do I need a visa for Kenya?",
          a:
            "Most visitors need to apply for Kenyan travel authorisation " +
            "before arrival. Check the current rule for your passport. It is " +
            "not included in the package.",
        },
        {
          q: "Is it safe?",
          a:
            "You travel with a driver-guide and stay in established lodges and " +
            "hotels. Ask us anything specific about your route and we will " +
            "answer honestly.",
        },
        {
          q: "Can I change the dates or the itinerary?",
          a:
            "Often, yes. Send us the dates you want and what you would like to " +
            "change, and we will quote the adjusted trip.",
        },
        {
          q: "What if I am vegetarian, vegan or have allergies?",
          a:
            "Tell us in the enquiry. Meals are included as per the itinerary " +
            "and we pass your dietary needs to every lodge on the route.",
        },
        {
          q: "What is not included?",
          a:
            "International flights, Kenyan visa or eVisa, travel insurance, " +
            "souvenirs and personal extras, and tips.",
        },
        {
          q: "How do I pay?",
          // TODO(owner): confirm which payment methods you accept (bank
          // transfer, mobile money, card) and replace the generic answer.
          a:
            "We send full payment details once your dates are confirmed. Ask " +
            "us which methods we accept from your country.",
        },
        {
          q: "How many people are on a group trip?",
          // TODO(owner): confirm the usual and maximum group size.
          a: "Ask us for the group size on the dates you are considering.",
        },
      ],
    },

    closing: {
      title: "Ready when you are",
      line: "Pick a route, send us your dates, and we will confirm the price and what is included.",
      cta: { label: "Reserve your spot", href: "contact.html" },
      secondary: { label: "See all destinations", href: "destinations.html" },
    },
  },

  /* ==================================================================== */
  /* About                                                                */
  /* ==================================================================== */

  about: {
    title: "About YOLO Safaris",
    intro:
      "A Kenya-based operator running two routes from Nairobi, guided end to " +
      "end, with part of every booking funding community work.",
    /* Mirrors the landing page hero. */
    eyebrow: "Who we are",
    image: "images/about-hero.jpeg",
    imageAlt: "Maasai herders and elephants silhouetted against an orange sunset",

    story: {
      title: "Who we are",
      body: [
        "YOLO Safaris is a Kenya-based tour operator. We plan and run safaris for visitors from abroad, from arrival to departure.",
        "Every trip is guided by a Kenyan driver-guide and priced as one package for the in-Kenya stay.",
        "We keep the routes simple and the price clear: one figure covering accommodation, transport, park fees and meals.",
      ],
    },

    operates: {
      title: "Where we operate",
      line:
        "Both routes start in Nairobi. The Western Circuit runs through the " +
        "Rift Valley to the Maasai Mara, and the Coast Circuit runs to " +
        "Mombasa and Diani.",
    },

    culture: {
      title: "Tembea Kenya",
      lead: "Tembea Kenya: empowering the lives of people.",
      // TODO(owner): confirm this is the approved wording for the charity promise.
      body: [
        "A portion of every booking goes to community charity work in Kenya.",
        "That includes paying school fees for people facing hardship, and supporting families through difficult seasons.",
        "The work is delivered with people who live in these communities.",
      ],
    },

    funds: {
      title: "What a booking funds",
      intro:
        "A portion of every booking is set aside for community work. No " +
        "percentage is promised, and nothing is claimed that we cannot show.",
      items: [
        { title: "School fees", line: "Fees paid so a student can stay in school." },
        { title: "Family support", line: "Practical help for families facing hardship." },
        { title: "Local partners", line: "Chosen and run by people in the community." },
      ],
    },

    difference: {
      title: "What makes a YOLO trip different",
      items: [
        {
          title: "One quoted price",
          line: "You get the full figure before you pay anything, not after.",
        },
        {
          title: "One guide, whole route",
          line: "The same driver-guide stays with you from arrival to departure.",
        },
        {
          title: "Money that stays in Kenya",
          line: "Every stop on both routes is Kenyan, and so is the team that runs them.",
        },
        {
          title: "A trip that gives back",
          line: "Part of every booking funds school fees and family support.",
        },
      ],
    },

    closing: {
      title: "Travel with us",
      line: "Ask us anything about the routes, the price or the charity work before you book.",
      cta: { label: "Send an enquiry", href: "contact.html" },
      secondary: { label: "See the destinations", href: "destinations.html" },
    },
  },

  /* ==================================================================== */
  /* Destinations index                                                         */
  /* ==================================================================== */

  destinationsPage: {
    /* Mirrors the landing page hero, with the second of the two photographs. */
    eyebrow: "Where the trip goes",
    title: "Destinations",
    intro:
      "Several stops on two routes, all of them inside the package price.",
    image: "images/destinations-hero.jpeg",
    imageAlt: "Two elephants walking through tall golden grass",
    /* Cards are grouped in this order. A destination joins a group by its
       `region`, which must match a `name` below exactly. */
    regions: [
      { name: "Nairobi", intro: "Where both routes start." },
      { name: "Western Circuit", intro: "Nairobi to the Maasai Mara, through the Rift Valley." },
      { name: "Coast Circuit", intro: "Nairobi to Mombasa and Diani, by train to the coast." },
    ],
    cardLink: "View details",
    custom: {
      title: "Want a different route?",
      line:
        "Tell us the places you want to see and how long you have, and we " +
        "will quote a custom itinerary.",
      cta: { label: "Plan a custom trip", href: "contact.html" },
    },
  },

  /* ==================================================================== */
  /* Destination detail pages: shared labels                                   */
  /* ==================================================================== */

  destinationPage: {
    whyTitle: "Why go",
    doTitle: "What you will do there",
    factsTitle: "Practical notes",
    bestTimeLabel: "Best time to go",
    gettingThereLabel: "How you get there",
    timeSpentLabel: "Time in the package",
    includedNote: "This stop is included in the package price of {price} {per}.",
    galleryTitle: "Photos",
    previousLabel: "Previous destination",
    nextLabel: "Next destination",
    allDestinationsLabel: "All destinations",
    cta: {
      title: "Add {name} to your trip",
      line: "Send us your dates and we will confirm the full route and what is included.",
      cta: { label: "Reserve your spot", href: "contact.html" },
    },
  },

  /* ==================================================================== */
  /* Contact                                                              */
  /* ==================================================================== */

  contactPage: {
    title: "Contact",
    intro: "Tell us your route and your dates, and we will reply within a day.",
    /* Mirrors the landing page hero. */
    eyebrow: "Start here",
    image: "images/contact-hero.jpeg",
    imageAlt: "Elephants grazing on open savanna below a snow-capped mountain",

    direct: {
      title: "Talk to a person",
      labels: {
        whatsapp: "WhatsApp",
        phone: "Phone",
        email: "Email",
        basedIn: "Based in",
        replyTime: "Response time",
      },
      whatsappCta: "Chat on WhatsApp",
    },

    next: {
      title: "What happens next",
      items: [
        {
          title: "We read your enquiry",
          line: "Your route, dates, guest count and trip type reach us by email.",
        },
        {
          title: "We reply with the details",
          line: "You get the route, the total price and what is included.",
        },
        {
          title: "You confirm with a deposit",
          line: "We hold your dates and start booking lodges and vehicles.",
        },
      ],
    },

    payment: {
      title: "Deposit and payment",
      // TODO(owner): placeholder. Confirm the deposit amount, the balance due
      // date and any instalment option, then replace this generic wording.
      line:
        "A deposit confirms your dates. The balance is due before travel, and " +
        "we send full payment details once your dates are confirmed.",
    },
  },

  /* ==================================================================== */
  /* Booking form (contact page)                                          */
  /* ==================================================================== */

  form: {
    title: "Booking enquiry",
    intro: "Eight fields. We reply by email or WhatsApp.",

    /* Create a form at formspree.io, connect it to yolosafaris@gmail.com,
       then paste the form ID here in place of REPLACE_WITH_FORM_ID. */
    endpoint: "https://formspree.io/f/REPLACE_WITH_FORM_ID",
    subject: "New YOLO Safaris booking enquiry",

    fields: {
      name: {
        label: "Full name",
        type: "text",
        placeholder: "Jane Wanjiru",
        autocomplete: "name",
        required: true,
      },
      email: {
        label: "Email",
        type: "email",
        placeholder: "you@example.com",
        autocomplete: "email",
        required: true,
      },
      country: {
        label: "Country",
        type: "text",
        placeholder: "Germany",
        autocomplete: "country-name",
        required: true,
      },
      dates: {
        label: "Travel dates",
        type: "text",
        placeholder: "For example: 12 to 18 July 2027",
        required: true,
      },
      guests: {
        label: "Number of guests",
        type: "number",
        min: 1,
        max: 24,
        value: 2,
        required: true,
      },
      route: {
        label: "Route",
        type: "select",
        options: [
          "Western Circuit: Nairobi to the Maasai Mara",
          "Coast Circuit: Nairobi to Mombasa and Diani",
          "Not sure yet",
        ],
        required: true,
      },
      tripType: {
        label: "Trip type",
        type: "select",
        options: ["Group trip", "Family trip", "Solo trip"],
        required: true,
      },
      message: {
        label: "Message (optional)",
        type: "textarea",
        rows: 4,
        placeholder: "Anything we should know: dietary needs, children travelling, dates you are flexible on.",
        required: false,
      },
    },
    fieldOrder: ["name", "email", "country", "dates", "guests", "route", "tripType", "message"],

    /* Spam honeypot. Hidden from guests, so bots fill it in and we quietly
       ignore the submission. */
    honeypotLabel: "Leave this field empty",

    submit: "Send enquiry",
    sending: "Sending…",
    success: "Thank you. We’ll reply within 24 hours.",
    errorGeneral: "We could not send your enquiry. Please email or WhatsApp us instead.",
    placeholderNotice:
      "The booking form is not connected yet. Please email or WhatsApp us " +
      "instead and we will reply within 24 hours.",
    fallbackLead: "Prefer not to use the form?",
  },

  /* ==================================================================== */
  /* The destinations                                                     */
  /* ---------------------------------------------------------------------- */
  /* Listed in travel order: Nairobi, then the Western Circuit, then the    */
  /* Coast Circuit. The previous/next links follow this order.             */
  /* region          -> which group it sits in on destinations.html.       */
  /* card / banner   -> 16:9.  gallery -> 3:2.                             */
  /* ==================================================================== */

  destinations: [

    /* ------------------------------------------------ Nairobi ---------- */

    {
      slug: "nairobi",
      name: "Nairobi",
      region: "Nairobi",
      blurb: "Where both routes start: the Giraffe Centre and the Museum of Illusions.",
      metaTitle: "Nairobi: Museum of Illusions and the Giraffe Centre | YOLO Safaris",
      metaDescription:
        "Day 1 on both YOLO Safaris routes: airport transfer, the Giraffe " +
        "Centre and the Museum of Illusions in Nairobi.",
      intro:
        "Kenya’s capital opens both routes. Your guide meets you at the airport, " +
        "and two easy attractions fill the first afternoon.",
      whyGo: [
        "Hand-feed giraffes at the Giraffe Centre.",
        "The Museum of Illusions is an easy, playful hour indoors.",
        "It is where every package starts, so there is no extra travel.",
      ],
      doThis: [
        "Land at Jomo Kenyatta International Airport and meet your driver-guide.",
        "Hand-feed giraffes at the Giraffe Centre.",
        "Walk through the Museum of Illusions.",
        "Settle into your hotel before your route begins the next morning.",
      ],
      bestTime: "Year-round. Nairobi sits at altitude, so evenings are cool.",
      gettingThere: "Fly into Nairobi. The airport transfer is part of the package.",
      timeSpent: "Day 1 on both routes.",
      card: "images/destinations/nairobi-3.jpg",
      banner: "images/destinations/nairobi.jpg",
      cardAlt: "Nairobi city centre seen from a viewpoint",
      bannerAlt: "Nairobi skyline at dusk",
      gallery: [
        { src: "images/destinations/nairobi-1.jpg", alt: "Feeding a giraffe at the Giraffe Centre in Nairobi" },
        { src: "images/destinations/nairobi-2.jpg", alt: "Inside the Museum of Illusions in Nairobi" },
        { src: "images/destinations/nairobi-4.jpg", alt: "A giraffe at the Giraffe Centre in Nairobi" },
      ],
    },

    /* ---------------------------------------- Western Circuit ---------- */

    {
      slug: "geothermal-spa",
      name: "Geothermal Spa",
      region: "Western Circuit",
      blurb: "Warm mineral pools fed by the Olkaria geothermal field near Naivasha.",
      metaTitle: "Geothermal Spa, Naivasha: warm pools in the Rift Valley | YOLO Safaris",
      metaDescription:
        "Day 2 of the Western Circuit: the drive into the Rift Valley and an " +
        "afternoon soak at the Olkaria Geothermal Spa near Naivasha.",
      intro:
        "The Geothermal Spa sits in the Olkaria area near Hell’s Gate, outside " +
        "Naivasha. Its blue pools are warmed by steam from the ground below.",
      whyGo: [
        "A warm soak after the drive out of Nairobi.",
        "Rift Valley scenery all around the pools.",
        "An easy, restful first stop on the Western Circuit.",
      ],
      doThis: [
        "Leave Nairobi and drive down into the Great Rift Valley.",
        "Stop at a viewpoint over the valley floor.",
        "Swim and soak in the geothermal pools.",
        "Spend the night near Lake Naivasha.",
      ],
      bestTime: "Year-round. The water stays warm whatever the weather.",
      gettingThere: "Road transfer from Nairobi, about two hours, included in the package.",
      timeSpent: "Western Circuit, Day 2.",
      card: "images/destinations/geothermal-spa-3.jpg",
      banner: "images/destinations/geothermal-spa-2.jpg",
      cardAlt: "A Rift Valley lake near the Geothermal Spa",
      bannerAlt: "The warm pools at the Geothermal Spa near Naivasha",
      gallery: [
        { src: "images/destinations/geothermal-spa-1.jpg", alt: "A guide looking out over the Rift Valley" },
        { src: "images/destinations/geothermal-spa.jpg", alt: "Zebra and a safari vehicle on the Rift Valley floor" },
        { src: "images/destinations/geothermal-spa-4.jpg", alt: "The gorge at Hell's Gate, near the spa" },
      ],
    },

    {
      slug: "soysambu-conservancy",
      name: "Soysambu Conservancy",
      region: "Western Circuit",
      blurb: "Private conservancy on Lake Elementaita, home to Rothschild’s giraffe.",
      metaTitle: "Soysambu Conservancy: giraffe on Lake Elementaita | YOLO Safaris",
      metaDescription:
        "Day 3 of the Western Circuit: a game drive through Soysambu " +
        "Conservancy on the shore of Lake Elementaita.",
      intro:
        "Soysambu is a private wildlife conservancy wrapped around Lake " +
        "Elementaita. Giraffe, zebra and buffalo graze down to the lakeshore.",
      whyGo: [
        "Rothschild’s giraffe, one of Africa’s rarer giraffe.",
        "Game viewing without the crowds of the big parks.",
        "Lake views and birdlife on the same drive.",
      ],
      doThis: [
        "Drive north from Naivasha along the Rift Valley floor.",
        "Take a game drive across the conservancy.",
        "Look for giraffe, zebra, buffalo and eland.",
        "Finish the day on the shore of Lake Elementaita.",
      ],
      bestTime: "Year-round. The dry months, June to October, are easiest for game drives.",
      gettingThere: "Road transfer from Naivasha, included in the package.",
      timeSpent: "Western Circuit, Day 3.",
      card: "images/destinations/soysambu-conservancy-2.jpg",
      banner: "images/destinations/soysambu-conservancy.jpg",
      cardAlt: "Lake Elementaita and the escarpment from Soysambu",
      bannerAlt: "A lioness and her cubs in Soysambu Conservancy",
      gallery: [
        { src: "images/destinations/soysambu-conservancy-1.jpg", alt: "Zebra drinking at the lakeshore in Soysambu" },
        { src: "images/destinations/soysambu-conservancy-3.jpg", alt: "Rothschild's giraffe in Soysambu Conservancy" },
        { src: "images/destinations/soysambu-conservancy-4.jpg", alt: "Tents pitched on the shore of Lake Elementaita" },
      ],
    },

    {
      slug: "lake-elementaita",
      name: "Lake Elementaita",
      region: "Western Circuit",
      blurb: "Rift Valley soda lake, known for its birdlife.",
      metaTitle: "Lake Elementaita: Rift Valley birdlife | YOLO Safaris",
      metaDescription:
        "Day 3 of the Western Circuit: an afternoon on the shore of Lake " +
        "Elementaita, beside Soysambu Conservancy.",
      intro:
        "Elementaita is a shallow soda lake on the floor of the Great Rift " +
        "Valley. The birdlife is the draw, and the escarpment behind it is the view.",
      whyGo: [
        "Birdlife on a Rift Valley soda lake.",
        "Escarpment views from the lakeshore.",
        "A quieter night than the busy parks.",
      ],
      doThis: [
        "Arrive at the lake after the Soysambu game drive.",
        "Spend the afternoon on the lakeshore.",
        "Look for flamingos and pelicans, when water levels suit them.",
        "Watch the sun go down over the escarpment.",
      ],
      bestTime: "The dry months, roughly June to October, are easiest underfoot.",
      gettingThere: "Part of the Soysambu day, included in the package.",
      timeSpent: "Western Circuit, Day 3.",
      card: "images/destinations/lake-elementaita-4.jpg",
      banner: "images/destinations/lake-elementaita-1.jpg",
      cardAlt: "Lake Elementaita and the hills behind it",
      bannerAlt: "Flamingos in flight over Lake Elementaita",
      gallery: [
        { src: "images/destinations/lake-elementaita-2.jpg", alt: "A giraffe at the edge of Lake Elementaita" },
        { src: "images/destinations/lake-elementaita-3.jpg", alt: "The shallows and reeds at Lake Elementaita" },
        { src: "images/destinations/lake-elementaita.jpg", alt: "Flamingos crowding the shallows of Lake Elementaita" },
      ],
    },

    {
      slug: "lake-nakuru",
      name: "Lake Nakuru National Park",
      region: "Western Circuit",
      blurb: "National park around a soda lake, known for rhino and flamingos.",
      metaTitle: "Lake Nakuru National Park: rhino and flamingos | YOLO Safaris",
      metaDescription:
        "Day 4 of the Western Circuit: a morning game drive in Lake Nakuru " +
        "National Park, looking for rhino, giraffe and flamingos.",
      intro:
        "Lake Nakuru National Park rings a soda lake below the town of Nakuru. " +
        "It is one of Kenya’s best places to see both black and white rhino.",
      whyGo: [
        "Black and white rhino in a protected park.",
        "Flamingos and pelicans on the lake, when water levels suit them.",
        "Viewpoints such as Baboon Cliff over the whole lake.",
      ],
      doThis: [
        "Take a morning game drive through the park.",
        "Look for rhino, Rothschild’s giraffe, buffalo and lion.",
        "Stop at Baboon Cliff for the view.",
        "Drive north to Thomsons Falls in the afternoon.",
      ],
      bestTime: "Year-round. Mornings are best for wildlife.",
      gettingThere: "Short road transfer from Lake Elementaita, included in the package.",
      timeSpent: "Western Circuit, Day 4 morning.",
      card: "images/destinations/lake-nakuru.jpg",
      banner: "images/destinations/lake-nakuru-2.jpg",
      cardAlt: "Acacia woodland in Lake Nakuru National Park",
      bannerAlt: "Flamingos on Lake Nakuru",
      gallery: [
        { src: "images/destinations/lake-nakuru-1.jpg", alt: "Flamingos and storks in the shallows of Lake Nakuru" },
        { src: "images/destinations/lake-nakuru-3.jpg", alt: "Waterbirds along the shore of Lake Nakuru" },
        { src: "images/destinations/lake-nakuru-4.jpg", alt: "A white rhino in Lake Nakuru National Park" },
      ],
    },

    {
      slug: "thomsons-falls",
      name: "Thomsons Falls",
      region: "Western Circuit",
      blurb: "A 74-metre waterfall on the edge of Nyahururu town.",
      metaTitle: "Thomsons Falls, Nyahururu | YOLO Safaris",
      metaDescription:
        "Day 4 of the Western Circuit: an afternoon at Thomsons Falls, the " +
        "74-metre waterfall at Nyahururu.",
      intro:
        "Thomsons Falls drops 74 metres off the edge of the plateau at " +
        "Nyahururu. Paths lead to viewpoints at the top and down towards the foot.",
      whyGo: [
        "One of Kenya’s best-known waterfalls.",
        "Cool highland air after the Rift Valley floor.",
        "A short walk with a big view.",
      ],
      doThis: [
        "Drive north from Lake Nakuru to Nyahururu.",
        "View the falls from the top.",
        "Walk the path down towards the base, if you want to.",
        "Rest up before the drive south to the Mara.",
      ],
      bestTime: "Just after the rains, when the falls run fullest.",
      gettingThere: "Road transfer from Lake Nakuru, included in the package.",
      timeSpent: "Western Circuit, Day 4 afternoon.",
      card: "images/destinations/thomsons-falls-5.jpg",
      banner: "images/destinations/thomsons-falls-1.jpg",
      cardAlt: "The main drop at Thomsons Falls",
      bannerAlt: "The main drop at Thomsons Falls",
      gallery: [
        { src: "images/destinations/thomsons-falls-4.jpg", alt: "The foot of Thomsons Falls" },
        { src: "images/destinations/thomsons-falls-3.jpg", alt: "The drive south from Nyahururu towards the Mara" },
        { src: "images/destinations/thomsons-falls.jpg", alt: "Thomsons Falls from the top viewpoint" },
      ],
    },

    {
      slug: "narok",
      name: "Narok",
      region: "Western Circuit",
      blurb: "Market town on the road into the Maasai Mara.",
      metaTitle: "Narok: the road into the Maasai Mara | YOLO Safaris",
      metaDescription:
        "A stop on Day 5 of the Western Circuit, where the road into the " +
        "Maasai Mara passes through the market town of Narok.",
      intro:
        "Narok is the last big town before the Mara. The road through it is " +
        "the usual way in, and the stop breaks up the drive.",
      whyGo: [
        "A natural break on the drive to the Mara.",
        "A Maasai market town on the way in.",
        "The last stop for supplies before the reserve.",
      ],
      doThis: [
        "Drive south through the Rift Valley.",
        "Stop in Narok to stretch and pick up supplies.",
        "Continue west towards the Maasai Mara.",
        "Watch the country change from farmland to open plains.",
      ],
      bestTime: "You pass through en route, so this depends on your travel dates.",
      gettingThere: "On the road into the Maasai Mara.",
      timeSpent: "A stop on Day 5 of the Western Circuit.",
      card: "images/destinations/narok-2.jpg",
      banner: "images/destinations/narok.jpg",
      cardAlt: "Narok town from the air",
      bannerAlt: "The road through Narok towards the Maasai Mara",
      gallery: [
        { src: "images/destinations/narok-1.jpg", alt: "Cattle crossing the road in Narok town" },
        { src: "images/destinations/narok-3.jpg", alt: "Narok County from the air" },
        { src: "images/destinations/narok-4.jpg", alt: "The main street in Narok in 1973" },
      ],
    },

    {
      slug: "maasai-village",
      name: "Maasai Village",
      region: "Western Circuit",
      blurb: "An afternoon with a Maasai community on the edge of the Mara.",
      metaTitle: "Maasai Village visit | YOLO Safaris",
      metaDescription:
        "Day 5 of the Western Circuit: a visit to a Maasai village on the " +
        "road into the Maasai Mara.",
      intro:
        "On the way into the Mara, a Maasai community welcomes you into its " +
        "village for song, dance and a look at daily life.",
      whyGo: [
        "Meet Maasai families in their own home.",
        "See traditional song and dance, including the famous jumping.",
        "Buy beadwork straight from the people who made it.",
      ],
      doThis: [
        "Be welcomed with song and dance.",
        "Walk through the homestead and see inside a traditional house.",
        "Watch fire being made the traditional way.",
        "Browse beadwork and crafts made in the village.",
      ],
      bestTime: "Year-round.",
      gettingThere: "On the road between Narok and the Maasai Mara.",
      timeSpent: "Western Circuit, Day 5.",
      card: "images/destinations/beadwork.jpeg",
      banner: "images/destinations/maasai-village-1.jpg",
      cardAlt: "Colourful Maasai beadwork",
      bannerAlt: "A Maasai community gathered at the village",
      gallery: [
        { src: "images/destinations/artifacts.jpeg", alt: "Handmade Kenyan artifacts on display" },
        { src: "images/destinations/weaving.jpeg", alt: "Traditional weaving by local craftspeople" },
        { src: "images/destinations/maasai-village-2.jpg", alt: "Maasai villagers in traditional dress" },
      ],
    },

    {
      slug: "maasai-mara",
      name: "Maasai Mara",
      region: "Western Circuit",
      blurb: "Kenya’s best-known reserve: big cats, plains and the great migration.",
      metaTitle: "Maasai Mara: game drives and the great migration | YOLO Safaris",
      metaDescription:
        "Days 5 and 6 of the Western Circuit: afternoon and morning game " +
        "drives in the Maasai Mara.",
      intro:
        "The Mara closes the Western Circuit. An afternoon game drive on " +
        "arrival and a morning drive on the last day, across open plains.",
      whyGo: [
        "Two game drives on Kenya’s best-known plains.",
        "Open country where wildlife is easy to see.",
        "The annual migration passes through between July and October.",
      ],
      doThis: [
        "Drive in through Narok and a Maasai village.",
        "Take an afternoon game drive on arrival.",
        "Head out again early on the last morning.",
        "Look for lion, cheetah, elephant and buffalo.",
        "Drive back to Nairobi for your flight.",
      ],
      bestTime: "July to October for the migration. Wildlife is present all year.",
      gettingThere: "Road transfer through Narok, included in the package.",
      timeSpent: "Western Circuit, Days 5 and 6.",
      card: "images/destinations/maasai-mara.jpeg",
      banner: "images/destinations/maasai-mara-3.jpg",
      cardAlt: "The Maasai Mara on a YOLO Safaris game drive",
      bannerAlt: "Wildebeest crossing the plains of the Maasai Mara",
      gallery: [
        { src: "images/destinations/sunset.jpeg", alt: "Sunset over the plains of the Maasai Mara" },
        { src: "images/destinations/maasai-mara-1.jpg", alt: "A male lion on the plains of the Maasai Mara" },
        { src: "images/destinations/maasai-mara-2.jpg", alt: "A lion and lionesses in the Maasai Mara" },
      ],
    },

    /* ------------------------------------------ Coast Circuit ---------- */

    {
      slug: "mombasa",
      name: "Mombasa",
      region: "Coast Circuit",
      blurb: "Indian Ocean port city and the base for the Coast Circuit.",
      metaTitle: "Mombasa: old town and the Indian Ocean | YOLO Safaris",
      metaDescription:
        "Days 2 to 4 of the Coast Circuit: the train from Nairobi and three " +
        "days based in Mombasa, Kenya’s Indian Ocean port.",
      intro:
        "Mombasa is the base for the Coast Circuit. Heat, ocean and history, " +
        "with Haller Park, Fort Jesus, Mamba Village and Wild Waters close by.",
      whyGo: [
        "The Indian Ocean after the train ride from Nairobi.",
        "Old Town streets and carved Swahili doors.",
        "Warm water and a slower pace.",
      ],
      doThis: [
        "Take the SGR train from Nairobi to Mombasa.",
        "Walk the Old Town and the waterfront.",
        "Eat Swahili food by the ocean.",
        "Use the city as your base for three days of visits.",
      ],
      bestTime: "December to March is the driest and hottest stretch.",
      // TODO(owner): confirm how guests travel from Nairobi to Mombasa, the
      // SGR train or a domestic flight, and say so here.
      gettingThere: "SGR train from Nairobi, included in the package.",
      timeSpent: "Coast Circuit, Days 2 to 4.",
      card: "images/destinations/mombasa.jpg",
      banner: "images/destinations/mombasa-1.jpg",
      cardAlt: "Beach umbrellas and swimmers on a tropical shore",
      bannerAlt: "The Mombasa tusks on Moi Avenue",
      gallery: [
        { src: "images/destinations/fort-jesus.jpg", alt: "The walls of Fort Jesus on Mombasa Island" },
        { src: "images/destinations/hakuna-matata.jpeg", alt: "A curio stall in Mombasa" },
        { src: "images/destinations/nyama-choma.jpeg", alt: "Grilled meat, a Kenyan plate" },
      ],
    },

    {
      slug: "haller-park",
      name: "Haller Park",
      region: "Coast Circuit",
      blurb: "A former quarry turned nature park, with giraffe, hippo and giant tortoises.",
      metaTitle: "Haller Park, Bamburi | YOLO Safaris",
      metaDescription:
        "Day 2 of the Coast Circuit: an afternoon at Haller Park, a former " +
        "quarry turned nature park north of Mombasa.",
      intro:
        "Haller Park in Bamburi was once a limestone quarry. It has been " +
        "turned back into forest and wetland, now home to giraffe, hippo and " +
        "giant tortoises.",
      whyGo: [
        "Feeding time with the giraffes.",
        "Giant tortoises, some of them very old.",
        "A green, shady afternoon on your first day at the coast.",
      ],
      doThis: [
        "Arrive in Mombasa on the train.",
        "Walk the park’s trails.",
        "Catch the giraffe and hippo feeding times.",
        "Meet the giant tortoises.",
      ],
      bestTime: "Year-round. Late afternoon is cooler.",
      gettingThere: "Short transfer north of Mombasa, included in the package.",
      timeSpent: "Coast Circuit, Day 2.",
      card: "images/destinations/haller-park.jpg",
      banner: "images/destinations/haller-park-3.jpg",
      cardAlt: "Giant tortoises at Haller Park",
      bannerAlt: "A giraffe at Haller Park, Bamburi",
      gallery: [
        { src: "images/destinations/haller-park-1.jpg", alt: "A giant tortoise at Haller Park" },
        { src: "images/destinations/haller-park-2.jpg", alt: "A hippo in the water at Haller Park" },
        { src: "images/destinations/haller-park-4.jpg", alt: "A Masai giraffe at Haller Park" },
      ],
    },

    {
      slug: "fort-jesus",
      name: "Fort Jesus",
      region: "Coast Circuit",
      blurb: "A 16th-century Portuguese fort and UNESCO World Heritage Site.",
      metaTitle: "Fort Jesus and Mombasa Old Town | YOLO Safaris",
      metaDescription:
        "Day 3 of the Coast Circuit: Fort Jesus, the 16th-century Portuguese " +
        "fort, and a walk through Mombasa Old Town.",
      intro:
        "The Portuguese built Fort Jesus in the 1590s to guard Mombasa’s old " +
        "harbour. Today it is a museum, and the Old Town sits right outside its walls.",
      whyGo: [
        "Four centuries of coastal history in one place.",
        "A UNESCO World Heritage Site.",
        "The Old Town’s alleys and carved doors next door.",
      ],
      doThis: [
        "Take a guided walk through the fort and its museum.",
        "Climb the ramparts for views over the harbour.",
        "Walk into the Old Town.",
        "Stop for Swahili coffee or a snack.",
      ],
      bestTime: "Year-round. Mornings are cooler for walking.",
      gettingThere: "On Mombasa Island, a short drive from your hotel.",
      timeSpent: "Coast Circuit, Day 3.",
      card: "images/destinations/fort-jesus.jpg",
      banner: "images/destinations/fort-jesus-1.jpg",
      cardAlt: "Inside the stone passage at Fort Jesus",
      bannerAlt: "The seaward walls and cannon at Fort Jesus",
      gallery: [
        { src: "images/destinations/fort-jesus-2.jpg", alt: "The fort walls from the Old Town street" },
        { src: "images/destinations/fort-jesus-3.jpg", alt: "Inside the ramparts at Fort Jesus" },
        { src: "images/destinations/fort-jesus-4.jpg", alt: "A carved door in Mombasa Old Town" },
      ],
    },

    {
      slug: "mamba-village",
      name: "Mamba Village",
      region: "Coast Circuit",
      blurb: "Crocodile farm and gardens in Nyali.",
      metaTitle: "Mamba Village, Nyali | YOLO Safaris",
      metaDescription:
        "Day 4 of the Coast Circuit: a morning at Mamba Village, the " +
        "crocodile farm in Nyali.",
      intro:
        "Mamba Village in Nyali is a crocodile farm set among ponds and " +
        "gardens. Feeding time is the highlight.",
      whyGo: [
        "Crocodiles up close, safely.",
        "Feeding time is a show in itself.",
        "An easy morning before Wild Waters.",
      ],
      doThis: [
        "Tour the crocodile ponds with a guide.",
        "Watch the crocodiles being fed.",
        "Walk through the gardens.",
        "Continue to Wild Waters for the afternoon.",
      ],
      bestTime: "Year-round.",
      gettingThere: "Short transfer to Nyali, included in the package.",
      timeSpent: "Coast Circuit, Day 4 morning.",
      card: "images/destinations/mamba-village-4.jpg",
      banner: "images/destinations/mamba-village.jpg",
      cardAlt: "The gardens at Mamba Village",
      bannerAlt: "The ponds and gardens at Mamba Village",
      gallery: [
        { src: "images/destinations/mamba-village-1.jpg", alt: "Crocodiles on the bank at Mamba Village" },
        { src: "images/destinations/mamba-village-2.jpg", alt: "Crocodiles at the water's edge" },
        { src: "images/destinations/mamba-village-3.jpg", alt: "The crocodile ponds at Mamba Village" },
      ],
    },

    {
      slug: "wild-waters",
      name: "Wild Waters",
      region: "Coast Circuit",
      blurb: "Water park in Nyali with slides, pools and rides.",
      metaTitle: "Wild Waters, Nyali | YOLO Safaris",
      metaDescription:
        "Day 4 of the Coast Circuit: an afternoon at Wild Waters, the water " +
        "park in Nyali.",
      intro:
        "Wild Waters is a water park in Nyali, north of Mombasa. It is a fun, " +
        "loud afternoon, especially with children.",
      whyGo: [
        "Slides and pools for all ages.",
        "A break from sightseeing in the coastal heat.",
        "A favourite on family trips.",
      ],
      doThis: [
        "Spend the afternoon on the slides and in the pools.",
        "Relax on the loungers between rides.",
        "Grab food inside the park.",
        "Transfer back to your hotel.",
      ],
      bestTime: "Year-round. The hotter months make it even better.",
      gettingThere: "In Nyali, a short transfer from Mamba Village.",
      timeSpent: "Coast Circuit, Day 4 afternoon.",
      card: "images/destinations/wild-waters.jpg",
      banner: "images/destinations/wild-waters.jpg",
      cardAlt: "Slides and pools at Wild Waters in Nyali",
      bannerAlt: "Slides and pools at Wild Waters in Nyali",
      /* TODO(owner): only one photograph of the park itself exists so far. The
         strip carries the Nyali shoreline around it until more park photos
         arrive. */
      gallery: [
        { src: "images/destinations/wild-waters.jpg", alt: "The slides and pools at Wild Waters in Nyali" },
        { src: "images/destinations/wild-waters-1.jpg", alt: "Nyali Beach, a few minutes from Wild Waters" },
        { src: "images/destinations/wild-waters-2.jpg", alt: "The shoreline at Nyali, north of Mombasa" },
      ],
    },

    {
      slug: "diani",
      name: "Diani",
      region: "Coast Circuit",
      blurb: "White-sand beach south of Mombasa. The resting stop.",
      metaTitle: "Diani Beach: the closing stop | YOLO Safaris",
      metaDescription:
        "Days 5 and 6 of the Coast Circuit: Diani Beach, south of Mombasa, " +
        "where the trip slows down before the journey home.",
      intro:
        "Diani is where the trip slows down. Long beach, warm water and " +
        "nothing scheduled after four busy days.",
      whyGo: [
        "A quiet end to a busy trip.",
        "Warm Indian Ocean water.",
        "A slow last morning before you fly.",
      ],
      doThis: [
        "Travel south from Mombasa.",
        "Spend the day on the beach.",
        "Swim, or take a boat out if you want to.",
        "Transfer out for your flight home.",
      ],
      bestTime: "December to March for the driest, hottest weather.",
      gettingThere: "Short transfer south of Mombasa, included in the package.",
      timeSpent: "Coast Circuit, Days 5 and 6.",
      card: "images/destinations/diani.jpg",
      banner: "images/destinations/diani-4.jpg",
      cardAlt: "Aerial view of a white sand beach and turquoise water",
      bannerAlt: "Sunrise over Diani Beach",
      gallery: [
        { src: "images/destinations/diani-1.jpg", alt: "Diani Beach on the south coast" },
        { src: "images/destinations/diani-2.jpg", alt: "White sand and turquoise water at Diani Beach" },
        { src: "images/destinations/diani-3.jpg", alt: "Diani Beach seen from the treeline" },
      ],
    },
  ],
};
