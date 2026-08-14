/* ==========================================================================
   LUMIÈRE Data Store - Menu, Reviews & Events
   ========================================================================== */

const restaurantData = {
  info: {
    name: "LUMIÈRE",
    tagline: "Prime Steakhouse & Artisanal Bistro",
    address: "742 Fifth Avenue, Midtown Manhattan, New York, NY 10019",
    phone: "+1 (212) 555-0198",
    hours: "Mon - Sun: 11:30 AM - 11:00 PM EST",
    timezone: "America/New_York",
    googleRating: "4.9",
    yelpRating: "4.8",
    michelinGuide: "2026 Recommended"
  },

  menuItems: [
    /* --- US PRIME STEAKS & GRILLS --- */
    {
      id: "steak-01",
      title: "Dry-Aged Tomahawk Ribeye (32 oz)",
      category: "steaks",
      price: 145.00,
      image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1000&auto=format&fit=crop",
      tag: "Chef Signature",
      dietary: ["GF"],
      description: "45-day dry-aged USDA Prime Beef cooked over white oak charcoals, served with bone marrow jus, roasted black garlic, and rosemary sea salt butter.",
      winePairing: "2019 Opus One Napa Valley Cabernet Sauvignon",
      ingredients: "USDA Prime Angus Ribeye, Bone Marrow, Black Garlic, Flaky Maldon Salt, Organic Thyme"
    },
    {
      id: "steak-02",
      title: "Filet Mignon Rossini",
      category: "steaks",
      price: 78.00,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
      tag: "Popular",
      dietary: ["GF"],
      description: "8oz Center-cut tenderloin topped with seared Hudson Valley Foie Gras, black truffle reduction, and sautéed wild chanterelles.",
      winePairing: "2020 Barolo DOCG, Piedmont Italy",
      ingredients: "Prime Beef Tenderloin, Foie Gras, Perigord Black Truffle, Madeira Reduction, Micro Greens"
    },
    {
      id: "steak-03",
      title: "Smoked Wagyu Kansas City Strip",
      category: "steaks",
      price: 115.00,
      image: "https://images.unsplash.com/photo-1603073163308-9654c3fb70b5?q=80&w=1000&auto=format&fit=crop",
      tag: "Limited",
      dietary: ["GF"],
      description: "A5 Miyazaki Wagyu strip sirloin infused with hickory wood smoke, glazed with bourbon-infused shallot reduction.",
      winePairing: "2018 Silver Oak Alexander Valley Cabernet",
      ingredients: "A5 Wagyu Beef, Kentucky Bourbon, Smoked Sea Salt, Shallot Butter"
    },

    /* --- ARTISANAL PIZZA & PASTA --- */
    {
      id: "pasta-01",
      title: "Handcrafted Black Truffle Tagliolini",
      category: "pizza_pasta",
      price: 38.00,
      image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281274?q=80&w=1000&auto=format&fit=crop",
      tag: "House Special",
      dietary: ["V"],
      description: "Fresh egg pasta tossed in 36-month aged Parmigiano Reggiano crema, double-cream butter, shaved fresh Umbrian black truffles.",
      winePairing: "2021 Chardonnay, Russian River Valley",
      ingredients: "Semolina Flour, Free-Range Eggs, Parmigiano Reggiano, Italian Black Truffles"
    },
    {
      id: "pizza-01",
      title: "Burrata & Tartufata Wood-Fired Pizza",
      category: "pizza_pasta",
      price: 32.00,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
      tag: "Best Seller",
      dietary: ["V"],
      description: "72-hour fermented sourdough crust, San Marzano tomato sauce, fresh Puglia Burrata cheese, hot honey drizzle, and fresh basil.",
      winePairing: "2021 Chianti Classico Riserva",
      ingredients: "Sourdough Crust, San Marzano Tomatoes, Creamy Burrata, Calabrian Chili Honey, Basil"
    },
    {
      id: "pasta-02",
      title: "Lobster & Saffron Fettuccine",
      category: "pizza_pasta",
      price: 46.00,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop",
      tag: "Seafood",
      dietary: [],
      description: "Whole Maine lobster tail tossed with squid ink fettuccine, heirloom cherry tomatoes, white wine sauce, and Iranian saffron.",
      winePairing: "2022 Sauvignon Blanc, Marlborough",
      ingredients: "Maine Lobster, Squid Ink Pasta, Saffron, Garlic, Pinot Grigio, Extra Virgin Olive Oil"
    },

    /* --- WINES & CRAFT COCKTAILS --- */
    {
      id: "drink-01",
      title: "The Golden Manhattan (Signature Cocktail)",
      category: "cocktails",
      price: 24.00,
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop",
      tag: "Signature Mix",
      dietary: [],
      description: "WhistlePig 10yr Rye Whiskey, Carpano Antica Formula Vermouth, Angostura Bitters, garnished with edible 24k gold leaf and Luxardo cherry.",
      winePairing: "N/A - Aperitif",
      ingredients: "Rye Whiskey, Sweet Vermouth, Bitters, 24K Gold Flakes"
    },
    {
      id: "drink-02",
      title: "Dom Pérignon Vintage Champagne (Glass)",
      category: "cocktails",
      price: 65.00,
      image: "https://images.unsplash.com/photo-1592892111425-15e04305f961?q=80&w=1000&auto=format&fit=crop",
      tag: "Luxury",
      dietary: ["GF", "VG"],
      description: "Elegantly dynamic blend with vibrant minerality, notes of brioche, white peach, and fine silky effervescence.",
      winePairing: "Pairs brilliantly with Oysters & Wagyu",
      ingredients: "Pinot Noir, Chardonnay grapes (Épernay, France)"
    },

    /* --- DESSERTS --- */
    {
      id: "dessert-01",
      title: "Valrhona Dark Chocolate Sphere",
      category: "desserts",
      price: 22.00,
      image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=1000&auto=format&fit=crop",
      tag: "Interactive",
      dietary: ["V"],
      description: "70% Grand Cru chocolate shell melted at your table with hot salted caramel, filled with hazelnut crunch and Madagascar vanilla bean gelato.",
      winePairing: "10yr Tawny Port, Taylor Fladgate",
      ingredients: "Valrhona Dark Chocolate, Salted Caramel, Hazelnut Praline, Vanilla Gelato"
    },
    {
      id: "dessert-02",
      title: "Smoked Sicilian Pistachio Tiramisu",
      category: "desserts",
      price: 19.00,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop",
      tag: "Favorite",
      dietary: ["V"],
      description: "Espresso-soaked savoiardi biscuits layered with Bronte pistachio mascarpone mousse, cocoa nibs, and applewood smoke.",
      winePairing: "Moscato d'Asti, Vignaioli di S. Stefano",
      ingredients: "Savoiardi, Espresso, Mascarpone, Sicilian Pistachios, Dark Cocoa"
    }
  ],

  happyHourDeals: [
    {
      title: "Half-Price Sommelier Reserve Wines",
      desc: "Get 50% off selected Napa Valley and Tuscan Reserve bottles every Wednesday.",
      discount: "50% OFF"
    },
    {
      title: "Prime Slider & Old Fashioned Duo",
      desc: "Dry-aged mini burger slider with truffle fries and handcrafted bourbon Old Fashioned.",
      price: "$19 ONLY"
    }
  ],

  reviews: [
    {
      id: 1,
      author: "Marcus Vance",
      title: "Food Critic - New York Dining Review",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment: "The Dry-Aged Tomahawk Ribeye at Lumière is unequivocally one of the finest cuts of beef in Manhattan. Impeccable service, dramatic tableside presentations, and an unparalleled wine list!"
    },
    {
      id: 2,
      author: "Sophia Sterling",
      title: "Michelin Guide Reviewer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment: "From the moment you step through the glass doors, the ambiance screams luxury. The wood-fired Burrata Pizza and Black Truffle Tagliolini transported me straight to Northern Italy."
    },
    {
      id: 3,
      author: "David L. Sterling",
      title: "OpenTable Top Diner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment: "We celebrated our 10th anniversary in their Private Dining Patio. The 4-step online booking was smooth, and the staff even had a custom gold menu print waiting for us!"
    }
  ]
};
