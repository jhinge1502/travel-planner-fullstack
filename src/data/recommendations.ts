// Popular city + activity recommendations per country
// Key is cca3 country code

export interface Recommendation {
  city: string;
  activity: string;
}

const recommendations: Record<string, Recommendation> = {
  // Asia
  JPN: { city: "Tokyo", activity: "Explore Shibuya Crossing and the Meiji Shrine" },
  THA: { city: "Bangkok", activity: "Visit the Grand Palace and try street food at Chatuchak Market" },
  IND: { city: "Jaipur", activity: "Tour the Amber Fort and explore the Pink City bazaars" },
  IDN: { city: "Bali (Ubud)", activity: "Walk the Tegallalang Rice Terraces and visit a temple" },
  VNM: { city: "Hanoi", activity: "Cruise Ha Long Bay and taste pho in the Old Quarter" },
  KOR: { city: "Seoul", activity: "Explore Gyeongbokgung Palace and shop in Myeongdong" },
  CHN: { city: "Beijing", activity: "Walk the Great Wall at Mutianyu and visit the Forbidden City" },
  SGP: { city: "Singapore", activity: "Stroll Gardens by the Bay and eat at a hawker center" },
  MYS: { city: "Kuala Lumpur", activity: "Visit the Petronas Towers and explore Batu Caves" },
  PHL: { city: "El Nido", activity: "Island-hop through the Bacuit Archipelago lagoons" },
  LKA: { city: "Ella", activity: "Hike Little Adam's Peak and ride the scenic train to Kandy" },
  NPL: { city: "Kathmandu", activity: "Visit Boudhanath Stupa and trek to Everest Base Camp" },
  MMR: { city: "Bagan", activity: "Watch sunrise over thousands of ancient temples by hot air balloon" },
  KHM: { city: "Siem Reap", activity: "Explore Angkor Wat at sunrise" },
  TUR: { city: "Istanbul", activity: "Visit Hagia Sophia and cruise the Bosphorus" },
  ISR: { city: "Jerusalem", activity: "Walk the Old City and visit the Western Wall" },
  JOR: { city: "Petra", activity: "Hike through the Siq to the Treasury at sunrise" },
  ARE: { city: "Dubai", activity: "Visit the Burj Khalifa observation deck and explore the souks" },
  GEO: { city: "Tbilisi", activity: "Wander the Old Town and soak in the sulfur baths" },

  // Europe
  FRA: { city: "Paris", activity: "Visit the Louvre and stroll along the Seine at sunset" },
  ITA: { city: "Rome", activity: "Tour the Colosseum and toss a coin in the Trevi Fountain" },
  ESP: { city: "Barcelona", activity: "Explore Gaudí's Sagrada Família and walk La Rambla" },
  GBR: { city: "London", activity: "Visit the British Museum and take a walk through Hyde Park" },
  DEU: { city: "Berlin", activity: "Tour the Brandenburg Gate and explore Museum Island" },
  GRC: { city: "Santorini", activity: "Watch the sunset in Oia and swim at Red Beach" },
  PRT: { city: "Lisbon", activity: "Ride Tram 28 through Alfama and eat pastéis de nata in Belém" },
  NLD: { city: "Amsterdam", activity: "Cruise the canals and visit the Van Gogh Museum" },
  CZE: { city: "Prague", activity: "Walk across Charles Bridge and explore the Old Town Square" },
  AUT: { city: "Vienna", activity: "Tour Schönbrunn Palace and enjoy a Sachertorte at a café" },
  HRV: { city: "Dubrovnik", activity: "Walk the city walls and kayak around the Old Town" },
  CHE: { city: "Lucerne", activity: "Take a boat on Lake Lucerne and ride up Mount Pilatus" },
  ISL: { city: "Reykjavík", activity: "Drive the Golden Circle and soak in the Blue Lagoon" },
  NOR: { city: "Bergen", activity: "Ride the Flåm Railway and cruise the fjords" },
  SWE: { city: "Stockholm", activity: "Explore Gamla Stan and visit the Vasa Museum" },
  DNK: { city: "Copenhagen", activity: "Visit Tivoli Gardens and bike along the harbor" },
  IRL: { city: "Dublin", activity: "Tour the Cliffs of Moher and visit Trinity College Library" },
  POL: { city: "Kraków", activity: "Explore Wawel Castle and walk through the Main Square" },
  HUN: { city: "Budapest", activity: "Soak in Széchenyi Baths and walk across the Chain Bridge" },
  ROU: { city: "Brașov", activity: "Visit Bran Castle and hike in the Carpathian Mountains" },
  BGR: { city: "Sofia", activity: "Explore Alexander Nevsky Cathedral and hike Vitosha Mountain" },
  FIN: { city: "Rovaniemi", activity: "Visit Santa Claus Village and chase the Northern Lights" },
  BEL: { city: "Bruges", activity: "Cruise the canals and taste Belgian chocolate and waffles" },
  SCO: { city: "Edinburgh", activity: "Climb Arthur's Seat and tour Edinburgh Castle" },
  MNE: { city: "Kotor", activity: "Hike the fortress walls and cruise the Bay of Kotor" },

  // Americas
  USA: { city: "New York City", activity: "Walk through Central Park and see Times Square at night" },
  CAN: { city: "Banff", activity: "Hike to Lake Louise and soak in hot springs" },
  MEX: { city: "Mexico City", activity: "Explore Teotihuacán pyramids and eat tacos at a street market" },
  BRA: { city: "Rio de Janeiro", activity: "Visit Christ the Redeemer and relax on Copacabana Beach" },
  ARG: { city: "Buenos Aires", activity: "Watch a tango show in San Telmo and eat steak at a parrilla" },
  PER: { city: "Cusco", activity: "Hike the Inca Trail to Machu Picchu" },
  COL: { city: "Cartagena", activity: "Walk the colorful Old Walled City and try street arepas" },
  CHL: { city: "Santiago", activity: "Ride the funicular up San Cristóbal Hill and visit a vineyard" },
  CRI: { city: "Arenal", activity: "Hike near Arenal Volcano and zip-line through cloud forests" },
  CUB: { city: "Havana", activity: "Ride a classic car along the Malecón and explore Old Havana" },
  ECU: { city: "Quito", activity: "Visit the equator line and explore the historic Old Town" },
  JAM: { city: "Montego Bay", activity: "Snorkel at Doctor's Cave Beach and taste jerk chicken" },
  PAN: { city: "Panama City", activity: "Visit the Panama Canal locks and explore Casco Viejo" },
  DOM: { city: "Santo Domingo", activity: "Walk the Zona Colonial and relax on Punta Cana beaches" },
  BOL: { city: "Uyuni", activity: "Tour the Salar de Uyuni salt flats at sunrise" },
  URY: { city: "Montevideo", activity: "Stroll the Rambla waterfront and visit Mercado del Puerto" },

  // Africa
  ZAF: { city: "Cape Town", activity: "Hike Table Mountain and visit the Cape of Good Hope" },
  MAR: { city: "Marrakech", activity: "Explore the souks and visit the Jardin Majorelle" },
  EGY: { city: "Cairo", activity: "See the Pyramids of Giza and cruise the Nile" },
  KEN: { city: "Nairobi", activity: "Go on a safari in the Maasai Mara" },
  TZA: { city: "Zanzibar", activity: "Relax on white-sand beaches and explore Stone Town" },
  ETH: { city: "Lalibela", activity: "Visit the rock-hewn churches carved from solid stone" },
  GHA: { city: "Accra", activity: "Visit Cape Coast Castle and try jollof rice at a local spot" },
  RWA: { city: "Volcanoes National Park", activity: "Trek to see mountain gorillas in their natural habitat" },
  NAM: { city: "Sossusvlei", activity: "Climb the red dunes of the Namib Desert at sunrise" },
  MUS: { city: "Port Louis", activity: "Snorkel in crystal lagoons and hike Le Morne Brabant" },
  MDG: { city: "Antananarivo", activity: "Explore the Avenue of the Baobabs and spot lemurs" },
  SEN: { city: "Dakar", activity: "Visit Gorée Island and surf at N'Gor Beach" },

  // Oceania
  AUS: { city: "Sydney", activity: "Walk across the Harbour Bridge and see the Opera House" },
  NZL: { city: "Queenstown", activity: "Bungee jump at Kawarau Bridge and cruise Milford Sound" },
  FJI: { city: "Nadi", activity: "Island-hop to the Mamanuca Islands and snorkel coral reefs" },
};

export function getRecommendation(countryCode: string, capital?: string): Recommendation {
  if (recommendations[countryCode]) {
    return recommendations[countryCode];
  }
  // Fallback: use the capital city with a generic activity
  const city = capital || "the capital";
  return {
    city,
    activity: `Explore the local markets and historic landmarks in ${city}`,
  };
}
