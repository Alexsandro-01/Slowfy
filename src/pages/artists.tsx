import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import NavBar from '@/components/NavBar';
import styles from '@/styles/Artists.module.css';

import { fetchTopArtists } from '@/utils/fetchs/spotify';
import { IArtists, IData, ILimit, IPeriod } from '@/interfaces/types';
import Loading from '@/components/Loading';
import { getItem } from '@/utils/localStorage';
import ArtistCard from '@/components/ArtistCard';
import { validateTokenTime } from '@/utils/validToken';

function Artists() {
  const [artists, setArtists] = useState<IArtists>();
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('short');

  const router = useRouter();

  async function getArtists(period: IPeriod) {
    setIsLoading(true);
    const DATAUSER = getItem('slowfy');

    const response = await fetchTopArtists(
      DATAUSER.access,
      period,
      ILimit.Fifity
    );

    if (response) {
      setArtists(response as IArtists);
      setIsLoading(false);
    }
  }

  async function verifyToken(dataUser: IData) {
    const isValid = await validateTokenTime(dataUser);

    if (isValid) {
      getArtists(IPeriod.Short);
    }
  }

  useEffect(() => {
    const DATAUSER = getItem('slowfy');

    if (DATAUSER) {
      verifyToken(DATAUSER);
    } else {
      router.push('/');
    }
  }, []);

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <h1>
          Principais artistas
        </h1>
        <div>
          <button
            type='button'
            className={period === 'short' ? styles['btn-hover'] : ''}
            onClick={() => {
              getArtists(IPeriod.Short);
              setPeriod('short');
            }}
          >
            Últimas 4 semanas
          </button>
          <button
            type='button'
            className={period === 'medium' ? styles['btn-hover'] : ''}
            onClick={() => {
              getArtists(IPeriod.Medium);
              setPeriod('medium');
            }}
          >
            Últimos 6 meses
          </button>
          <button
            type='button'
            className={period === 'long' ? styles['btn-hover'] : ''}
            onClick={() => {
              getArtists(IPeriod.Long);
              setPeriod('long');
            }}
          >
            Desde sempre
          </button>
        </div>
      </nav>
      <section className={styles.box}>
        {
          isLoading ? <Loading /> : (
            <div className={styles.container}>
              {
                artists && artists.items.length > 0 ? (
                  artists.items.map((artist) => (
                    <ArtistCard
                      key={artist.id}
                      artist={artist}
                    />
                  ))
                ) : (
                  <p>Sem artistas</p>
                )
              }
            </div>
          )
        }
      </section>

      <NavBar />
    </main>
  );
}

export default Artists;