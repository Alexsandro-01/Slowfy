import { ILimit, IMusic } from './types';

export interface IPlaylistItems {
  'href': string,
  'limit': ILimit,
  'next': string,
  'offset': number,
  'previous': string,
  'total': number,
  'items': [
    {
      'added_at': 'string',
      'added_by': {
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
        'uri': 'string'
      },
      'is_local': false,
      'track': IMusic,
    }
  ]
}