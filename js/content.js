/* ==========================================================================
   YOLO Safaris — site content
   --------------------------------------------------------------------------
   Every string, price, visit, FAQ entry and contact detail on the site lives
   in the single SITE object below. js/app.js and js/parallax.js read it and
   build the pages. Edit this file and nothing else.

   Values are written once and reused through tokens, so a price or a phone
   number only has to be right in one place:

     {price}  {per}  {duration}  {durationLong}  {visitCount}  {phone}
     {email}  {year}

   How to add an eighth destination
   --------------------------------------------------------------------------
     1. Add one object to SITE.visits below (copy an existing one).
     2. Copy visits/diani.html to visits/<new-slug>.html and change the
        data-visit="..." attribute on <body>.
     That is all. The nav, the visit grid, the home cards, the footer and the
     previous/next links all follow automatically.

   OPEN ITEMS FOR THE OWNER — search for "TODO(owner)" to find each one.
   --------------------------------------------------------------------------
     1. Final duration. The printed brochure says "7 Day Stay in Kenya"; this
        build says 6 days / 5 nights. Fix SITE.package.duration.
     2. Charity wording. Confirm "a portion of every booking" is approved.
     3. Deposit and balance terms, see SITE.contactPage.payment.
     4. Cancellation and refund wording, see SITE.home.booking.note.
     5. Formspree form ID, see SITE.form.endpoint (README has the steps).
     6. Guide names, roles and real photographs, see SITE.about.team.
     7. The Maasai Mara to the coast leg: road transfer or domestic flight,
        see SITE.visits (mombasa.gettingThere).
     8. Real photography. Every image slot is a generated placeholder except
        the home hero and the share image, which are crops from the brochure.
     9. Site URL once the domain is live, see SITE.meta.url.
   ========================================================================== */

