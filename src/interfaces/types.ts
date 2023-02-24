export interface IData {
  access: string,
  refresh: string,
  date: Date,
}

export enum ILimit {
  Four = 4,
  Ten = 10,
  Twenty = 20,
  Fifity = 50
}

export enum IPeriod {
  Short = 'short_term',
  Medium = 'medium_term',
  Long = 'long_term'
}

export interface IRefreshedToken {
  'access_token': string
}

export interface IUserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean,
    filter_locked: boolean
  },
  external_urls: { spotify: string; };
  followers: { href: string | null; total: number; };
  href: string | null;
  id: string;
  images: IImage[];
  product: string;
  type: string;
  uri: string;
}

export interface IImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface IPlaylists {
  'href': string,
  'limit': number | null,
  'next': string | null,
  'offset': number | null,
  'previous': string | null,
  'total': number | null,
  'items': IPlaylist[]
}

export interface IPlaylist {
  'collaborative': boolean,
  'description': string,
  'external_urls': {
    'spotify': string
  },
  'href': string,
  'id': string,
  'images': IImage[],
  'name': string,
  'owner': {
    'external_urls': {
      'spotify': string
    },
    'href': string,
    'id': string,
    'type': string,
    'uri': string,
    'display_name': string
  },
  'public': boolean,
  'snapshot_id': string,
  'tracks': {
    'href': string,
    'total': number | null
  },
  'type': string,
  'uri': string
}

export interface IArtists {
  'items': IArtist[],
  'total': number,
  'limit': number,
  'offset': number,
  'href': string,
  'next': number | null,
  'previous': number | null
}

export interface IArtist {
  'external_urls': {
    'spotify': string
  },
  'followers': {
    'href': string | null,
    'total': number
  },
  'genres': string[],
  'href': string,
  'id': string,
  'images': IImage[],
  'name': string,
  'popularity': number,
  'type': string,
  'uri': string
}

export interface IMusics {
  'items': IMusic[],
  'total': number,
  'limit': number,
  'offset': number,
  'href': string,
  'next': string,
  'previous': null
}

interface IMusicArtist {
  'external_urls': {
    'spotify': string
  },
  'href': string,
  'id': string,
  'name': string,
  'type': string,
  'uri': string
}

export interface IAlbum {
  'album_type': string,
  'artists': IMusicArtist[],
  'available_markets': string[],
  'external_urls': {
    'spotify': string
  },
  'href': string,
  'id': string,
  'images': IImage[],
  'name': string,
  'release_date': string,
  'release_date_precision': string,
  'total_tracks': number,
  'type': string,
  'uri': string
}

export interface IMusic {
  'album': IAlbum,
  'artists': IMusicArtist[],
  'available_markets': string[],
  'disc_number': number,
  'duration_ms': number,
  'explicit': boolean,
  'external_ids': {
    'isrc': string
  },
  'external_urls': {
    'spotify': string
  },
  'href': string,
  'id': string,
  'is_local': boolean,
  'name': string,
  'popularity': number,
  'preview_url': string,
  'track_number': number,
  'type': string,
  'uri': string
}

export interface ITracks {
  'track': IMusic,
  'played_at': string,
  'context': {
    'type': string,
    'external_urls': {
      'spotify': string
    },
    'href': string,
    'uri': string
  }
}

export interface IRecentMusics {
  'items': ITracks[],
  'next': string,
  'cursors': {
    'after': string,
    'before': string
  },
  'limit': number,
  'href': string
}

export interface ITopTracksArtist {
  'tracks': IMusic[]
}