/**
 * TasteGuard Pre-Cached Cultural Graph Data (TypeScript)
 * Empirical affinity vectors across 7 cultural domains based on Qloo entity taxonomies.
 */

import { QlooEntity, AudienceProfile } from './types'

export const CACHED_ENTITIES: Record<string, QlooEntity> = {
  patagonia: {
    id: 'urn:entity:brand:patagonia_10492',
    name: 'Patagonia',
    type: 'urn:entity:brand',
    popularity: 0.88,
    metadata: { industry: 'Apparel & Outdoor Gear', headquarters: 'Ventura, CA' }
  },
  lexus: {
    id: 'urn:entity:brand:lexus_89211',
    name: 'Lexus',
    type: 'urn:entity:brand',
    popularity: 0.85,
    metadata: { industry: 'Luxury Automotive', headquarters: 'Nagoya, Japan' }
  },
  red_bull: {
    id: 'urn:entity:brand:redbull_33019',
    name: 'Red Bull',
    type: 'urn:entity:brand',
    popularity: 0.94,
    metadata: { industry: 'Energy Beverages & Extreme Sports', headquarters: 'Fuschl am See, Austria' }
  },
  rolex: {
    id: 'urn:entity:brand:rolex_11029',
    name: 'Rolex',
    type: 'urn:entity:brand',
    popularity: 0.92,
    metadata: { industry: 'Luxury Horology', headquarters: 'Geneva, Switzerland' }
  },
  liquid_death: {
    id: 'urn:entity:brand:liquiddeath_55102',
    name: 'Liquid Death',
    type: 'urn:entity:brand',
    popularity: 0.83,
    metadata: { industry: 'Canned Mountain Water & Punk Culture', headquarters: 'Los Angeles, CA' }
  },
  kith: {
    id: 'urn:entity:brand:kith_77189',
    name: 'Kith',
    type: 'urn:entity:brand',
    popularity: 0.87,
    metadata: { industry: 'Luxury Streetwear & Cereal Bar', headquarters: 'New York, NY' }
  },
  zach_bryan: {
    id: 'urn:entity:artist:zach_bryan_77412',
    name: 'Zach Bryan',
    type: 'urn:entity:artist',
    popularity: 0.93,
    metadata: { genre: 'Neo-Traditional Country / Heartland Folk', origin: 'Oologah, OK' }
  },
  billie_eilish: {
    id: 'urn:entity:artist:billie_eilish_44190',
    name: 'Billie Eilish',
    type: 'urn:entity:artist',
    popularity: 0.97,
    metadata: { genre: 'Alternative Pop / Cinematic Dark Pop', origin: 'Los Angeles, CA' }
  },
  fred_again: {
    id: 'urn:entity:artist:fred_again_66281',
    name: 'Fred again..',
    type: 'urn:entity:artist',
    popularity: 0.91,
    metadata: { genre: 'Electronic / UK Garage / Club', origin: 'London, UK' }
  },
  '100_gecs': {
    id: 'urn:entity:artist:100_gecs_12948',
    name: '100 gecs',
    type: 'urn:entity:artist',
    popularity: 0.72,
    metadata: { genre: 'Hyperpop / Experimental Noise', origin: 'St. Louis, MO' }
  },
  khruangbin: {
    id: 'urn:entity:artist:khruangbin_88301',
    name: 'Khruangbin',
    type: 'urn:entity:artist',
    popularity: 0.86,
    metadata: { genre: 'Psychedelic Dub / Global Funk', origin: 'Houston, TX' }
  }
}

