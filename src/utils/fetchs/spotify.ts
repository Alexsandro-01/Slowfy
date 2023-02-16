import { IArtists, IMusic, IMusics, IPlaylists, IRecentMusics, IRefreshedToken, ITopItems, ITopItemsPeriod, IUserProfile } from "@/interfaces/types";


export async function fetchProfile(code: string): Promise<IUserProfile> {

  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${code}` }
  });

  return await result.json();
}

export async function fetchUserPlaylists(code: string): Promise<IPlaylists> {

  const result = await fetch(`https://api.spotify.com/v1/me/playlists`, {
      method: "GET", headers: { Authorization: `Bearer ${code}` }
  });

  return await result.json();
}

export async function fetchTopItems(code: string, item: ITopItems, period: ITopItemsPeriod): Promise<IArtists | IMusics> {
    const result = await fetch(`https://api.spotify.com/v1/me/top/${item}?limit=10&time_range=${period}`, {
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

  const data = await response.json()
  return data;
}