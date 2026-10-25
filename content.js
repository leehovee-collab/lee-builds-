/* =====================================================================
   LEE'S BUILDS: ALL THE WORDING FOR THE SITE
   ---------------------------------------------------------------------
   You can edit this file in Notepad. Change only the text between the
   "double quotes". Everything else (the design) lives in other files.

   A FEW SIMPLE RULES
   * Keep the "double quotes" around every piece of text.
   * Apostrophes are fine:  "Cynthia's teacakes"
   * If you need a double quote INSIDE the text, use curly ones “like this”.
   * Keep the comma at the end of each line, just as you found it.
   * *one star* around a word makes it the coloured italic word in a title.
   * **two stars** around words makes them bold (used in the pinned notes).
   * Image paths point inside the images folder, e.g. "images/jobwatch/alert.jpg".
     If a file isn't there yet, the site shows a tidy placeholder that says
     which file is needed.
   * Save the file, then refresh the page in your browser to see the change.
   ===================================================================== */

window.CONTENT = {

  /* ---------- THE TOP OF THE PAGE (the kraft folder) ---------- */
  site: {
    pageTitle:   "Lee's Builds",
    description: "A scrapbook of the tools, bots and brands Lee has built with Claude.",
    titleTop:    "Lee's",
    titleBottom: "Builds",
    tagline:     "tools, bots & brands",
    hint:        "drag to spin · tap a build",
    footer:      "Lee's Builds · Bracknell, Berkshire · 2026"
  },

  /* ---------- ABOUT ME ---------- */
  about: {
    photo1:   "images/hero/me-1.jpg",
    photo1Alt: "Lee smiling on a red quad bike in the desert",
    caption1: "that's me",

    photo2:   "images/hero/me-2.jpg",
    photo2Alt: "Lee smiling at a dinner table with cocktails",
    caption2: "also me",

    // The speech bubble (please keep this exactly as it is)
    heading: "hi, i'm *lee*",
    paragraphs: [
      "Over the last four months I've got properly hooked on building a whole array of things with Claude.",
      "These are some of the things I've built so far. Enjoy."
    ],
    ps: "p.s. tap the polaroids up top",

    madeWith: ["Python", "Claude", "Railway", "GitHub", "Telegram", "three.js"],

    currentlyTitle: "currently building",
    currently: [
      "A virtual classroom for a Year 3 class",
      "More JobWatch builds for new clients"
    ]
  },

  /* ---------- THE "ALL BUILDS" LIST ---------- */
  allBuildsTitle: "all builds",
  openLabel: "open",

  /* ---------- EACH BUILD ----------
     They appear in this order everywhere: the spinning ring,
     the list, and the "next build" buttons.
     id      = a short code name used in the web address. Don't change it.
     colour  = the accent colour for that build's page.               */
  builds: [

    /* ===== 1. JOBWATCH ===== */
    {
      id: "jobwatch",
      colour: "#F2C94C",
      name: "JobWatch",                       // full name (list, labels)
      shortName: "job watch",                  // handwritten caption on the polaroid
      listLine: "Client project · Jul 2026",   // small line in the list
      kicker: "client project · jul 2026",     // small label above the title
      title: "job *watch*",
      tags: ["Complete", "Telegram alerts", "5 clients"],
      lede: "An automated job alert system that finds relevant roles, checks each one against the client's CV and sends only the strong matches to her phone.",
      cover: {
        image: "images/jobwatch/thumb.jpg",
        alt: "A JobWatch job match alert in Telegram",
        caption: "a real alert"
      },
      whatIBuiltTitle: "what I built",
      features: [
        {
          image: "images/jobwatch/alert.jpg",
          alt: "Full JobWatch alert showing match score, job details, reasons and apply link",
          caption: "a new job match",
          heading: "the *alerts*",
          text: "Listings come in from Adzuna, Jooble, FashionUnited and Guardian Jobs, and an AI model scores every one against her CV before it reaches her phone.",
          bullets: [
            "A match score with a progress bar, so she can see at a glance how well a job fits.",
            "The role, company, location and type of job all in one place.",
            "A short reason for the score, plus the part of her CV that lines up with it.",
            "A link straight to apply, with a preview of the listing from the job board.",
            "Filters she chose herself, like London only and 50%+ matches."
          ]
        }
      ],
      brief: "A fashion business student wanted entry-level PR and creative marketing roles, without losing hours to job boards and missing the good ones.",
      outcome: "**She landed an internship through it** and the system was switched off. I've since rebuilt it for four more clients in sales, construction and hospitality.",
      madeWith: ["Python", "AI scoring", "Adzuna", "Jooble", "Telegram", "Railway"]
    },

    /* ===== 2. ROSALYNN ===== */
    {
      id: "rosalynn",
      colour: "#6FA8DC",
      name: "Rosalynn",
      shortName: "rosalynn",
      listLine: "Own system · Jul 2026",
      kicker: "own system · jul 2026",
      title: "rosa*lynn*",
      tags: ["Testing phase", "EURUSD", "Runs 24/7"],
      lede: "A rules-based trading bot that spots chart patterns, places and manages its own trades in MetaTrader 5, and messages me at every step.",
      cover: {
        image: "images/rosalynn/thumb.jpg",
        alt: "Rosalynn alerts for a trade going live and a partial profit",
        caption: "straight from Telegram"
      },
      whatIBuiltTitle: "what I built",
      features: [
        {
          image: "images/rosalynn/detected.jpg",
          alt: "Rosalynn pattern alert with trend bias, levels, pending order and invalidation rules",
          caption: "pattern spotted",
          heading: "spots the *pattern*",
          text: "Rosalynn scans EURUSD for M tops and W bottoms and checks them against the bigger trend. When one appears it works out the whole trade: the pattern levels, entry, stop loss, a 1:2 take profit, the position size and the rules that would cancel it."
        },
        {
          image: "images/rosalynn/partial.jpg",
          alt: "Alerts showing the trade triggered and half the profit taken",
          caption: "trade goes live",
          heading: "manages the *trade*",
          text: "It places the order itself, tells me the moment it goes live, takes half the profit at the first target and moves the stop on the rest to breakeven so the trade can't turn into a loss."
        },
        {
          image: "images/rosalynn/choppy.jpg",
          alt: "Alerts for a second partial in choppy conditions and a trailing stop move",
          caption: "trailing the stop",
          heading: "reads the *market*",
          text: "After the first partial it keeps watching. If price starts going sideways it measures how choppy things are, takes a second partial, then keeps trailing the stop behind price."
        },
        {
          image: "images/rosalynn/cancel.jpg",
          alt: "Alert cancelling a pending order because price broke above the M top peak",
          caption: "setup cancelled",
          heading: "knows when to *walk away*",
          text: "If a setup breaks before the order fills, like price pushing back above the M top's peak, it cancels the pending order and explains why."
        },
        {
          image: "images/rosalynn/railway.jpg",
          alt: "Rosalynn shown online on Railway",
          caption: "online on Railway",
          heading: "runs *24/7*",
          text: "It lives on Railway, so it stays online around the clock without my laptop being switched on."
        }
      ],
      brief: "Trade a tested pattern strategy consistently, without watching charts all day or making emotional calls.",
      outcome: "**In the testing phase.** It runs on a demo account while I fine-tune the rules, with every trade logged to Google Sheets.",
      madeWith: ["Python", "MetaApi", "MetaTrader 5", "Google Sheets", "Telegram", "Railway"]
    },

    /* ===== 3. DALGETY HERBAL ICE =====
       Remember: this is a branding concept with design mock-ups.
       The cans were never made or sold, so avoid words like
       "launched", "available" or "buy".                            */
    {
      id: "herbal",
      colour: "#FF8A2B",
      name: "Dalgety Herbal Ice",
      shortName: "herbal ice",
      listLine: "Branding concept · Sep 2026",
      kicker: "branding concept · sep 2026",
      title: "herbal *ice*",
      tags: ["Concept", "Can mock-ups", "5 flavours"],
      lede: "A branding concept and can mock-ups imagining a ready-to-drink iced herbal tea for Dalgety, designed as a range of five ginger flavours.",
      cover: {
        image: "images/herbal/range.jpg",
        alt: "Mock-ups of the five Dalgety Herbal Ice can designs side by side",
        caption: "the full range"
      },
      // The 3D can viewer (spin, zoom, tap a flavour)
      viewer: {
        title: "spin the range",
        hint: "drag to turn · pinch to zoom · tap a flavour",
        note: "3D design mock-ups. Never manufactured.",
        loading: "chilling the cans…",
        failed: "the 3D view couldn't load here",
        allLabel: "Full range",
        allName: "The full range",
        spinOn: "Spinning",
        spinOff: "Paused",
        showBacks: "Show backs",
        showFronts: "Show fronts"
      },
      whatIBuiltTitle: "what I built",
      features: [],
      brief: "Give Dalgety's herbal teas a cold, canned look that would stand out on a shop shelf.",
      outcome: "**A finished branding concept.** Five ginger flavours (lemon, mango, pineapple, passion fruit and sorrel), each with its own colour on a shared design. Built as digital can mock-ups and refined over several rounds of feedback on colour, layout and flavour cues.",
      madeWith: ["Claude", "three.js"]
    },

    /* ===== 4. CYNTHIA'S HOMEMADE TEACAKES ===== */
    {
      id: "cynthia",
      colour: "#F3B5CD",
      name: "Cynthia's Homemade Teacakes",
      shortName: "cynthia's",
      listLine: "Client website · Sep 2026",
      kicker: "client website · sep 2026",
      title: "cynthia's *teacakes*",
      tags: ["Live", "Pre-orders", "Telegram alerts"],
      lede: "A pre-order website for a home bakery selling weekly boxes of cinnamon rolls, cookies and traybakes.",
      cover: {
        image: "images/cynthia/thumb.jpg",
        alt: "The top of the Cynthia's Homemade Teacakes order page",
        caption: "from the live site"
      },
      whatIBuiltTitle: "what I built",
      features: [
        {
          image: "images/cynthia/order-page.jpg",
          alt: "Customer order page with collection day, boxes left and place order button",
          caption: "the order page",
          heading: "easy *ordering*",
          text: "Customers see this week's collection or delivery day, when orders close and how many boxes are left, then pick their boxes. Payment is by bank transfer, with the details on the next page."
        },
        {
          image: "images/cynthia/order-alert.jpg",
          alt: "Telegram order alert listing boxes, delivery fee, total, distance and fuel cost",
          caption: "a new order",
          heading: "instant *order alerts*",
          text: "Every order lands with Cynthia on Telegram with the boxes, delivery fee and total. For deliveries it also works out the distance and the fuel cost of the round trip."
        },
        {
          image: "images/cynthia/bake-sheet.jpg",
          alt: "Weekly bake sheet totalling rolls, cookies and squares by product",
          caption: "the bake sheet",
          heading: "a weekly *bake sheet*",
          text: "Behind the scenes she gets a bake sheet for each week, totalling how many rolls, cookies and squares to make, broken down by product and box size, with cancelled orders left out."
        }
      ],
      brief: "Orders were coming in by message and payments were chased by hand. Cynthia needed one simple place to take the week's orders.",
      outcome: "**Live and taking orders** on its own branded link, styled to match her bakery.",
      madeWith: ["Claude Code", "Railway", "Telegram"]
    },

    /* ===== 5. LEAD TRACKER ===== */
    {
      id: "leads",
      colour: "#F4F1EA",
      name: "Lead tracker",
      shortName: "lead tracker",
      listLine: "Client project · Oct 2026",
      kicker: "client project · oct 2026",
      title: "lead *tracker*",
      tags: ["Complete", "Runs daily", "Telegram alerts"],
      lede: "A prospecting bot that tracks down leads on Instagram every day: creators in the fitness, AI and trading space with high-ticket courses and programmes that the client could sell for.",
      cover: {
        image: "images/leads/thumb.jpg",
        alt: "A lead alert from the High ticket finder bot, with names blurred",
        caption: "a real lead, names blurred"
      },
      whatIBuiltTitle: "what I built",
      features: [
        {
          image: "images/leads/alert.jpg",
          alt: "Lead alert showing approach rating, niche, score, followers, location and reason, with names blurred",
          caption: "a scored lead",
          heading: "scored *leads*",
          text: "Every evening it searches Instagram and checks each account with AI. Each lead comes with:",
          bullets: [
            "An approach rating, easy, medium or hard, so he knows who to message first.",
            "The niche and a score out of 10.",
            "Followers and location.",
            "A short reason the account fits, and a link to the profile."
          ]
        },
        {
          image: "images/leads/summary.jpg",
          alt: "Run summary: 36 checked, 6 leads, split by niche, with the next search time",
          caption: "the daily round-up",
          heading: "a daily *round-up*",
          text: "Every search finishes with a summary of how many accounts were checked, how many leads were found in each niche and when the next search runs."
        }
      ],
      brief: "The client wants to find creators to sell for. He needed a steady list of people with a high-ticket course in fitness, AI or trading, without scrolling Instagram for hours to track them down.",
      outcome: "**Live and running daily** in the client's Telegram group, so every evening he has fresh leads to reach out to.",
      madeWith: ["Python", "Apify", "AI scoring", "Telegram", "Railway"]
    },

    /* ===== 6. YEAR 3 CLASSROOM (coming soon) =====
       Add a photo at images/classroom/thumb.jpg and it will appear
       on the polaroid and the build page automatically.            */
    {
      id: "classroom",
      colour: "#7AD3B0",
      name: "Year 3 classroom",
      shortName: "year 3 classroom",
      listLine: "Coming soon",
      kicker: "education · oct 2026",
      title: "year 3 *classroom*",
      tags: ["Coming soon", "Interactive", "For a Year 3 class"],
      lede: "An interactive classroom built from photos of the real room, where each child's seat opens a world of their own. The full write-up lands here once it's finished.",
      cover: {
        image: "images/classroom/thumb.jpg",
        alt: "The Year 3 virtual classroom",
        caption: "in planning"
      },
      whatIBuiltTitle: "what I built",
      features: [],
      brief: "",     // leave empty to hide the note until it's ready
      outcome: "",
      madeWith: []
    }
  ],

  /* ---------- SMALL LABELS USED AROUND THE SITE ---------- */
  labels: {
    back: "← all builds",
    nextBuild: "next build:",
    backToStart: "back to the start:",
    brief: "the brief",
    outcome: "the outcome",
    madeWith: "made with:",
    pauseSpin: "pause spin",
    playSpin: "play spin",
    missingImage: "photo needed",
    openBuild: "Open"
  },

  /* ---------- OPTIONAL PNG DECORATIONS ----------
     Leave these as "" to use the built-in tape, paperclip and stickers.
     If you add PNG files to images/decor, put their paths here,
     e.g. tape: "images/decor/tape.png"                              */
  decor: {
    tape: "",
    tapeDots: "",
    paperclip: "",
    sparkle: "",
    heart: ""
  }
};
