import logoImg  from '../assets/images/logo.png';
import heroBgImg from '../assets/images/hero-bg.jpg';
export const LOGO = logoImg;

export const IMAGES = {
  heroBg:    heroBgImg,
  polaroid1: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=500&q=80",
  polaroid2: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&q=80",
  about:     "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=900&q=80",
  howItWorks:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80",
  prevAbout: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=700&q=80",
  prevHow:   "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700&q=80",
  prevDest:  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=80",
  prevRules: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80",
  prevWin:   "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80",
};

export const DESTINATIONS = [
  { city:"Tokyo",        country:"Japan",       img:"https://media.digitalnomads.world/wp-content/uploads/2021/02/20120635/tokyo-for-digital-nomads.jpg", tag:"Asia",        desc:"The electric capital of the East — neon, temples, and the best food on earth." },
  { city:"Paris",        country:"France",      img:"https://cdn1.matadornetwork.com/blogs/1/2011/05/Paris-France-cityscape-destinations-1200x900.jpg", tag:"Europe",      desc:"The city of love, light, and culture. Art, fashion, and the Eiffel Tower await." },
  { city:"Bali",         country:"Indonesia",   img:"https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltbbc2e0b1c3b3e7b0/6839f424a2cdc2af78a94a6a/simon-spring-FchaBnBLDk4-unsplash-MOBILE_HEADER.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart", tag:"Asia",        desc:"Spiritual paradise of emerald rice terraces, temples, and turquoise coastline." },
  { city:"Santorini",    country:"Greece",      img:"https://www.royalcaribbean.com/media-assets/pmc/content/dam/shore-x/santorini-jtr/soc2-pyrgos-village-and-fira-town-with-wine-tasting/stock-photo-fira-town-volcano-sea-santorini_149799614.jpg?w=1920", tag:"Europe",      desc:"White-washed cliffs, blue domes, and sunsets that will stay with you forever." },
  { city:"Machu Picchu", country:"Peru",        img:"https://upload.wikimedia.org/wikipedia/commons/b/bb/Machu_Picchu%2C_2023_%28012%29.jpg", tag:"Americas",    desc:"The ancient Inca citadel floating above the clouds of the Andes mountains." },
  { city:"Cape Town",    country:"S. Africa",   img:"https://media-cdn.tripadvisor.com/media/photo-c/1280x250/14/10/2e/1e/cape-town.jpg", tag:"Africa",      desc:"A breathtaking city nestled beneath Table Mountain, where two coastlines and two cultures converge." },
  { city:"Kyoto",        country:"Japan",       img:"https://substackcdn.com/image/fetch/$s_!WDBx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4408754a-fcbe-4b97-89ca-1df5b339f5f0_2048x1543.jpeg",   tag:"Asia",        desc:"Ancient temples, geisha districts, and cherry blossoms along the Kamo River." },
  { city:"New York",     country:"USA",         img:"https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original", tag:"Americas",    desc:"The city that never sleeps — skyscrapers, art, culture, and Central Park." },
  { city:"Dubai",        country:"UAE",         img:"https://media.cntravellerme.com/photos/68b6f73e5582520a305ec87b/16:9/w_2560%2Cc_limit/1225427289", tag:"Middle East", desc:"A skyline from the future, rising from the desert. Luxury without limits." },
  { city:"Rome",         country:"Italy",       img:"https://res.klook.com/image/upload/fl_lossy.progressive,q_60/Mobile/City/afmqgg5h0jl9wnr1dfmf.jpg",   tag:"Europe",      desc:"The Eternal City — where every cobblestone holds nearly three thousand years of history." },
  { city:"Reykjavík",    country:"Iceland",     img:"https://res.klook.com/image/upload/fl_lossy.progressive,q_60/Mobile/City/gtkfmzv8bmlo8v79d1z2.jpg", tag:"Europe",      desc:"Land of fire and ice — the Northern Lights, geysers, and the midnight sun." },
  { city:"Marrakech",    country:"Morocco",     img:"https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt1c1c620107f17f6b/687f9d512a594b6d7878bb31/iStock-475057992-2-HEADER_MOBILE.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart",   tag:"Africa",      desc:"Vivid souks, rose-pink walls, spice markets, and riads of the ancient medina." },
];

export const PAST_WINNERS = [
  {
    year: 2025,
    members: [
      { name: "Erik Svensson",    country: "Sweden"      },
      { name: "Aisha Diop",       country: "Senegal"     },
      { name: "Marco Ferrari",    country: "Italy"       },
      { name: "Sarah Kim",        country: "South Korea" },
      { name: "Rafael Lima",      country: "Brazil"      },
    ],
    highlight: "Crossed 6 continents in 214 days, visiting 38 countries — the most in TATW history.",
    topDest:    "Antarctica",
    budgetUsed: "$887,440",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=700&q=80",
  },
  {
    year: 2024,
    members: [
      { name: "Mariana Costa",    country: "Portugal"  },
      { name: "Kwame Asante",     country: "Ghana"     },
      { name: "Chloe Beaumont",   country: "France"    },
      { name: "Takeshi Yamamoto", country: "Japan"     },
      { name: "Valentina Cruz",   country: "Colombia"  },
    ],
    highlight: "Explored Southeast Asia and Oceania like no group before. Peak stream: 8.4M viewers.",
    topDest:    "New Zealand",
    budgetUsed: "$963,200",
    img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=700&q=80",
  },
  {
    year: 2023,
    members: [
      { name: "Luna García",          country: "Spain"        },
      { name: "Mohammed Al-Rashid",   country: "Saudi Arabia" },
      { name: "Zara Osei",            country: "Ghana"        },
      { name: "Liam Murphy",          country: "Ireland"      },
      { name: "Nadia Petrov",         country: "Russia"       },
    ],
    highlight: "Won 7 daily challenges — the record — earning 3 bonus destinations along the way.",
    topDest:    "Maldives",
    budgetUsed: "$821,550",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80",
  },
  {
    year: 2022,
    members: [
      { name: "Noah Williams",    country: "USA"     },
      { name: "Fatima Al-Hassan", country: "Morocco" },
      { name: "Andrei Popescu",   country: "Romania" },
      { name: "Isabella Santos",  country: "Brazil"  },
      { name: "Hiroshi Nakamura", country: "Japan"   },
    ],
    highlight: "The most-watched group ever. Their daily stream peaked at 12 million concurrent viewers worldwide.",
    topDest:    "Patagonia",
    budgetUsed: "$998,770",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80",
  },
  {
    year: 2021,
    members: [
      { name: "Sofia Rossi",  country: "Italy"   },
      { name: "James Okafor", country: "Nigeria" },
      { name: "Mei Chen",     country: "China"   },
      { name: "Lucas Dubois", country: "France"  },
      { name: "Priya Sharma", country: "India"   },
    ],
    highlight: "First group to complete every single daily challenge. Perfect record — zero forfeits.",
    topDest:    "Kyoto",
    budgetUsed: "$754,900",
    img: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=700&q=80",
  },
  {
    year: 2020,
    members: [
      { name: "Carlos Mendes",  country: "Brazil"  },
      { name: "Yuki Tanaka",    country: "Japan"   },
      { name: "Amara Diallo",   country: "Senegal" },
      { name: "Emma Lindqvist", country: "Sweden"  },
      { name: "Reza Ahmadi",    country: "Iran"    },
    ],
    highlight: "The pioneers. The very first Worldbound Five. They set the standard for all who came after.",
    topDest:    "Machu Picchu",
    budgetUsed: "$691,300",
    img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=700&q=80",
  },
];