const SITE = {

  /* ==================================================================== */
  /* Site-wide                                                            */
  /* ==================================================================== */

  /* Link previews and the canonical URL. Page titles and descriptions live in
     `pages` below, one entry per page. */
  meta: {
    siteName: "YOLO Safaris",
    // TODO(owner): replace with the real address once the domain is live.
    url: "https://yolosafaris.co.ke/",
    shareImage: "assets/social-share.jpg",
  },

  /* Page titles and meta descriptions. `visit` is the fallback used by the
     seven visit pages, which override it from their own entry in `visits`. */
  pages: {
    home: {
      title: "YOLO Safaris — {duration} in Kenya from {price}",
      description:
        "A guided {durationLong} safari across Nairobi, Nyeri, Lake " +
        "Elementaita, the Maasai Mara, Narok, Mombasa and Diani. From {price} " +
        "per guest, with accommodation, park fees and meals included.",
    },
    about: {
      title: "About YOLO Safaris — a Kenya-based safari operator",
      description:
        "Who we are, where we operate in Kenya, and how a portion of every " +
        "booking funds community charity work through Tembea Kenya.",
    },
    visits: {
      title: "Visits — seven stops in Kenya | YOLO Safaris",
      description:
        "Nairobi, Nyeri, Lake Elementaita, the Maasai Mara, Narok, Mombasa " +
        "and Diani, grouped by region and included in the package price.",
    },
    contact: {
      title: "Contact and booking enquiries | YOLO Safaris",
      description:
        "Send a booking enquiry for the {durationLong} Kenya safari from " +
        "{price} per guest. Email, phone and WhatsApp, or use the form.",
    },
    visit: {
      title: "Visits | YOLO Safaris",
      description: "A stop on the YOLO Safaris route through Kenya.",
    },
  },

  brand: {
    name: "YOLO Safaris",
    mark: "assets/logo-mark.png",
    markAlt: "YOLO Safaris: a sun rising over mountains and an acacia tree",
    logo: "assets/logo.jpeg",
    logoAlt: "YOLO Safaris logo",
    tagline: "Where the Love for Nature and Adventure meets God’s creatives…",
    positioning: "More than a holiday — a journey with purpose.",
  },

  /* Price and duration, once each. */
  package: {
    price: "USD 3,200",
    per: "per guest",
    duration: "6 Days / 5 Nights",
    durationLong: "6 days and 5 nights",
    // TODO(owner): the brochure says "7 Day Stay in Kenya". Confirm the final
    // figure, then update `duration` and `durationLong` above.
  },

  contact: {
    phoneDisplay: "+254 727 720 566",
    phoneHref: "tel:+254727720566",
    whatsappHref: "https://wa.me/254727720566",
    whatsappLabel: "WhatsApp",
    email: "yolosafaris@gmail.com",
    emailHref: "mailto:yolosafaris@gmail.com",
    base: "Nairobi, Kenya",
    replyTime: "We reply within 24 hours.",
  },

  ui: {
    skipToContent: "Skip to content",
    navLabel: "Main",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    whatsappFloat: "Chat with YOLO Safaris on WhatsApp",
    viewDetails: "View details",
    visitCount: "{visitCount} visits",
    includedInPrice: "Included in the package price",
  },

  nav: [
    { label: "Home", href: "index.html", page: "home" },
    { label: "About", href: "about.html", page: "about" },
    { label: "Visits", href: "visits.html", page: "visits" },
    { label: "Contact", href: "contact.html", page: "contact" },
  ],
  headerCta: { label: "Book / Enquire", href: "contact.html" },

  footer: {
    blurb: "Kenya-based safari operator. {durationLong} in Kenya from {price} per guest.",
    exploreTitle: "Explore",
    visitsTitle: "Visits",
    contactTitle: "Contact",
    smallPrint:
      "© {year} YOLO Safaris. All prices in US dollars. Package price and " +
      "itinerary are confirmed in writing when you book.",
    notIncludedLine:
      "Not included: international flights, Kenyan visa or eVisa, travel " +
      "insurance, souvenirs and tips.",
  },

  /* ==================================================================== */
  /* Home                                                                 */
  /* ==================================================================== */

  home: {

    hero: {
      eyebrow: "More than a holiday — a journey with purpose.",
      headline:
        "Six days in Kenya — Nairobi, the Maasai Mara and the coast, " +
        "guided end to end.",
      tagline: "Where the Love for Nature and Adventure meets God’s creatives…",
      /* A real photograph. images/hero1.jpeg (two elephants) is spare. */
      image: "images/hero2.jpeg",
      imageAlt: "Wildebeest crossing the plains at sunset beside a safari vehicle",
      primaryCta: { label: "Reserve your spot", href: "contact.html" },
      secondaryCta: { label: "See the itinerary", href: "#itinerary" },
      /* Exactly five facts. Two of them read straight from `package`. */
      facts: [
        "From {price} {per}",
        "{duration}",
        "Accommodation included",
        "{visitCount} destinations",
        "Part of every booking goes to charity",
      ],
    },

    why: {
      title: "Why YOLO Safaris",
      intro: "Three things we do differently.",
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

    featured: {
      title: "Where you go",
      intro: "Four of the seven stops, from the capital to the Indian Ocean.",
    },

    itinerary: {
      title: "The itinerary",
      intro:
        "Six days, seven stops, one line per day. The final routing is " +
        "confirmed with you when you book.",
      days: [
        {
          day: "Day 1",
          line: "Arrive in Nairobi. Airport transfer, the Museum of Illusions and the Giraffe Centre.",
        },
        {
          day: "Day 2",
          line: "Nairobi to Nyeri. Drive into the central highlands and settle in for the night.",
        },
        {
          day: "Day 3",
          line: "Nyeri to Lake Elementaita. Rift Valley views, then a lakeside afternoon.",
        },
        {
          day: "Day 4",
          line: "Lake Elementaita to the Maasai Mara, through Narok. Afternoon game drive.",
        },
        {
          day: "Day 5",
          line: "Maasai Mara. Morning and afternoon game drives on the open plains.",
        },
        {
          day: "Day 6",
          line: "Maasai Mara to Mombasa and Diani. Coastal time to close the trip, then transfer out.",
        },
      ],
      // TODO(owner): confirm the day-by-day routing, and see the note on the
      // Maasai Mara to coast leg under visits (mombasa).
    },

    included: {
      sectionTitle: "What the price covers",
      sectionIntro:
        "One package price for the in-Kenya stay. Here is what is in it, what " +
        "is not, and what you pay for yourself.",
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
          line: "Tell us your dates, your country and how many guests are travelling.",
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
      lead: "Tembea Kenya — empowering the lives of people.",
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
          q: "Is the price per person?",
          a:
            "Yes. {price} is {per} for the {durationLong} in-Kenya stay. Ask " +
            "us about solo travellers and single-room options.",
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
      line: "Send us your dates and we will confirm the route, the price and what is included.",
      cta: { label: "Reserve your spot", href: "contact.html" },
      secondary: { label: "See all visits", href: "visits.html" },
    },
  },

  /* ==================================================================== */
  /* About                                                                */
  /* ==================================================================== */

  about: {
    title: "About YOLO Safaris",
    intro:
      "A Kenya-based operator running one route, guided end to end, with part " +
      "of every booking funding community work.",

    story: {
      title: "Who we are",
      body: [
        "YOLO Safaris is a Kenya-based tour operator. We plan and run safaris for visitors from abroad, from arrival to departure.",
        "Every trip is guided by a Kenyan driver-guide and priced as one package for the in-Kenya stay.",
        "We keep the route small and the price clear: one figure covering accommodation, transport, park fees and meals.",
      ],
    },

    operates: {
      title: "Where we operate",
      line:
        "All seven stops are inside Kenya: Nairobi and the central highlands, " +
        "the Rift Valley, the Maasai Mara, and the coast at Mombasa and Diani.",
    },

    culture: {
      title: "Tembea Kenya",
      lead: "Tembea Kenya — empowering the lives of people.",
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
          line: "Every stop on the route is Kenyan, and so is the team that runs it.",
        },
        {
          title: "A trip that gives back",
          line: "Part of every booking funds school fees and family support.",
        },
      ],
    },

    team: {
      title: "Your guides",
      intro: "The people who plan and run the route.",
      // TODO(owner): add real names, roles and photographs. The portraits below
      // are generated placeholders and the cards deliberately carry no names
      // until you supply them.
      people: [
        {
          role: "Driver-guides",
          line: "They know the route, the parks and the wildlife.",
          image: "images/team/guide-1.svg",
          alt: "Placeholder portrait for a YOLO Safaris driver-guide",
        },
        {
          role: "Trip planners",
          line: "One person answers your enquiry and plans your dates.",
          image: "images/team/guide-2.svg",
          alt: "Placeholder portrait for a YOLO Safaris trip planner",
        },
        {
          role: "Community partners",
          line: "They deliver the charity work where it is needed.",
          image: "images/team/guide-3.svg",
          alt: "Placeholder portrait for a YOLO Safaris community partner",
        },
      ],
    },

    closing: {
      title: "Travel with us",
      line: "Ask us anything about the route, the price or the charity work before you book.",
      cta: { label: "Send an enquiry", href: "contact.html" },
      secondary: { label: "See the visits", href: "visits.html" },
    },
  },

  /* ==================================================================== */
  /* Visits index                                                         */
  /* ==================================================================== */

  visitsPage: {
    title: "Visits",
    intro: "Seven stops across four regions of Kenya.",
    /* Cards are grouped in this order. A visit joins a group by its `region`. */
    regions: ["Nairobi & Central", "Rift Valley", "Maasai Mara", "Coast"],
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
  /* Visit detail pages — shared labels                                   */
  /* ==================================================================== */

  visitPage: {
    whyTitle: "Why go",
    doTitle: "What you will do there",
    factsTitle: "Practical notes",
    bestTimeLabel: "Best time to visit",
    gettingThereLabel: "How you get there",
    timeSpentLabel: "Time in the package",
    includedNote: "This stop is included in the package price of {price} {per}.",
    galleryTitle: "Photos",
    previousLabel: "Previous visit",
    nextLabel: "Next visit",
    allVisitsLabel: "All visits",
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
    intro: "Tell us your dates and we will reply within a day.",

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
          line: "Your dates, guest count and trip type reach us by email.",
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
    intro: "Seven fields. We reply by email or WhatsApp.",

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
        placeholder: "For example: 12–18 July 2027",
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
        placeholder: "Anything we should know — dietary needs, children travelling, dates you are flexible on.",
        required: false,
      },
    },
    fieldOrder: ["name", "email", "country", "dates", "guests", "tripType", "message"],

    /* Spam honeypot. Hidden from guests, so bots fill it in and we quietly
       ignore the submission. */
    honeypotLabel: "Leave this field empty",

    submit: "Send enquiry",
    sending: "Sending…",
    success: "Thank you — we’ll reply within 24 hours.",
    errorGeneral: "We could not send your enquiry. Please email or WhatsApp us instead.",
    placeholderNotice:
      "The booking form is not connected yet. Please email or WhatsApp us " +
      "instead and we will reply within 24 hours.",
    fallbackLead: "Prefer not to use the form?",
  },

  /* ==================================================================== */
  /* The seven visits                                                     */
  /* ---------------------------------------------------------------------- */
  /* featured: true  -> also shown as a card on the home page.             */
  /* region          -> which group it sits in on visits.html.             */
  /* card / banner   -> 16:9.  gallery -> 3:2.                             */
  /* ==================================================================== */

  visits: [
    {
      slug: "nairobi",
      name: "Nairobi",
      region: "Nairobi & Central",
      featured: true,
      blurb: "Start here: the Museum of Illusions and the Giraffe Centre.",
      metaTitle: "Nairobi — Museum of Illusions and the Giraffe Centre | YOLO Safaris",
      metaDescription:
        "Day 1 of the YOLO Safaris route: airport transfer, the Giraffe " +
        "Centre and the Museum of Illusions in Nairobi.",
      intro:
        "Kenya’s capital opens the trip. Your guide meets you at the airport, " +
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
        "Settle into your hotel before the drive north the next morning.",
      ],
      bestTime: "Year-round. Nairobi sits at altitude, so evenings are cool.",
      gettingThere: "Fly into Nairobi. The airport transfer is part of the package.",
      timeSpent: "Day 1, and the final transfer out.",
      card: "images/destinations/nairobi.svg",
      banner: "images/destinations/nairobi.svg",
      cardAlt: "Placeholder image for Nairobi",
      bannerAlt: "Placeholder banner image for Nairobi",
      gallery: [
        { src: "images/destinations/nairobi-1.svg", alt: "Placeholder photo of Nairobi, 1" },
        { src: "images/destinations/nairobi-2.svg", alt: "Placeholder photo of Nairobi, 2" },
        { src: "images/destinations/nairobi-3.svg", alt: "Placeholder photo of Nairobi, 3" },
      ],
    },

    {
      slug: "nyeri",
      name: "Nyeri",
      region: "Nairobi & Central",
      blurb: "Highland town between Mount Kenya and the Aberdare range.",
      metaTitle: "Nyeri — central highlands stop | YOLO Safaris",
      metaDescription:
        "Day 2 of the YOLO Safaris route: the drive from Nairobi into Kenya’s " +
        "central highlands for a night in Nyeri.",
      intro:
        "Nyeri sits in the central highlands, between Mount Kenya and the " +
        "Aberdare range. The drive up from Nairobi leaves the heat behind.",
      whyGo: [
        "Cool highland air after the capital.",
        "Tea and coffee country along the road north.",
        "A quiet night between Nairobi and the Rift Valley.",
      ],
      doThis: [
        "Leave Nairobi after breakfast.",
        "Drive north through the central highlands.",
        "Stop for views of the Aberdare range.",
        "Settle in for the night in Nyeri.",
      ],
      bestTime: "Year-round. The highlands are cooler than the coast.",
      gettingThere: "Road transfer from Nairobi, included in the package.",
      timeSpent: "Day 2, one night.",
      card: "images/destinations/nyeri.svg",
      banner: "images/destinations/nyeri.svg",
      cardAlt: "Placeholder image for Nyeri",
      bannerAlt: "Placeholder banner image for Nyeri",
      gallery: [
        { src: "images/destinations/nyeri-1.svg", alt: "Placeholder photo of Nyeri, 1" },
        { src: "images/destinations/nyeri-2.svg", alt: "Placeholder photo of Nyeri, 2" },
        { src: "images/destinations/nyeri-3.svg", alt: "Placeholder photo of Nyeri, 3" },
      ],
    },

    {
      slug: "lake-elementaita",
      name: "Lake Elementaita",
      region: "Rift Valley",
      featured: true,
      blurb: "Rift Valley soda lake, known for its birdlife.",
      metaTitle: "Lake Elementaita — Rift Valley birdlife | YOLO Safaris",
      metaDescription:
        "Day 3 of the YOLO Safaris route: the Great Rift Valley escarpment " +
        "and an afternoon on the shore of Lake Elementaita.",
      intro:
        "Elementaita is a shallow soda lake on the floor of the Great Rift " +
        "Valley. The birdlife is the draw, and the escarpment behind it is the view.",
      whyGo: [
        "Birdlife on a Rift Valley soda lake.",
        "Escarpment views from the lakeshore.",
        "A quieter night than the busy parks.",
      ],
      doThis: [
        "Drive south from Nyeri into the Great Rift Valley.",
        "Stop at a viewpoint over the escarpment.",
        "Spend the afternoon on the lakeshore.",
        "Look for flamingos and pelicans, when water levels suit them.",
      ],
      bestTime: "The dry months, roughly June to October, are easiest underfoot.",
      gettingThere: "Road transfer from Nyeri, included in the package.",
      timeSpent: "Day 3, one night.",
      card: "images/destinations/lake-elementaita.svg",
      banner: "images/destinations/lake-elementaita.svg",
      cardAlt: "Placeholder image for Lake Elementaita",
      bannerAlt: "Placeholder banner image for Lake Elementaita",
      gallery: [
        { src: "images/destinations/lake-elementaita-1.svg", alt: "Placeholder photo of Lake Elementaita, 1" },
        { src: "images/destinations/lake-elementaita-2.svg", alt: "Placeholder photo of Lake Elementaita, 2" },
        { src: "images/destinations/lake-elementaita-3.svg", alt: "Placeholder photo of Lake Elementaita, 3" },
      ],
    },

    {
      slug: "maasai-mara",
      name: "Maasai Mara",
      region: "Maasai Mara",
      featured: true,
      blurb: "Kenya’s best-known reserve — big cats, plains and the great migration.",
      metaTitle: "Maasai Mara — game drives and the great migration | YOLO Safaris",
      metaDescription:
        "Days 4 and 5 of the YOLO Safaris route: two days of morning and " +
        "afternoon game drives in the Maasai Mara.",
      intro:
        "The Mara is the centrepiece of the trip. Two days here means morning " +
        "and afternoon game drives, long plains and big cats.",
      whyGo: [
        "Two days of game drives, morning and afternoon.",
        "Open plains where wildlife is easy to see.",
        "The annual migration passes through between July and October.",
      ],
      doThis: [
        "Drive in from Lake Elementaita through Narok.",
        "Take an afternoon game drive on arrival.",
        "Spend a full day on morning and afternoon game drives.",
        "Look for lion, cheetah, elephant and buffalo.",
        "Stay in the reserve or on its edge for two nights.",
      ],
      bestTime: "July to October for the migration. Wildlife is present all year.",
      gettingThere: "Road transfer from Lake Elementaita, included in the package.",
      timeSpent: "Days 4 and 5, two nights.",
      card: "images/destinations/maasai-mara.svg",
      banner: "images/destinations/maasai-mara.svg",
      cardAlt: "Placeholder image for the Maasai Mara",
      bannerAlt: "Placeholder banner image for the Maasai Mara",
      gallery: [
        { src: "images/destinations/maasai-mara-1.svg", alt: "Placeholder photo of the Maasai Mara, 1" },
        { src: "images/destinations/maasai-mara-2.svg", alt: "Placeholder photo of the Maasai Mara, 2" },
        { src: "images/destinations/maasai-mara-3.svg", alt: "Placeholder photo of the Maasai Mara, 3" },
      ],
    },

    {
      slug: "narok",
      name: "Narok",
      region: "Rift Valley",
      blurb: "Market town on the road into the Maasai Mara.",
      metaTitle: "Narok — the road into the Maasai Mara | YOLO Safaris",
      metaDescription:
        "A stop on day 4 of the YOLO Safaris route, where the road into the " +
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
        "Drive south from Lake Elementaita.",
        "Stop in Narok to stretch and pick up supplies.",
        "Continue west into the Maasai Mara.",
        "Watch the country change from farmland to open plains.",
      ],
      bestTime: "You pass through en route, so this depends on your travel dates.",
      gettingThere: "On the road between Lake Elementaita and the Maasai Mara.",
      timeSpent: "A stop on Day 4.",
      card: "images/destinations/narok.svg",
      banner: "images/destinations/narok.svg",
      cardAlt: "Placeholder image for Narok",
      bannerAlt: "Placeholder banner image for Narok",
      gallery: [
        { src: "images/destinations/narok-1.svg", alt: "Placeholder photo of Narok, 1" },
        { src: "images/destinations/narok-2.svg", alt: "Placeholder photo of Narok, 2" },
        { src: "images/destinations/narok-3.svg", alt: "Placeholder photo of Narok, 3" },
      ],
    },

    {
      slug: "mombasa",
      name: "Mombasa",
      region: "Coast",
      blurb: "Indian Ocean port city with old-town streets and beaches.",
      metaTitle: "Mombasa — old town and the Indian Ocean | YOLO Safaris",
      metaDescription:
        "The coastal close of the YOLO Safaris route: Mombasa old town, the " +
        "waterfront and the beaches south of the city.",
      intro:
        "Mombasa closes the trip with heat, ocean and history. The old town " +
        "and the beaches are the two halves of a day here.",
      whyGo: [
        "The Indian Ocean after five days inland.",
        "Fort Jesus and the old-town streets.",
        "Warm water and a slower pace.",
      ],
      doThis: [
        "Travel from the Maasai Mara to the coast.",
        "Walk the old town and the waterfront.",
        "Spend time on the beach.",
        "Eat by the ocean before the last transfer.",
      ],
      bestTime: "December to March is the driest and hottest stretch.",
      // TODO(owner): confirm how guests travel from the Maasai Mara to the
      // coast — road transfer or a domestic flight — and say so here.
      gettingThere: "Transferred from the Maasai Mara to the coast as part of the package.",
      timeSpent: "Day 6, before Diani.",
      card: "images/destinations/mombasa.svg",
      banner: "images/destinations/mombasa.svg",
      cardAlt: "Placeholder image for Mombasa",
      bannerAlt: "Placeholder banner image for Mombasa",
      gallery: [
        { src: "images/destinations/mombasa-1.svg", alt: "Placeholder photo of Mombasa, 1" },
        { src: "images/destinations/mombasa-2.svg", alt: "Placeholder photo of Mombasa, 2" },
        { src: "images/destinations/mombasa-3.svg", alt: "Placeholder photo of Mombasa, 3" },
      ],
    },

    {
      slug: "diani",
      name: "Diani",
      region: "Coast",
      featured: true,
      blurb: "White-sand beach south of Mombasa. The resting stop.",
      metaTitle: "Diani Beach — the closing stop | YOLO Safaris",
      metaDescription:
        "The last stop on the YOLO Safaris route: Diani Beach, south of " +
        "Mombasa, where the trip slows down before the journey home.",
      intro:
        "Diani is where the trip slows down. Long beach, warm water and " +
        "nothing scheduled after five days of driving and game drives.",
      whyGo: [
        "A quiet end to a busy trip.",
        "Warm Indian Ocean water.",
        "No driving on the last day.",
      ],
      doThis: [
        "Travel south from Mombasa.",
        "Spend the day on the beach.",
        "Swim, or take a boat out if you want to.",
        "Transfer out for your flight home.",
      ],
      bestTime: "December to March for the driest, hottest weather.",
      gettingThere: "Short transfer south of Mombasa, included in the package.",
      timeSpent: "Day 6, the closing stop.",
      card: "images/destinations/diani.svg",
      banner: "images/destinations/diani.svg",
      cardAlt: "Placeholder image for Diani",
      bannerAlt: "Placeholder banner image for Diani",
      gallery: [
        { src: "images/destinations/diani-1.svg", alt: "Placeholder photo of Diani, 1" },
        { src: "images/destinations/diani-2.svg", alt: "Placeholder photo of Diani, 2" },
        { src: "images/destinations/diani-3.svg", alt: "Placeholder photo of Diani, 3" },
      ],
    },
  ],
};
