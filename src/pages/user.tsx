import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';

import { 
  IArtists,
  IData,
  IMusics,
  IPlaylists,
  IRecentMusics,
  ITopItems,
  ITopItemsPeriod,
  IUserProfile 
} from '@/interfaces/types';

import styles from '@/styles/User.module.css';

import {
  fetchUserPlaylists,
  fetchRefreshToken,
  fetchProfile,
  fetchTopItems,
  fetchRecentMusicPlayed
} from '@/utils/fetchs/spotify';
import { getItem, saveItem } from '@/utils/localStorage';

import ArtistCard from '@/components/ArtistCard';
import MusicCard from '@/components/MusicCard';
import PlaylistCard from '@/components/PlaylistCard';
import NavBar from '@/components/NavBar';

function publicPlaylsits(userPlaylists: IPlaylists) {
  const result = userPlaylists.items.filter((playlist) => {
    if (playlist.public) return playlist;
  })

  return result;
}

function User() {
  const [profile, setprofile] = useState<IUserProfile>()
  const [playlists, setPlaylists] = useState<IPlaylists>();
  const [artists, setArtists] = useState<IArtists>();
  const [musics, setMusics] = useState<IMusics>();
  const [recentPlayed, setRecentPlayed] = useState<IRecentMusics>();


  const ROUTER = useRouter();
  let refreshTokenUrl = process.env.REFRESH_TOKEN_IRL;

  if (process.env.NODE_ENV !== 'production') {
    refreshTokenUrl = 'http://localhost:3000/api/refresh-token'
  }

  async function getUser() {
    const DATAUSER = getItem('slowfy');

    const user = await fetchProfile(DATAUSER.access);

    if (user) {
      const playlistsResponse = await fetchUserPlaylists(DATAUSER.access);
      const artistsResponse = await fetchTopItems(DATAUSER.access, ITopItems.Artists, ITopItemsPeriod.Short);
      const musicsResponse = await fetchTopItems(DATAUSER.access, ITopItems.Tracks, ITopItemsPeriod.Short);
      const recentPlayedResponse = await fetchRecentMusicPlayed(DATAUSER.access, 4);

      setprofile(user)
      setRecentPlayed(recentPlayedResponse)
      setArtists(artistsResponse as IArtists);
      setPlaylists(playlistsResponse);
      setMusics(musicsResponse as IMusics)
    }
  }

  function saveToken(token: string, refreshToken: string) {
    const DATAUSER = getItem('slowfy');

    if (!DATAUSER) {
      const data = {
        access: token,
        refresh: refreshToken,
        date: new Date()
      }

      saveItem('slowfy', data);
    }

    getUser();
  }

  function updateLocalToken(refreshedToken: string) {
    const DATAUSER = getItem('slowfy');
    DATAUSER.access = refreshedToken;
    DATAUSER.date = new Date();

    saveItem('slowfy', DATAUSER);
    getUser();
  }

  async function validateTokenTime(dataUser: IData) {
    const timeGap = new Date().getTime() - new Date(dataUser.date).getTime();
    const requiredTimeGap = 3600 * 1000;

    if (timeGap >= requiredTimeGap) {
      const newToken = await fetchRefreshToken(dataUser.refresh, refreshTokenUrl as string);

      updateLocalToken(newToken.access_token);
    } else {
      getUser();
    }
  }

  useEffect(() => {
    const DATAUSER = getItem('slowfy');

    if (ROUTER.query.access) {
      saveToken(
        ROUTER.query.access as string,
        ROUTER.query.refresh as string
      );
    }

    if (DATAUSER) {
      validateTokenTime(DATAUSER);
    } else {
      ROUTER.push('/');
    }
  }, [ROUTER.query])

  return (
    <main>
      <section className={styles.header}>
        <div className={styles.thumb}>
          <Image
            src={profile?.images[0].url as string}
            alt={`Imagem de perfil de ${profile?.display_name}`}
            width="300"
            height="300"
          />
        </div>

        <div className={styles.info}>
          <h1>
            {
              profile?.display_name
            }
          </h1>
          <p>
            <span>
              Playlists:
            </span>
            {` ${playlists?.total}`}
          </p>
        </div>
      </section>

      <section className={styles.container}>
        <div className={styles.content}>
          <h3>
            <a href="">
              Artistas mais tocados este mês
            </a>
          </h3>
          <div className={styles['cards-container']}>
            {
              artists && (
                artists.items.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))
              )
            }
          </div>
        </div>

        <div className={styles.content}>
          <h3>
            <a href="">
              Músicas mais tocadas este mês
            </a>
          </h3>
          <div className={styles['music-cards-container']}>
            {
              musics && (
                musics.items.map((music, index) => (
                  <MusicCard
                    key={music.id}
                    music={music}
                    index={index}
                  />
                )).slice(0, 4)
              )
            }
          </div>
        </div>

        <div className={styles.content}>
          <h3>
            <a href="">
              Playlists públicas
            </a>
          </h3>
          <div className={styles['cards-container']}>
            {
              playlists && (
                publicPlaylsits(playlists).map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                  />
                ))
              )
            }
          </div>
        </div>

        <div className={styles.content}>
          <h3>
            <a href="">
              Músicas tocadas recentemente
            </a>
          </h3>
          <div className={styles['music-cards-container']}>
            {
              recentPlayed && (
                recentPlayed.items.map((music, index) => (
                  <MusicCard
                    key={music.track.id}
                    music={music.track}
                    index={index}
                  />
                ))
              )
            }
          </div>
        </div>
      </section>

      <NavBar />
    </main>
  )
}

export default User