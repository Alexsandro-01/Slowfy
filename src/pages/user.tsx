import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import {
  IArtists,
  IData,
  IMusics,
  IRecentMusics,
  IPeriod,
  IUserProfile,
  ILimit,
  IPlaylist
} from '@/interfaces/types';

import styles from '@/styles/User.module.css';

import {
  fetchUserPlaylists,
  fetchProfile,
  fetchTopArtists,
  fetchTopMusics,
  fetchRecentMusicPlayed
} from '@/utils/fetchs/spotify';
import { getItem, saveItem } from '@/utils/localStorage';

import ArtistCard from '@/components/ArtistCard';
import MusicCard from '@/components/MusicCard';
import PlaylistCard from '@/components/PlaylistCard';
import NavBar from '@/components/NavBar';
import Loading from '@/components/Loading';
import { validateTokenTime } from '@/utils/validToken';

function publicPlaylsits(userPlaylists: IPlaylist[]) {
  const result = userPlaylists.filter((playlist) => {
    if (playlist.public) return playlist;
  });

  return result;
}

function User() {
  const [profile, setprofile] = useState<IUserProfile>();
  const [playlists, setPlaylists] = useState<IPlaylist[]>();
  const [artists, setArtists] = useState<IArtists>();
  const [musics, setMusics] = useState<IMusics>();
  const [recentPlayed, setRecentPlayed] = useState<IRecentMusics>();
  const [isLoading, setIsLoading] = useState(true);


  const ROUTER = useRouter();

  async function getUser() {
    const DATAUSER = getItem('slowfy');

    const user = await fetchProfile(DATAUSER.access);

    if (user) {
      const playlistsResponse = await fetchUserPlaylists(DATAUSER.access, ILimit.Fifity);

      const artistsResponse = await fetchTopArtists(
        DATAUSER.access,
        IPeriod.Short,
        ILimit.Ten,
      );

      const musicsResponse = await fetchTopMusics(
        DATAUSER.access,
        IPeriod.Short,
        ILimit.Ten
      );

      const recentPlayedResponse = await fetchRecentMusicPlayed(DATAUSER.access, 4);

      setprofile(user);
      setRecentPlayed(recentPlayedResponse);
      setArtists(artistsResponse as IArtists);
      setPlaylists(playlistsResponse);
      setMusics(musicsResponse as IMusics);
      setIsLoading(false);
    }
  }

  function saveToken(token: string, refreshToken: string) {
    const DATAUSER = getItem('slowfy');

    if (!DATAUSER) {
      const data = {
        access: token,
        refresh: refreshToken,
        date: new Date()
      };

      saveItem('slowfy', data);
    }

    getUser();
  }

  async function verifyToken(dataUser: IData) {
    const isValid = await validateTokenTime(dataUser);

    if (isValid) {
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
      verifyToken(DATAUSER);
    } else {
      ROUTER.push('/');
    }
  }, [ROUTER.query]);

  return (
    <main className={styles.main}>
      {
        isLoading ? <Loading /> : (
          <>
            <section className={styles.header}>
              <div className={styles.thumb}>
                <Image
                  src={profile?.images[1].url as string}
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
                  {
                    playlists && `${publicPlaylsits(playlists).length} ⋅ `
                  }
                  <span>
                    Playlists
                  </span>
                </p>
              </div>
            </section>

            <section className={styles.container}>
              <div className={styles.content}>
                <h3>
                  <a href="/artists">
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
                          key={music.track.id + index}
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
          </>
        )
      }
    </main>
  );
}

export default User;