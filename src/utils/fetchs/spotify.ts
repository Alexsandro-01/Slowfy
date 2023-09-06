import {
  IArtists,
  IArtist,
  ILimit,
  IMusics,
  IPlaylists,
  IRecentMusics,
  IRefreshedToken,
  IPeriod,
  IUserProfile,
  ITopTracksArtist,
  IPlaylist
} from '@/interfaces/types';


export async function fetchProfile(code: string): Promise<IUserProfile> {

  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET', headers: { Authorization: `Bearer ${code}` }
  });

  return await result.json();
}

export async function fetchUserPlaylists(code: string, limit: ILimit): Promise<IPlaylist[]> {

  let url: string | null = `https://api.spotify.com/v1/me/playlists?limit=${limit}`;
  const response: IPlaylist[] = [];

  while (url) {
    const result = await fetch(url, {
      method: 'GET', headers: { Authorization: `Bearer ${code}` }
    });

    const data: IPlaylists = await result.json();

    response.push(...data.items);
    url = data.next;
  }


  return response;
}

export async function fetchTopMusics(code: string, period: IPeriod, limit: ILimit): Promise<IMusics> {
  const result = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${period}`, {
    headers: {
      Authorization: `Bearer ${code}`,
      'Content-Type': 'application/json'
    }
  });

  return await result.json();
}

export async function fetchTopArtists(code: string, period: IPeriod, limit: number): Promise<IArtists> {
  const result = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${period}`, {
    headers: {
      Authorization: `Bearer ${code}`,
      'Content-Type': 'application/json'
    }
  });

  return await result.json();
}

export async function fetchArtist(code: string, artistId: string): Promise<IArtist> {
  const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${code}`,
      'Content-Type': 'application/json'
    }
  });

  return await result.json();
}

export async function fetchArtistTopMusics(
  code: string,
  artistId: string,
): Promise<ITopTracksArtist> {
  const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=BR`, {
    headers: {
      Authorization: `Bearer ${code}`,
      'Content-Type': 'application/json'
    }
  });

  return await result.json();
}



export async function fetchRecentMusicPlayed(code: string, limit: number): Promise<IRecentMusics> {
  const result = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${code}`,
      'Content-Type': 'application/json'
    }
  });

  return await result.json();
}

export async function fetchRefreshToken(refreshToken: string, refreshTokenUrl: string): Promise<IRefreshedToken> {
  const response = await fetch(refreshTokenUrl as string, {
    method: 'POST',
    body: JSON.stringify({
      'refresh_token': refreshToken,
    })
  });

  const data = await response.json();
  return data;
}