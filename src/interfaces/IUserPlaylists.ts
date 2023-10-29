import { IImage, ILimit } from './types';

export interface IUserPlaylists {
  'href': string,
  'limit': ILimit,
  'next': string,
  'offset': number,
  'previous': string,
  'total': number,
  'items': IUserPlaylistsItems[]
}

export interface IUserPlaylistsItems {
  'collaborative': false,
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
    'followers': {
      'href': string,
      'total': 0
    },
    'href': string,
    'id': string,
    'type': 'user',
    'uri': string,
    'display_name': string
  },
  'public': false,
  'snapshot_id': string,
  'tracks': {
    'href': string,
    'total': 0
  },
  'type': string,
  'uri': string
}