export const CACHED_PROFILES: Record<string, AudienceProfile> = {
  // Patagonia Profile
  'urn:entity:brand:patagonia_10492': {
    entity: CACHED_ENTITIES['patagonia'],
    affinities: {
      music: {
        domain: 'music',
        score: 0.74,
        top_tags: ['americana', 'indie_folk', 'roots_rock', 'bluegrass'],
        sample_entities: ['Fleet Foxes', 'Lord Huron', 'Bon Iver'],
        evidence_id: 'urn:tag:music:genre:americana_88'
      },
      fashion: {
        domain: 'fashion',
        score: 0.92,
        top_tags: ['gorpcore', 'sustainable_textiles', 'heritage_workwear', 'technical_fleece'],
        sample_entities: ["Arc'teryx", 'Filson', 'Blundstone'],
        evidence_id: 'urn:tag:fashion:style:gorpcore_12'
      },
      dining: {
        domain: 'dining',
        score: 0.78,
        top_tags: ['farm_to_table', 'organic_sourcing', 'camp_cooking', 'regenerative_agriculture'],
        sample_entities: ['Primal Kitchen', 'Patagonia Provisions'],
        evidence_id: 'urn:tag:dining:cuisine:farm_to_table_45'
      },
      beverage: {
        domain: 'beverage',
        score: 0.82,
        top_tags: ['craft_ipa', 'natural_cider', 'mountain_spring_water', 'kombucha'],
        sample_entities: ['Sierra Nevada Brewing', 'Athletic Brewing'],
        evidence_id: 'urn:tag:beverage:type:craft_beer_99'
      },
      travel: {
        domain: 'travel',
        score: 0.95,
        top_tags: ['national_parks', 'backcountry_camping', 'trail_running', 'eco_lodges'],
        sample_entities: ['Yosemite Valley', 'Torres del Paine', 'Banff'],
        evidence_id: 'urn:tag:travel:type:wilderness_71'
      },
      tech: {
        domain: 'tech',
        score: 0.45,
        top_tags: ['solar_power', 'gps_mapping', 'repairable_hardware'],
        sample_entities: ['Garmin', 'AllTrails'],
        evidence_id: 'urn:tag:tech:category:outdoor_nav_33'
      },
      media: {
        domain: 'media',
        score: 0.86,
        top_tags: ['nature_documentaries', 'conservation_journalism', 'environmental_essays'],
        sample_entities: ['1% for the Planet', 'National Geographic'],
        evidence_id: 'urn:tag:media:focus:conservation_04'
      }
    },
    demographics: { core_age: '25-42', privacy: '0-PII aggregate' }
  },

  // Zach Bryan Profile
  'urn:entity:artist:zach_bryan_77412': {
    entity: CACHED_ENTITIES['zach_bryan'],
    affinities: {
      music: {
        domain: 'music',
        score: 0.96,
        top_tags: ['americana', 'outlaw_country', 'roots_rock', 'heartland_folk'],
        sample_entities: ['Tyler Childers', 'Jason Isbell', 'Turnpike Troubadours'],
        evidence_id: 'urn:tag:music:genre:roots_country_54'
      },
      fashion: {
        domain: 'fashion',
        score: 0.81,
        top_tags: ['heritage_workwear', 'rugged_denim', 'flannels', 'cowboy_boots'],
        sample_entities: ['Carhartt', 'Wrangler', 'Red Wing Shoes'],
        evidence_id: 'urn:tag:fashion:style:workwear_61'
      },
      dining: {
        domain: 'dining',
        score: 0.85,
        top_tags: ['texas_bbq', 'smokery', 'southern_comfort', 'diner_culture'],
        sample_entities: ['Franklin BBQ', 'Waffle House'],
        evidence_id: 'urn:tag:dining:cuisine:southern_bbq_22'
      },
      beverage: {
        domain: 'beverage',
        score: 0.90,
        top_tags: ['american_lager', 'kentucky_bourbon', 'whiskey', 'sweet_tea'],
        sample_entities: ['Coors Banquet', 'Busch Light', 'Buffalo Trace'],
        evidence_id: 'urn:tag:beverage:type:american_lager_17'
      },
      travel: {
        domain: 'travel',
        score: 0.70,
        top_tags: ['rodeos', 'football_stadiums', 'rural_roadtrips', 'outdoor_tailgates'],
        sample_entities: ['Red Rocks Amphitheatre', 'Cheyenne Frontier Days'],
        evidence_id: 'urn:tag:travel:type:roadtrip_82'
      },
      tech: {
        domain: 'tech',
        score: 0.30,
        top_tags: ['analog_recording', 'vinyl_pressings', 'unfiltered_social_media'],
        sample_entities: ['Reel-to-Reel Audio', 'X / Twitter Raw Notes'],
        evidence_id: 'urn:tag:tech:preference:analog_vintage_10'
      },
      media: {
        domain: 'media',
        score: 0.75,
        top_tags: ['western_dramas', 'rodeo_culture', 'military_veteran_stories'],
        sample_entities: ['Yellowstone', 'The Joe Rogan Experience'],
        evidence_id: 'urn:tag:media:genre:western_storytelling_63'
      }
    },
    demographics: { core_age: '18-35', privacy: '0-PII aggregate' }
  },

  // Lexus Profile
  'urn:entity:brand:lexus_89211': {
    entity: CACHED_ENTITIES['lexus'],
    affinities: {
      music: {
        domain: 'music',
        score: 0.52,
        top_tags: ['smooth_jazz', 'classical_crossover', 'acoustic_lounge', 'pop_standards'],
        sample_entities: ['Norah Jones', 'Michael Bublé'],
        evidence_id: 'urn:tag:music:genre:adult_contemporary_39'
      },
      fashion: {
        domain: 'fashion',
        score: 0.78,
        top_tags: ['quiet_luxury', 'business_casual', 'designer_golfwear', 'fine_cashmere'],
        sample_entities: ['Peter Millar', 'Brooks Brothers', 'Loro Piana'],
        evidence_id: 'urn:tag:fashion:style:quiet_luxury_90'
      },
      dining: {
        domain: 'dining',
        score: 0.89,
        top_tags: ['omakase', 'michelin_starred', 'fine_dining_steakhouse', 'sommelier_pairings'],
        sample_entities: ['Nobu', "Mastro's", 'French Laundry'],
        evidence_id: 'urn:tag:dining:cuisine:fine_dining_omakase_08'
      },
      beverage: {
        domain: 'beverage',
        score: 0.84,
        top_tags: ['single_malt_scotch', 'napa_cabernet', 'japanese_whisky', 'pour_over_espresso'],
        sample_entities: ['Yamazaki', 'The Macallan', 'Caymus'],
        evidence_id: 'urn:tag:beverage:type:spirits_premium_41'
      },
      travel: {
        domain: 'travel',
        score: 0.91,
        top_tags: ['luxury_resorts', 'golf_retreats', 'first_class_aviation', 'five_star_spas'],
        sample_entities: ['Pebble Beach', 'Ritz-Carlton', 'Aman Tokyo'],
        evidence_id: 'urn:tag:travel:type:luxury_resorts_19'
      },
      tech: {
        domain: 'tech',
        score: 0.72,
        top_tags: ['hybrid_powertrains', 'audiophile_acoustics', 'precision_ergonomics'],
        sample_entities: ['Mark Levinson Audio', 'Apple CarPlay'],
        evidence_id: 'urn:tag:tech:automotive_audio_58'
      },
      media: {
        domain: 'media',
        score: 0.65,
        top_tags: ['golf_coverage', 'financial_intelligence', 'architectural_reviews'],
        sample_entities: ['Bloomberg', 'Architectural Digest'],
        evidence_id: 'urn:tag:media:focus:business_lifestyle_77'
      }
    },
    demographics: { core_age: '35-58', privacy: '0-PII aggregate' }
  },

  // Billie Eilish Profile
  'urn:entity:artist:billie_eilish_44190': {
    entity: CACHED_ENTITIES['billie_eilish'],
    affinities: {
      music: {
        domain: 'music',
        score: 0.98,
        top_tags: ['dark_pop', 'indie_electronica', 'cinematic_ballads', 'alternative_rnb'],
        sample_entities: ['Finneas', 'Lana Del Rey', 'Lorde', 'Tyler, The Creator'],
        evidence_id: 'urn:tag:music:genre:dark_alt_pop_29'
      },
      fashion: {
        domain: 'fashion',
        score: 0.94,
        top_tags: ['avant_garde_streetwear', 'thrift_upcycled', 'oversized_silhouettes', 'genderless_fashion'],
        sample_entities: ['Chrome Hearts', 'Gucci', 'Rick Owens'],
        evidence_id: 'urn:tag:fashion:style:avant_streetwear_83'
      },
      dining: {
        domain: 'dining',
        score: 0.88,
        top_tags: ['vegan', 'plant_based_streetfood', 'sustainable_bakeries', 'zero_waste'],
        sample_entities: ["Monty's Good Burger", 'Crossroads Kitchen'],
        evidence_id: 'urn:tag:dining:diet:strict_vegan_34'
      },
      beverage: {
        domain: 'beverage',
        score: 0.79,
        top_tags: ['ceremonial_matcha', 'oat_milk', 'kombucha', 'adaptogenic_elixirs'],
        sample_entities: ['Chamberlain Coffee', 'Oatly', 'Poppi'],
        evidence_id: 'urn:tag:beverage:type:adaptogenic_functional_62'
      },
      travel: {
        domain: 'travel',
        score: 0.65,
        top_tags: ['eco_touring', 'climate_summits', 'tokyo_harajuku', 'arts_districts'],
        sample_entities: ['Overheated Climate Festival', 'Harajuku Arts'],
        evidence_id: 'urn:tag:travel:type:eco_conscious_40'
      },
      tech: {
        domain: 'tech',
        score: 0.82,
        top_tags: ['spatial_audio', 'creative_ipads', 'recycled_bio_vinyl', 'immersive_visuals'],
        sample_entities: ['Dolby Atmos', 'Procreate', 'Eco-Vinyl Pressings'],
        evidence_id: 'urn:tag:tech:preference:spatial_sound_91'
      },
      media: {
        domain: 'media',
        score: 0.93,
        top_tags: ['psychological_thrillers', 'anime', 'climate_activism_films', 'indie_cinema'],
        sample_entities: ['Studio Ghibli', 'A24', 'Euphoria'],
        evidence_id: 'urn:tag:media:genre:cinematic_dark_73'
      }
    },
    demographics: { core_age: '16-30', privacy: '0-PII aggregate' }
  },

  // Rolex Profile
  'urn:entity:brand:rolex_11029': {
    entity: CACHED_ENTITIES['rolex'],
    affinities: {
      music: {
        domain: 'music',
        score: 0.40,
        top_tags: ['classical_symphony', 'opera', 'traditional_jazz', 'orchestral'],
        sample_entities: ['Yo-Yo Ma', 'Luciano Pavarotti'],
        evidence_id: 'urn:tag:music:classical_01'
      },
      fashion: {
        domain: 'fashion',
        score: 0.89,
        top_tags: ['bespoke_tailoring', 'savile_row', 'haute_horlogerie', 'monogrammed_silk'],
        sample_entities: ['Brioni', 'Kiton'],
        evidence_id: 'urn:tag:fashion:bespoke_02'
      },
      dining: {
        domain: 'dining',
        score: 0.94,
        top_tags: ['three_star_michelin', 'caviar_salons', 'private_members_clubs', 'truffle_tastings'],
        sample_entities: ["Annabel's", 'Le Bernardin'],
        evidence_id: 'urn:tag:dining:ultra_luxury_03'
      },
      beverage: {
        domain: 'beverage',
        score: 0.91,
        top_tags: ['vintage_champagne', 'bordeaux_grand_cru', 'rare_cognac'],
        sample_entities: ['Dom Pérignon', 'Château Margaux'],
        evidence_id: 'urn:tag:beverage:vintage_wine_04'
      },
      travel: {
        domain: 'travel',
        score: 0.96,
        top_tags: ['monaco_yacht_show', 'st_moritz_skiing', 'geneva_private_salons'],
        sample_entities: ['Hôtel de Paris Monte-Carlo', "Badrutt's Palace"],
        evidence_id: 'urn:tag:travel:super_prime_05'
      },
      tech: {
        domain: 'tech',
        score: 0.35,
        top_tags: ['mechanical_escapements', 'chronometer_certification'],
        sample_entities: ['Swiss Mechanical Watchmaking'],
        evidence_id: 'urn:tag:tech:horology_06'
      },
      media: {
        domain: 'media',
        score: 0.58,
        top_tags: ['equestrian_dressage', 'grand_slam_tennis', 'formula_one'],
        sample_entities: ['Wimbledon', 'The Masters Tournament'],
        evidence_id: 'urn:tag:media:prestigious_sports_07'
      }
    },
    demographics: { core_age: '38-65', privacy: '0-PII aggregate' }
  },

  // 100 gecs Profile
  'urn:entity:artist:100_gecs_12948': {
    entity: CACHED_ENTITIES['100_gecs'],
    affinities: {
      music: {
        domain: 'music',
        score: 0.99,
        top_tags: ['hyperpop', 'nightcore', 'skate_punk', 'chiptune_breakcore'],
        sample_entities: ['Charli xcx', 'Dorian Electra', 'SOPHIE'],
        evidence_id: 'urn:tag:music:hyperpop_11'
      },
      fashion: {
        domain: 'fashion',
        score: 0.18,
        top_tags: ['thrift_dumpster_chic', 'diy_crochet', 'wizard_cloaks', 'internet_irony'],
        sample_entities: ['Depop', 'Custom Wizard Robes'],
        evidence_id: 'urn:tag:fashion:diy_irony_12'
      },
      dining: {
        domain: 'dining',
        score: 0.15,
        top_tags: ['late_night_fast_food', 'energy_bars', 'cheap_pizza', 'convenience_snacks'],
        sample_entities: ['Taco Bell', 'Gas Station Hot Dogs'],
        evidence_id: 'urn:tag:dining:late_night_13'
      },
      beverage: {
        domain: 'beverage',
        score: 0.22,
        top_tags: ['energy_drinks', 'hard_seltzer', 'mountain_dew', 'boba_tea'],
        sample_entities: ['Monster Energy', 'White Claw'],
        evidence_id: 'urn:tag:beverage:energy_14'
      },
      travel: {
        domain: 'travel',
        score: 0.12,
        top_tags: ['minecraft_servers', 'basement_shows', 'lan_parties', 'virtual_rave'],
        sample_entities: ['Discord', 'Twitch'],
        evidence_id: 'urn:tag:travel:virtual_15'
      },
      tech: {
        domain: 'tech',
        score: 0.95,
        top_tags: ['ableton_live', 'vst_plugins', 'soundclown_production', 'retro_gaming'],
        sample_entities: ['Ableton Live', 'Nintendo 64'],
        evidence_id: 'urn:tag:tech:daw_production_16'
      },
      media: {
        domain: 'media',
        score: 0.86,
        top_tags: ['surreal_memes', 'speedruns', 'analog_horror', 'ironic_shitposts'],
        sample_entities: ['TikTok Brainrot', 'YouTube Poop'],
        evidence_id: 'urn:tag:media:surreal_internet_17'
      }
    },
    demographics: { core_age: '16-26', privacy: '0-PII aggregate' }
  }
}

