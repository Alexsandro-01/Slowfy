import { IArtist, IImage, ILimit } from './types';

export interface IPlaylist {
  'collaborative': false,
  'description': string
  'external_urls': {
    'spotify': string
  },
  'followers': {
    'href': string
    'total': number
  },
  'href': string,
  'id': 'string',
  'images': IImage[],
  'name': 'string',
  'owner': {
    'external_urls': {
      'spotify': 'string'
    },
    'followers': {
      'href': 'string',
      'total': 0
    },
    'href': 'string',
    'id': 'string',
    'type': 'user',
    'uri': string,
    'display_name': string
  },
  'public': false,
  'snapshot_id': string,
  'tracks': ITracks,
  'type': string,
  'uri': string
}

export interface ITracks {
  'href': string,
  'limit': ILimit,
  'next': string,
  'offset': number,
  'previous': string,
  'total': number,
  'items': ITracksItems[]
}

export interface ITracksItems {
  'added_at': string,
  'added_by': {
    'external_urls': {
      'spotify': string
    },
    'followers': {
      'href': string,
      'total': number
    },
    'href': string,
    'id': string,
    'type': string,
    'uri': string
  },
  'is_local': false,
  'track': ITrack
}

export interface ITrack {
  'album': {
    'album_type': string,
    'total_tracks': number,
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
    'restrictions': {
      'reason': string
    },
    'type': string,
    'uri': string,
    'artists': [
      {
        'external_urls': {
          'spotify': string
        },
        'href': string,
        'id': string,
        'name': string,
        'type': string,
        'uri': string
      }
    ]
  },
  'artists': IArtist[],
  'available_markets': string[],
  'disc_number': number,
  'duration_ms': number,
  'explicit': false,
  'external_ids': {
    'isrc': string,
    'ean': string,
    'upc': string
  },
  'external_urls': {
    'spotify': string
  },
  'href': string,
  'id': string,
  'is_playable': false,
  'restrictions': {
    'reason': string
  },
  'name': string,
  'popularity': number,
  'preview_url': string,
  'track_number': number,
  'type': string,
  'uri': string,
  'is_local': false
}