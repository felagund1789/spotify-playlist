export interface Copyright {
  text: string;
  type: string;
}

export interface ExternalUrls {
  spotify: string
}

export interface ExternalIds { 
  isrc?: string;
  ean?: string;
  upc?: string; 
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Person {
  name: string;
}

export interface Restrictions {
  reason: "string";
}

export interface ResumePoint { 
fully_played: boolean; 
  resume_position_ms: number;
}

export interface Total {
  href: string;
  total: number;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: unknown;
  type: "album";
  uri: string;
  artists: Artist[];
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
  followers?: Total;
  genres?: string[];
  images?: Image[];
  popularity?: number;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: unknown;
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: {
    external_urls: ExternalUrls;
    followers: Total;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: Total;
  type: "playlist";
  uri: string;
}

export interface Show {
  available_markets: string[];
  copyrights?: Copyright[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: "show";
  uri: string;
  total_episodes: number;
}

export interface Episode {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point: ResumePoint;
  type: "episode";
  uri: string;
  restrictions: Restrictions;
}

export interface AudioBook {
  authors: Person[];
  available_markets: string[];
  copyrights?: Copyright[];
  description: string;
  html_description: string;
  edition: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: Person[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
}

export interface SpotifyResponse<T> {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: T[];
}

export interface SearchResponse {
  tracks?: SpotifyResponse<Track>;
  artists?: SpotifyResponse<Artist>;
  albums?: SpotifyResponse<Album>;
  playlists?: SpotifyResponse<Playlist>;
  shows?: SpotifyResponse<Show>;
  episodes?: SpotifyResponse<Episode>;
  audiobooks?: SpotifyResponse<AudioBook>;
}