/**
 * Deterministic fallback generator for ANY unknown entity name.
 * Generates mathematically consistent affinity profiles so the app never crashes.
 */
export function generateSyntheticProfile(name: string, type: 'brand' | 'artist'): AudienceProfile {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i)
    hash |= 0
  }
  const absHash = Math.abs(hash)

  const domains = ['music', 'fashion', 'dining', 'beverage', 'travel', 'tech', 'media']
  const affinities: Record<string, any> = {}

  domains.forEach((dom, idx) => {
    const rawVal = ((absHash >> (idx * 3)) & 0xff) / 255
    const score = Number((0.25 + rawVal * 0.70).toFixed(2))

    affinities[dom] = {
      domain: dom,
      score,
      top_tags: [`${name.toLowerCase().replace(/\s+/g, '_')}_${dom}`, `${dom}_affinity`],
      sample_entities: [`${name} Curated ${dom.toUpperCase()}`],
      evidence_id: `urn:tag:${dom}:${name.toLowerCase().replace(/\s+/g, '_')}_gen`
    }
  })

  return {
    entity: {
      id: `urn:entity:${type}:${name.toLowerCase().replace(/\s+/g, '_')}_gen`,
      name: name.trim(),
      type: `urn:entity:${type}`,
      popularity: 0.78,
      metadata: { generated: true }
    },
    affinities,
    demographics: { core_age: '21-38', privacy: '0-PII aggregate' }
  }
}
