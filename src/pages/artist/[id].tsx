import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getItem } from '@/utils/localStorage';
import { IArtist, IData } from '@/interfaces/types';
import { validateTokenTime } from '@/utils/validToken';
// import { fetchArtist } from '@/utils/fetchs/spotify';
import { mockArtist } from '@/mocks/artists';
import Image from 'next/image';
import styles from '@/styles/Artist.module.css';

function Artist() {
  const [artist, setArtist] = useState<IArtist>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // console.log(artists);
  async function getArtist(artistId: string) {
    setIsLoading(true);
    const DATAUSER = getItem('slowfy');

    // const response = await fetchArtist(
    //   DATAUSER.access,
    //   artistId
    // );

    // if (response) {
    //   setArtists(response);
    //   setIsLoading(false);
    // }
    setArtist(mockArtist);
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
      verifyToken(DATAUSER);
    } else {
      router.push('/');
    }
  }, [router.query]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles['img-container']}>
          <Image
            src={artist?.images[0].url as string}
            alt={artist?.name as string}
            width='240'
            height='240'
          />
        </div>
        <div className={styles.info}>
          <h2>
            {
              artist?.name
            }
          </h2>
          <div>
            <p>
              {
                artist &&
                  artist?.genres.length > 0 ?
                  <span>Gêneros: </span> :
                  <span>Gênero: </span>
              }
              {
                artist?.genres.map((genre, index) => {
                  if (index !== 0) {
                    return `, ${genre}`;
                  }

                  return genre;
                })
              }
            </p>
            <p>
              <span>followers </span>
              {
                artist?.followers.total.toLocaleString()
              }
            </p>
          </div>
        </div>
      </header>
      <section className={styles.container}>

      </section>
    </main>
  );
}

export default Artist;
