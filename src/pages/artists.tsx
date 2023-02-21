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

  const router = useRouter();

  async function getArtists(dataUser: IData) {
    const response = await fetchTopArtists(
      dataUser.access,
      IPeriod.Short,
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
      getArtists(dataUser);
    }
  }

  useEffect(() => {
    const DATAUSER = getItem('slowfy');

    if (DATAUSER) {
      verifyToken(DATAUSER);
    } else {
      router.push('/');
    }
  });
  return (
    <main className={styles.main}>
      {
        isLoading ? <Loading /> : (
          <>
            <nav className={styles.nav}>
              <h2>
                Principais artistas
              </h2>
              <div>
                <p>últimas 4 semanas</p>
                <p>Últimos 6 meses</p>
                <p>Desde sempre</p>
              </div>
            </nav>

            <section className={styles.container}>
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
            </section>

            <NavBar />
          </>
        )
      }

    </main>
  );
}

export default Artists;