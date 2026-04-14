// Shape of a REST Countries API result (the fields we use)
export interface Country {
  name: { common: string; official: string };
  cca3: string;
  flags: { svg: string; png: string; alt?: string };
  region: string;
  subregion?: string;
  capital?: string[];
  population: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  continents?: string[];
  maps?: { googleMaps: string };
  timezones?: string[];
  latlng?: number[];
}

// Shape of a row in the Supabase "destinations" table
export interface Destination {
  id: number;
  user_id: string;
  country_code: string;
  country_name: string;
  flag_url: string | null;
  region: string | null;
  capital: string | null;
  population: number | null;
  notes: string;
  visited: boolean;
  created_at: string;
}
