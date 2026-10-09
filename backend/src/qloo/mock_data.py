"""TasteGuard Pre-cached Cultural Graph Data
High-fidelity taste graph records for demo mode and contract testing.
Includes realistic affinity vectors across 7 cultural domains and real Qloo URN taxonomy conventions.
"""

from typing import Dict, Any

CACHED_ENTITIES: Dict[str, Dict[str, Any]] = {
    # Brands
    "patagonia": {
        "id": "urn:entity:brand:patagonia_10492",
        "name": "Patagonia",
        "type": "urn:entity:brand",
        "popularity": 0.88,
        "metadata": {"industry": "Apparel & Outdoor Gear", "headquarters": "Ventura, CA"}
    },
    "lexus": {
        "id": "urn:entity:brand:lexus_89211",
        "name": "Lexus",
        "type": "urn:entity:brand",
        "popularity": 0.85,
        "metadata": {"industry": "Luxury Automotive", "headquarters": "Nagoya, Japan"}
    },
    "red_bull": {
        "id": "urn:entity:brand:redbull_33019",
        "name": "Red Bull",
        "type": "urn:entity:brand",
        "popularity": 0.94,
        "metadata": {"industry": "Energy Beverages & Extreme Sports", "headquarters": "Fuschl am See, Austria"}
    },
    "rolex": {
        "id": "urn:entity:brand:rolex_11029",
        "name": "Rolex",
        "type": "urn:entity:brand",
        "popularity": 0.92,
        "metadata": {"industry": "Luxury Horology", "headquarters": "Geneva, Switzerland"}
    },
    "liquid_death": {
        "id": "urn:entity:brand:liquiddeath_55102",
        "name": "Liquid Death",
        "type": "urn:entity:brand",
        "popularity": 0.83,
        "metadata": {"industry": "Canned Water & Punk Culture", "headquarters": "Los Angeles, CA"}
    },

    # Artists
    "zach_bryan": {
        "id": "urn:entity:artist:zach_bryan_77412",
        "name": "Zach Bryan",
        "type": "urn:entity:artist",
        "popularity": 0.93,
        "metadata": {"genre": "Neo-Traditional Country / Folk Rock", "origin": "Oologah, OK"}
    },
    "billie_eilish": {
        "id": "urn:entity:artist:billie_eilish_44190",
        "name": "Billie Eilish",
        "type": "urn:entity:artist",
        "popularity": 0.97,
        "metadata": {"genre": "Alternative Pop / Dark Pop", "origin": "Los Angeles, CA"}
    },
    "fred_again": {
        "id": "urn:entity:artist:fred_again_66281",
        "name": "Fred again..",
        "type": "urn:entity:artist",
        "popularity": 0.91,
        "metadata": {"genre": "Electronic / UK Garage / Club", "origin": "London, UK"}
    },
    "100_gecs": {
        "id": "urn:entity:artist:100_gecs_12948",
        "name": "100 gecs",
        "type": "urn:entity:artist",
        "popularity": 0.72,
        "metadata": {"genre": "Hyperpop / Experimental", "origin": "St. Louis, MO"}
    },
    "khruangbin": {
        "id": "urn:entity:artist:khruangbin_88301",
        "name": "Khruangbin",
        "type": "urn:entity:artist",
        "popularity": 0.86,
        "metadata": {"genre": "Psychedelic Dub / Instrumental Funk", "origin": "Houston, TX"}
    }
}

