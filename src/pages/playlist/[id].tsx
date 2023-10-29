import { IData } from '@/interfaces/types';
import { fetchUserPlaylistContent } from '@/utils/fetchs/spotify';
import { getItem } from '@/utils/localStorage';
import { validateTokenTime } from '@/utils/validToken';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import style from '@/styles/Artist.module.css';
import MusicCard from '@/components/MusicCard';
import { IPlaylist } from '@/interfaces/IPlaylist';
import Loading from '@/components/Loading';
import Image from 'next/image';

function Playlist() {
  const [playlist, setPlaylist] = useState<IPlaylist>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  async function getPlaylistTracks(playlistId: string) {
    setIsLoading(true);
    const DATAUSER = getItem('slowfy');

    const responsePlaylistTracks = await fetchUserPlaylistContent(
      DATAUSER.access,
      playlistId
    );

    if (responsePlaylistTracks) {
      setPlaylist(responsePlaylistTracks);
      setIsLoading(false);
    }

  }

  async function verifyToken(dataUser: IData) {
    const isValid = await validateTokenTime(dataUser);

    if (isValid) {
      getPlaylistTracks(router.query.id as string);
    }
  }

  useEffect(() => {
    const DATAUSER = getItem('slowfy');

    if (DATAUSER) {
      if (router.query.id) verifyToken(DATAUSER);
    } else {
      router.push('/');
    }
  }, [router.query]);

  return (
    <main className={style.main}>
      {
        isLoading ? <Loading /> : (
          <>
            <header className={style.header}>
              <div className={style['img-container']}>
                <Image
                  src={playlist?.images[0].url as string}
                  alt={playlist?.name as string}
                  width='240'
                  height='240'
                />
              </div>
              <div className={style.info}>
                <h2>
                  {playlist?.name}
                </h2>
              </div>
            </header>
            <section className={style.box}>
              {
                playlist && playlist
                  .tracks
                  .items
                  .map((item) => item.track)
                  .map((music, index) => (
                    <MusicCard
                      key={index}
                      music={music}
                      index={index}
                    />
                  ))
              }
            </section>
          </>
        )
      }

    </main>
  );
}

export default Playlist;