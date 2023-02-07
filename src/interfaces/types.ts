export interface data {
  access: string,
  refresh: string,
  date: Date,
}

export interface UserProfile {
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
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface playlists {
  "href": string,
  "limit": number | null,
  "next": string,
  "offset": number | null,
  "previous": string,
  "total": number | null,
  "items": playlist[]
}

export interface playlist {
  "collaborative": boolean,
  "description": string,
  "external_urls": {
    "spotify": string
  },
  "href": string,
  "id": string,
  "images": [
    {
      "url": string,
      "height": number | null,
      "width": number | null
    }
  ],
  "name": string,
  "owner": {
    "external_urls": {
      "spotify": string
    },
    "followers": {
      "href": string,
      "total": number | null
    },
    "href": string,
    "id": string,
    "type": string,
    "uri": string,
    "display_name": string
  },
  "public": true,
  "snapshot_id": string,
  "tracks": {
    "href": string,
    "total": number | null
  },
  "type": string,
  "uri": string
}