CACHED_PROFILES: Dict[str, Dict[str, Any]] = {
    # Patagonia Profile
    "urn:entity:brand:patagonia_10492": {
        "affinities": {
            "music": {
                "score": 0.74,
                "top_tags": ["folk", "indie_rock", "americana", "bluegrass"],
                "sample_entities": ["Fleet Foxes", "Lord Huron", "Bon Iver"],
                "evidence_id": "urn:tag:music:genre:americana_88"
            },
            "fashion": {
                "score": 0.92,
                "top_tags": ["gorpcore", "sustainable_textiles", "heritage_workwear", "technical_fleece"],
                "sample_entities": ["Arc'teryx", "Filson", "Blundstone"],
                "evidence_id": "urn:tag:fashion:style:gorpcore_12"
            },
            "dining": {
                "score": 0.78,
                "top_tags": ["farm_to_table", "organic", "camp_cooking", "local_sourcing"],
                "sample_entities": ["Primal Kitchen", "Patagonia Provisions"],
                "evidence_id": "urn:tag:dining:cuisine:farm_to_table_45"
            },
            "beverage": {
                "score": 0.82,
                "top_tags": ["craft_ipa", "cider", "filtered_mountain_water", "natural_wine"],
                "sample_entities": ["Sierra Nevada Brewing", "Athletic Brewing"],
                "evidence_id": "urn:tag:beverage:type:craft_beer_99"
            },
            "travel": {
                "score": 0.95,
                "top_tags": ["national_parks", "trail_running", "backcountry_skiing", "eco_lodging"],
                "sample_entities": ["Yosemite Valley", "Patagonia Chile", "Banff"],
                "evidence_id": "urn:tag:travel:type:wilderness_71"
            },
            "tech": {
                "score": 0.45,
                "top_tags": ["solar_hardware", "gps_watches", "repairable_gear"],
                "sample_entities": ["Garmin", "AllTrails"],
                "evidence_id": "urn:tag:tech:category:outdoor_nav_33"
            },
            "media": {
                "score": 0.86,
                "top_tags": ["nature_documentaries", "conservation_essays", "environmental_journalism"],
                "sample_entities": ["1% for the Planet", "National Geographic"],
                "evidence_id": "urn:tag:media:focus:conservation_04"
            }
        }
    },

    # Zach Bryan Profile
    "urn:entity:artist:zach_bryan_77412": {
        "affinities": {
            "music": {
                "score": 0.96,
                "top_tags": ["americana", "outlaw_country", "roots_rock", "heartland_folk"],
                "sample_entities": ["Tyler Childers", "Jason Isbell", "Turnpike Troubadours"],
                "evidence_id": "urn:tag:music:genre:roots_country_54"
            },
            "fashion": {
                "score": 0.81,
                "top_tags": ["heritage_workwear", "rugged_denim", "flannels", "cowboy_boots"],
                "sample_entities": ["Carhartt", "Wrangler", "Red Wing Shoes"],
                "evidence_id": "urn:tag:fashion:style:workwear_61"
            },
            "dining": {
                "score": 0.85,
                "top_tags": ["texas_bbq", "smokery", "southern_comfort", "diner_culture"],
                "sample_entities": ["Franklin BBQ", "Waffle House"],
                "evidence_id": "urn:tag:dining:cuisine:southern_bbq_22"
            },
            "beverage": {
                "score": 0.90,
                "top_tags": ["american_lager", "bourbon", "whiskey", "iced_tea"],
                "sample_entities": ["Busch Light", "Coors Banquet", "Buffalo Trace"],
                "evidence_id": "urn:tag:beverage:type:american_lager_17"
            },
            "travel": {
                "score": 0.70,
                "top_tags": ["rodeos", "football_stadiums", "rural_roadtrips", "camping"],
                "sample_entities": ["Red Rocks Amphitheatre", "Cheyenne Frontier Days"],
                "evidence_id": "urn:tag:travel:type:roadtrip_82"
            },
            "tech": {
                "score": 0.30,
                "top_tags": ["analog_recording", "vinyl_pressings", "unfiltered_voice_notes"],
                "sample_entities": ["Reel-to-Reel", "Twitter/X unfiltered"],
                "evidence_id": "urn:tag:tech:preference:analog_vintage_10"
            },
            "media": {
                "score": 0.75,
                "top_tags": ["western_dramas", "rodeo_podcasts", "military_veteran_stories"],
                "sample_entities": ["Yellowstone", "The Joe Rogan Experience"],
                "evidence_id": "urn:tag:media:genre:western_storytelling_63"
            }
        }
    },

    # Lexus Profile
    "urn:entity:brand:lexus_89211": {
        "affinities": {
            "music": {
                "score": 0.52,
                "top_tags": ["smooth_jazz", "classical_crossover", "acoustic_pop", "lounge"],
                "sample_entities": ["Norah Jones", "Michael Bublé"],
                "evidence_id": "urn:tag:music:genre:adult_contemporary_39"
            },
            "fashion": {
                "score": 0.78,
                "top_tags": ["quiet_luxury", "business_casual", "designer_golfwear", "fine_cashmere"],
                "sample_entities": ["Peter Millar", "Brooks Brothers", "Loro Piana"],
                "evidence_id": "urn:tag:fashion:style:quiet_luxury_90"
            },
            "dining": {
                "score": 0.89,
                "top_tags": ["omakase", "michelin_starred", "fine_dining_steakhouse", "wine_pairings"],
                "sample_entities": ["Nobu", "Mastro's", "French Laundry"],
                "evidence_id": "urn:tag:dining:cuisine:fine_dining_omakase_08"
            },
            "beverage": {
                "score": 0.84,
                "top_tags": ["single_malt_scotch", "napa_cabernet", "espresso", "japanese_whisky"],
                "sample_entities": ["Yamazaki", "Macallan", "Caymus"],
                "evidence_id": "urn:tag:beverage:type:spirits_premium_41"
            },
            "travel": {
                "score": 0.91,
                "top_tags": ["luxury_resorts", "golf_retreats", "first_class_aviation", "private_spas"],
                "sample_entities": ["Pebble Beach", "Ritz-Carlton", "Aman Tokyo"],
                "evidence_id": "urn:tag:travel:type:luxury_resorts_19"
            },
            "tech": {
                "score": 0.72,
                "top_tags": ["hybrid_powertrains", "audiophile_sound_systems", "precision_engineering"],
                "sample_entities": ["Mark Levinson Audio", "Apple CarPlay"],
                "evidence_id": "urn:tag:tech:automotive_audio_58"
            },
            "media": {
                "score": 0.65,
                "top_tags": ["golf_digest", "financial_times", "architectural_digest"],
                "sample_entities": ["Bloomberg", "Architectural Digest"],
                "evidence_id": "urn:tag:media:focus:business_lifestyle_77"
            }
        }
    },

    # Billie Eilish Profile
    "urn:entity:artist:billie_eilish_44190": {
        "affinities": {
            "music": {
                "score": 0.98,
                "top_tags": ["dark_pop", "indie_electronica", "cinematic_ballads", "alternative_rnb"],
                "sample_entities": ["Finneas", "Lana Del Rey", "Lorde", "Tyler, The Creator"],
                "evidence_id": "urn:tag:music:genre:dark_alt_pop_29"
            },
            "fashion": {
                "score": 0.94,
                "top_tags": ["avant_garde_streetwear", "thrift_upcycled", "oversized_silhouettes", "genderless_fashion"],
                "sample_entities": ["Chrome Hearts", "Gucci", "Skims", "Rick Owens"],
                "evidence_id": "urn:tag:fashion:style:avant_streetwear_83"
            },
            "dining": {
                "score": 0.88,
                "top_tags": ["vegan", "plant_based_streetfood", "sustainable_bakery", "gluten_free"],
                "sample_entities": ["Monty's Good Burger", "Crossroads Kitchen", "Bakery by The Lake"],
                "evidence_id": "urn:tag:dining:diet:strict_vegan_34"
            },
            "beverage": {
                "score": 0.79,
                "top_tags": ["matcha_latte", "oat_milk", "kombucha", "adaptogenic_drinks"],
                "sample_entities": ["Chamberlain Coffee", "Oatly", "Poppi"],
                "evidence_id": "urn:tag:beverage:type:adaptogenic_functional_62"
            },
            "travel": {
                "score": 0.65,
                "top_tags": ["eco_touring", "climate_summits", "creative_retreats", "tokyo_harajuku"],
                "sample_entities": ["Overheated Climate Summit", "Tokyo Arts"],
                "evidence_id": "urn:tag:travel:type:eco_conscious_40"
            },
            "tech": {
                "score": 0.82,
                "top_tags": ["spatial_audio", "creative_ipads", "eco_friendly_vinyl", "tiktok_visuals"],
                "sample_entities": ["Dolby Atmos", "Procreate", "Bio-vinyl pressings"],
                "evidence_id": "urn:tag:tech:preference:spatial_sound_91"
            },
            "media": {
                "score": 0.93,
                "top_tags": ["psychological_thrillers", "anime", "climate_documentaries", "indie_cinema"],
                "sample_entities": ["Studio Ghibli", "A24", "Euphoria"],
                "evidence_id": "urn:tag:media:genre:cinematic_dark_73"
            }
        }
    },

    # Rolex Profile
    "urn:entity:brand:rolex_11029": {
        "affinities": {
            "music": {"score": 0.40, "top_tags": ["classical", "opera", "traditional_jazz"], "sample_entities": ["Yo-Yo Ma", "Pavarotti"], "evidence_id": "urn:tag:music:classical_01"},
            "fashion": {"score": 0.89, "top_tags": ["bespoke_tailoring", "savile_row", "haute_horlogerie"], "sample_entities": ["Brioni", "Kiton"], "evidence_id": "urn:tag:fashion:bespoke_02"},
            "dining": {"score": 0.94, "top_tags": ["three_star_michelin", "caviar_bars", "private_members_clubs"], "sample_entities": ["Annabel's", "Le Bernardin"], "evidence_id": "urn:tag:dining:ultra_luxury_03"},
            "beverage": {"score": 0.91, "top_tags": ["vintage_champagne", "bordeaux_grand_cru", "cognac"], "sample_entities": ["Dom Pérignon", "Château Margaux"], "evidence_id": "urn:tag:beverage:vintage_wine_04"},
            "travel": {"score": 0.96, "top_tags": ["monaco_yacht_show", "st_moritz", "geneva_salons"], "sample_entities": ["Hotel de Paris Monte-Carlo", "Badrutt's Palace"], "evidence_id": "urn:tag:travel:super_prime_05"},
            "tech": {"score": 0.35, "top_tags": ["mechanical_escapements", "chronometers"], "sample_entities": ["Swiss Mechanical Watchmaking"], "evidence_id": "urn:tag:tech:horology_06"},
            "media": {"score": 0.58, "top_tags": ["equestrian_sports", "grand_slam_tennis", "formula_one"], "sample_entities": ["Wimbledon", "The Masters"], "evidence_id": "urn:tag:media:prestigious_sports_07"}
        }
    },

    # 100 gecs Profile (High counterculture, extreme divergence from traditional luxury)
    "urn:entity:artist:100_gecs_12948": {
        "affinities": {
            "music": {"score": 0.99, "top_tags": ["hyperpop", "nightcore", "skate_punk", "chiptune"], "sample_entities": ["Charli xcx", "Dorian Electra"], "evidence_id": "urn:tag:music:hyperpop_11"},
            "fashion": {"score": 0.18, "top_tags": ["thrift_dumpster_chic", "diy_crochet", "wizard_cloaks", "meme_irony"], "sample_entities": ["Depop", "Custom Wizard Robes"], "evidence_id": "urn:tag:fashion:diy_irony_12"},
            "dining": {"score": 0.15, "top_tags": ["late_night_taco_bell", "energy_bars", "cheap_pizza"], "sample_entities": ["Taco Bell", "Gas Station Snacks"], "evidence_id": "urn:tag:dining:late_night_13"},
            "beverage": {"score": 0.22, "top_tags": ["energy_drinks", "hard_seltzer", "mountain_dew"], "sample_entities": ["Monster Energy", "White Claw"], "evidence_id": "urn:tag:beverage:energy_14"},
            "travel": {"score": 0.12, "top_tags": ["minecraft_servers", "basement_shows", "lan_parties"], "sample_entities": ["Discord", "Twitch"], "evidence_id": "urn:tag:travel:virtual_15"},
            "tech": {"score": 0.95, "top_tags": ["ableton_live", "vst_plugins", "fl_studio", "retro_gaming"], "sample_entities": ["Ableton Live", "Nintendo 64"], "evidence_id": "urn:tag:tech:daw_production_16"},
            "media": {"score": 0.86, "top_tags": ["shitpost_memes", "surreal_humor", "speedruns"], "sample_entities": ["TikTok Brainrot", "YouTube Poop"], "evidence_id": "urn:tag:media:surreal_internet_17"}
        }
    }
}
