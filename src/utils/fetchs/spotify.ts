import { UserProfile } from "@/interfaces/types";

export async function fetchProfile(code: string): Promise<UserProfile> {

  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${code}` }
  });

  return await result.json();
}

/** Any temporário */
export async function fetchUserPlaylists(code: string, profileId: string): Promise<any> {

  const result = await fetch(`https://api.spotify.com/v1/users/${profileId}/playlists`, {
      method: "GET", headers: { Authorization: `Bearer ${code}` }
  });

  return await result.json();
}

/** Any temporário */
export async function fetchRefreshToken(refreshToken: string, refreshTokenUrl: string) {
  const response = await fetch(refreshTokenUrl as string, {
    method: 'POST',
    body: JSON.stringify({
      'refresh_token': refreshToken,
    })
  });

  const data = await response.json()
  return data;
}