/* ------------------------------------------------------------------
   Portfolio data — edit this file to update the site.
   Everything on the page is rendered from these objects.
------------------------------------------------------------------- */
window.PORTFOLIO = {
  profile: {
    name: "Aaditya Tamrakar",
    handle: "aadityatamrakar",
    title: "Full Stack Engineer · ML · Algo Trading",
    tagline: "Techie who builds for the web, trains models on the side, and writes code that trades.",
    location: "India / Boston, MA",
    email: "aaditya.span@gmail.com",
    links: {
      github: "https://github.com/aadityatamrakar",
      linkedin: "https://www.linkedin.com/in/aadityatamrakar/",
      x: "https://x.com/t_aaditya",
      website: "https://aadityatamrakar.in"
    },
    // Static fallback; live numbers are fetched from the GitHub API.
    stats: { repos: 38, stars: 139, followers: 48 }
  },

  /* Career & education, newest first. */
  journey: [
    {
      when: "2026 — Present",
      role: "Independent Engineer",
      org: "Building trading tools and open source SDKs",
      type: "work",
      notes: "Working on my own trading tooling, broker SDKs and writing. Open to full time and contract roles."
    },
    {
      when: "2023 — Dec 2025",
      role: "Software Engineer",
      org: "Viasat Inc.",
      type: "work",
      notes: "Full stack and platform engineering on large scale systems."
    },
    {
      when: "2021 — 2023",
      role: "M.S. Computer Science",
      org: "University of Massachusetts, Boston",
      type: "education",
      notes: "Graduate coursework in UI design (CS615), systems and algorithms. Supported CS240 (Programming in C, Fall 2022) with lecture sample programs."
    },
    {
      when: "2019 — 2021",
      role: "Full Stack Developer · Quant Dev",
      org: "Algo Maker",
      type: "work",
      notes: "Built trading tools around NSE data: option chain analytics, futures spread charts, broker API SDKs."
    },
    {
      when: "2016 — 2019",
      role: "Freelance Full Stack Developer",
      org: "Independent",
      type: "work",
      notes: "Shipped PHP/Laravel backends, Node.js APIs and Ionic/AngularJS hybrid apps for small businesses: food delivery, fleet management, dealership reporting, accounting."
    }
  ],

  /* Skill groups. `tags` map to project tech so hovering a skill lights up matching projects. */
  skills: [
    { group: "Languages", items: ["JavaScript", "TypeScript", "Python", "PHP", "Go", "C", "SQL"] },
    { group: "Frontend", items: ["React", "AngularJS", "Angular", "Bootstrap", "jQuery", "Handlebars", "PWA"] },
    { group: "Backend", items: ["Node.js", "Express", "Laravel", "Lumen", "Loopback", "REST API", "Socket.io"] },
    { group: "Mobile", items: ["Ionic", "Cordova", "Android"] },
    { group: "Data & ML", items: ["scikit-learn", "matplotlib", "Data Analysis", "MongoDB", "MySQL", "Firebase"] },
    { group: "Trading", items: ["NSE Data", "Options", "Kite Connect", "XTS API", "5paisa", "Hummingbot"] }
  ],

  /* Project categories used by the filter bar. */
  categories: [
    { id: "all", label: "All" },
    { id: "trading", label: "Trading & Finance" },
    { id: "ml", label: "ML & Data" },
    { id: "web", label: "Web Apps" },
    { id: "mobile", label: "Mobile" },
    { id: "tools", label: "Tools & Experiments" },
    { id: "academic", label: "Academic" }
  ],

  /* Original (non-fork) public repositories, with history from the very first commit. */
  projects: [
    {
      repo: "option_chain_analysis",
      post: "/blog/nse-option-chain-analysis/",
      name: "Option Chain Analysis",
      year: 2019,
      started: "2019-11",
      updated: "2022-10",
      category: "trading",
      featured: true,
      stars: 106,
      forks: 77,
      tech: ["Node.js", "Handlebars", "Bootstrap", "REST API", "NSE Data", "Options"],
      summary: "Live NSE Nifty option chain fetched, analysed and rendered on one page to read market sentiment at a glance.",
      details: [
        "Pulls the official NSE option chain on every visit; expiry selector filters the strikes.",
        "Classifies each strike by price change vs open interest change: long buildup, short buildup, short covering, long liquidation.",
        "Scraping done with cURL after Node request/https libraries were blocked by NSE.",
        "Switchable to FINNIFTY. Most starred repo on the profile (106 stars, 77 forks)."
      ]
    },
    {
      repo: "dream11-cricket-team-builder",
      post: "/blog/fantasy-cricket-team-optimiser/",
      name: "Dream11 Cricket Team Builder",
      year: 2020,
      started: "2020-10",
      updated: "2020-11",
      category: "ml",
      featured: true,
      stars: 5,
      forks: 0,
      tech: ["Node.js", "Data Analysis"],
      summary: "Generates high probability fantasy cricket line-ups for IPL matches from player pick rates and points.",
      details: [
        "Picks the top 18 players by selection frequency, then enumerates every valid 11.",
        "Lineup rules (3-3-3-2, 4-4-2-1 and more) are declared as constraints and validated.",
        "Final team chosen randomly or by projected points from JSON datasets."
      ]
    },
    {
      repo: "captcha_ai",
      post: "/blog/captcha-solver-scikit-learn/",
      name: "Captcha AI",
      year: 2018,
      started: "2018-01",
      updated: "2021-10",
      category: "ml",
      featured: true,
      stars: 2,
      forks: 1,
      tech: ["Python", "scikit-learn", "matplotlib", "PHP", "jQuery"],
      summary: "Machine learning solver that reads text out of captcha images with 99.7% reported accuracy.",
      details: [
        "Pipeline: trim whitespace, segment letters, rotate, normalise size, vectorise pixels.",
        "scikit-learn classifier exported as model.pkl and served behind a PHP API with an HTML/jQuery front end.",
        "Includes a data capture tool to label new samples."
      ]
    },
    {
      repo: "umbtrading",
      post: "/blog/options-ui-for-beginners-cs615/",
      name: "UMB Trading",
      year: 2021,
      started: "2021-12",
      updated: "2021-12",
      category: "academic",
      featured: true,
      stars: 2,
      forks: 2,
      tech: ["HTML", "Options", "UI Design"],
      summary: "CS615 User Interface Design project: an options trading interface simple enough for beginners.",
      details: [
        "Problem: option chains are hard to read, so new traders avoid them.",
        "Goal: make trading, learning and practising options possible from one guided screen.",
        "Live prototype on GitHub Pages plus a project site documenting the design process."
      ]
    },
    {
      repo: "futures_spread_chart",
      post: "/blog/cash-futures-spread-chart/",
      name: "Futures Spread Chart",
      year: 2020,
      started: "2020-05",
      updated: "2020-05",
      category: "trading",
      stars: 1,
      forks: 0,
      tech: ["Node.js", "Express", "Data Analysis", "NSE Data"],
      summary: "Daily cash market vs futures spread chart for NSE stocks.",
      details: [
        "Express server collects price data via HTTP and serves a chart page.",
        "Highlights basis (spread) movement to spot arbitrage and sentiment shifts."
      ]
    },
    {
      repo: "option_chain_php",
      name: "Option Chain (PHP)",
      year: 2020,
      started: "2020-04",
      updated: "2020-05",
      category: "trading",
      stars: 1,
      forks: 1,
      tech: ["PHP", "HTML", "NSE Data", "Options"],
      summary: "PHP port of the option chain analyser for shared hosting setups.",
      details: ["Same buildup classification logic, no Node runtime required."]
    },
    {
      repo: "creative_accounting",
      post: "/blog/dealership-reporting-laravel-cron/",
      name: "Creative Accounting",
      year: 2020,
      started: "2020-03",
      updated: "2020-04",
      category: "web",
      stars: 1,
      forks: 0,
      tech: ["JavaScript", "Node.js"],
      summary: "Accounting web application for ledgers, transactions and reports.",
      details: ["Built during 2020 as a bookkeeping tool for a small business."]
    },
    {
      repo: "food_delivery_app_backend_admin",
      post: "/blog/shipping-food-delivery-solo/",
      name: "Food Delivery · Backend & Admin",
      year: 2019,
      started: "2019-02",
      updated: "2019-02",
      category: "web",
      stars: 2,
      forks: 2,
      tech: ["PHP", "Laravel", "MySQL", "REST API", "SMS API"],
      summary: "Laravel backend, REST API and admin panel powering a food delivery product.",
      details: [
        "Order, menu and restaurant management with reporting.",
        "SMS API integration for order notifications.",
        "Pairs with the Ionic app and the web frontend below."
      ]
    },
    {
      repo: "food_delivery_app_frontend",
      post: "/blog/shipping-food-delivery-solo/",
      name: "Food Delivery · Web Frontend",
      year: 2019,
      started: "2019-02",
      updated: "2019-02",
      category: "web",
      stars: 3,
      forks: 0,
      tech: ["JavaScript", "Bootstrap", "AJAX", "Payment Gateway"],
      summary: "Customer facing website with AJAX search, cart and payment gateway checkout.",
      details: ["Bootstrap 3 UI talking to the Laravel API."]
    },
    {
      repo: "food_delivery_app",
      post: "/blog/shipping-food-delivery-solo/",
      name: "Food Delivery · Mobile App",
      year: 2019,
      started: "2019-02",
      updated: "2019-02",
      category: "mobile",
      stars: 1,
      forks: 0,
      tech: ["Ionic", "AngularJS", "REST API"],
      summary: "Hybrid mobile app for ordering food, consuming the Laravel web services.",
      details: ["Ionic + AngularJS, one codebase for Android and iOS."]
    },
    {
      repo: "accounts_diary_android_app",
      name: "Accounts Diary",
      year: 2019,
      started: "2019-02",
      updated: "2019-02",
      category: "mobile",
      stars: 2,
      forks: 0,
      tech: ["Ionic", "AngularJS", "Firebase", "Cordova"],
      summary: "Hybrid Android app to track transactions, bank accounts, transfers and cash in hand.",
      details: [
        "Firebase and localStorage persistence, Gmail backup planned.",
        "Gulp + SCSS build, Cordova packaging."
      ]
    },
    {
      repo: "nodejs_challenge",
      name: "Node.js Order API Challenge",
      year: 2019,
      started: "2019-02",
      updated: "2019-02",
      category: "tools",
      stars: 1,
      forks: 0,
      tech: ["Node.js", "Express", "Socket.io", "REST API"],
      summary: "Order management REST API with auth and real time socket updates, built for a coding challenge.",
      details: ["Express routes, token authentication, Socket.io push on order changes."]
    },
    {
      repo: "DistressAlarmSystem",
      post: "/blog/realtime-distress-alarm-socketio/",
      name: "Distress Alarm System",
      year: 2019,
      started: "2019-01",
      updated: "2019-01",
      category: "tools",
      stars: 1,
      forks: 0,
      tech: ["Socket.io", "WebRTC", "Node.js"],
      summary: "Panic alarm that broadcasts live video to everyone in the same room over sockets.",
      details: ["Socket.io rooms plus browser video broadcasting."]
    },
    {
      repo: "pwa_notes",
      post: "/blog/offline-first-notes-pwa/",
      name: "PWA Notes",
      year: 2018,
      started: "2018-05",
      updated: "2021-10",
      category: "web",
      stars: 1,
      forks: 0,
      tech: ["PWA", "JavaScript", "Service Worker"],
      summary: "Offline first notes app using localStorage, a service worker and a web manifest.",
      details: ["Installable to the Android home screen, works without network."]
    },
    {
      repo: "fleet_management_app",
      name: "Fleet Management App",
      year: 2018,
      started: "2018-03",
      updated: "2018-03",
      category: "web",
      stars: 1,
      forks: 0,
      tech: ["Loopback", "AngularJS", "Node.js"],
      summary: "Transport management system for vehicles, trips and drivers.",
      details: ["Loopback API with an AngularJS dashboard."]
    },
    {
      repo: "proxy_http_web",
      name: "HTTP Proxy Website",
      year: 2018,
      started: "2018-02",
      updated: "2019-02",
      category: "tools",
      stars: 1,
      forks: 0,
      tech: ["Node.js", "Scraping"],
      summary: "Node.js proxy that rewrites pages and injects scripts, used to test browser plugins.",
      details: ["Plugin loader hook for injecting custom JS into proxied pages."]
    },
    {
      repo: "insta_dl",
      name: "Insta DL",
      year: 2018,
      started: "2018-01",
      updated: "2018-01",
      category: "tools",
      stars: 1,
      forks: 0,
      tech: ["Node.js", "Scraping"],
      summary: "Downloader for Instagram profile images.",
      details: ["Small scraper script, one of the earliest Node experiments."]
    },
    {
      repo: "multilevel-marketing-app",
      post: "/blog/dealership-reporting-laravel-cron/",
      name: "Multi-Level Marketing App",
      year: 2018,
      started: "2018-01",
      updated: "2018-01",
      category: "web",
      stars: 1,
      forks: 1,
      tech: ["Laravel", "MySQL", "jQuery", "AJAX", "REST API"],
      summary: "MLM platform with tree algorithms for downline tracking, payouts and reporting.",
      details: ["Laravel backend, Bootstrap/jQuery UI, web services for the mobile client."]
    },
    {
      repo: "city_cars",
      post: "/blog/dealership-reporting-laravel-cron/",
      name: "City Cars Reporting",
      year: 2017,
      started: "2017-04",
      updated: "2019-02",
      category: "web",
      stars: 1,
      forks: 0,
      tech: ["Laravel", "PHP", "MySQL", "AdminLTE", "Cron"],
      summary: "Reporting engine for a Maruti Suzuki car dealership with scheduled email reports.",
      details: ["AdminLTE 2 admin panel, cron job scheduler, email sender."]
    },
    {
      repo: "sic_app_backend",
      name: "Sagar Ice Cream Backend",
      year: 2017,
      started: "2017-04",
      updated: "2017-04",
      category: "web",
      stars: 1,
      forks: 0,
      tech: ["Node.js", "REST API"],
      summary: "Backend API for an ice cream shop's Android ordering app.",
      details: ["Node.js services for products, orders and customers."]
    },
    {
      repo: "buzzotel-internship",
      name: "Buzzotel Internship Challenge",
      year: 2017,
      started: "2017-03",
      updated: "2017-03",
      category: "tools",
      stars: 0,
      forks: 0,
      tech: ["PHP", "JSON"],
      summary: "JSON dataset filtering and parsing challenge solved in PHP.",
      details: ["Array filtering and parsing exercises for an internship application."]
    },
    {
      repo: "aadityatamrakar.github.io",
      name: "This Website",
      year: 2017,
      started: "2017-02",
      updated: "2026-10",
      category: "web",
      stars: 1,
      forks: 0,
      tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      summary: "Personal portfolio. Started as a Jekyll theme in 2017, rebuilt in 2026 as a static interactive page.",
      details: ["Live stats via the GitHub API, filterable project timeline, no build step."]
    },
    {
      repo: "Fashmash-VotingPortal-Lumen",
      name: "Fashmash Voting Portal",
      year: 2017,
      started: "2017-01",
      updated: "2017-04",
      category: "web",
      stars: 0,
      forks: 0,
      tech: ["Lumen", "PHP", "MySQL"],
      summary: "Fantasy league portal where users build a team and vote, on the Lumen micro framework.",
      details: ["Team builder, voting flow and leaderboards."]
    },
    {
      repo: "PayTM-API-UnOfficial",
      name: "PayTM API (Unofficial)",
      year: 2016,
      started: "2016-12",
      updated: "2016-12",
      category: "tools",
      stars: 0,
      forks: 0,
      tech: ["PHP", "REST API"],
      summary: "Reverse engineered PayTM requests for register, login and send money flows.",
      details: ["Educational exploration of the wallet API."]
    },
    {
      repo: "ProductsDisplay",
      name: "Products Display",
      year: 2016,
      started: "2016-11",
      updated: "2016-11",
      category: "web",
      stars: 0,
      forks: 1,
      tech: ["Bootstrap", "jQuery", "JavaScript"],
      summary: "Single page app rendering a product catalogue from JSON.",
      details: ["Bootstrap grid, jQuery templating, client side filtering."]
    },
    {
      repo: "VideoPlayerCss",
      name: "Video Player CSS",
      year: 2016,
      started: "2016-10",
      updated: "2016-10",
      category: "web",
      stars: 0,
      forks: 0,
      tech: ["HTML", "CSS"],
      summary: "Custom styled HTML5 video player. The very first public repo, October 2016.",
      details: ["Built for an Internshala web development application."]
    },
    {
      repo: "cs240-lecture-programs",
      name: "CS240 Lecture Programs",
      year: 2022,
      started: "2022-12",
      updated: "2022-12",
      category: "academic",
      stars: 1,
      forks: 0,
      tech: ["C"],
      summary: "Sample C programs from CS240 lectures, Fall 2022 at UMass Boston.",
      details: ["Reference programs shared with students."]
    }
  ],

  /* Forks and SDKs contributed to or used in trading work. */
  forks: [
    { repo: "xts-interactive-nodeJS-api-v2", desc: "Node.js client for the XTS Interactive trading API v2", lang: "JavaScript", year: 2025 },
    { repo: "gokiteconnect", desc: "Official Go client for Zerodha Kite Connect", lang: "Go", year: 2024 },
    { repo: "hbot-remote-client-py", desc: "Python remote client for Hummingbot", lang: "Python", year: 2023 },
    { repo: "timesheet-app", desc: "React Material Dashboard adapted for timesheets", lang: "JavaScript", year: 2022 },
    { repo: "5paisa-js", desc: "Node.js SDK for 5paisa broker APIs", lang: "JavaScript", year: 2020 },
    { repo: "option-pricing", desc: "Option pricing formulas used by global CCPs", lang: "SQLPL", year: 2020 },
    { repo: "web-speech-api", desc: "Web Speech API demos", lang: "JavaScript", year: 2020 },
    { repo: "zenbot", desc: "Command line crypto trading bot (Node.js, MongoDB)", lang: "JavaScript", year: 2018 },
    { repo: "ludo-board", desc: "Basic Ludo board layout", lang: "CSS", year: 2018 },
    { repo: "teenpatti.angular", desc: "Teen Patti card game with Angular, Node, sockets", lang: "JavaScript", year: 2017 },
    { repo: "amazon-bot", desc: "Amazon automation bot", lang: "JavaScript", year: 2015 }
  ]
};
