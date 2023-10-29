import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getItem } from '@/utils/localStorage';
import { IArtist, IData, ITopTracksArtist } from '@/interfaces/types';
import { validateTokenTime } from '@/utils/validToken';
import { fetchArtist } from '@/utils/fetchs/spotify';
import Image from 'next/image';
import styles from '@/styles/Artist.module.css';
import { fetchArtistTopMusics } from '@/utils/fetchs/spotify';
import MusicCard from '@/components/MusicCard';
import NavBar from '@/components/NavBar';
import Loading from '@/components/Loading';

function Artist() {
  const [artist, setArtist] = useState<IArtist>();
  const [musics, setMusics] = useState<ITopTracksArtist>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  async function getArtist(artistId: string) {
    setIsLoading(true);
    const DATAUSER = getItem('slowfy');

    const responseArtist = await fetchArtist(
      DATAUSER.access,
      artistId
    );

    const responseMusics = await fetchArtistTopMusics(
      DATAUSER.access,
      artistId,
    );

    if (responseArtist) {
      setArtist(responseArtist);
      setIsLoading(false);
    }

    if (responseMusics) {
      setMusics(responseMusics);
    }
  }

  async function verifyToken(dataUser: IData) {
    const isValid = await validateTokenTime(dataUser);

    if (isValid) {
      getArtist(router.query.id as string);
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
    <main className={styles.main}>
      {
        isLoading ? <Loading /> : (
          <>
            <header className={styles.header}>
              <div className={styles['img-container']}>
                <Image
                  src={artist?.images[0].url as string}
                  alt={artist?.name as string}
                  width='240'
                  height='240' />
              </div>
              <div className={styles.info}>
                <h2>
                  {artist?.name}
                </h2>
                <div>
                  <p>
                    {artist &&
                      artist?.genres.length > 1 ?
                      <span>Gêneros: </span> :
                      <span>Gênero: </span>}
                    {artist?.genres.map((genre, index) => {
                      if (index !== 0) {
                        return `, ${genre}`;
                      }

                      return genre;
                    })}
                  </p>
                  <p>
                    <span>followers </span>
                    {artist?.followers.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </header>
            <section className={styles.container}>
              <h3>
                Músicas populare de
                {' '}
                {artist?.name}
              </h3>
              {musics && (
                musics.tracks.map((music, index) => (
                  <MusicCard
                    key={music.id}
                    index={index}
                    music={music} />
                ))
              )}
            </section><NavBar />
          </>
        )
      }
    </main>
  );
}

export default Artist;
