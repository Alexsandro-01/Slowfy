import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '@/styles/Artists.module.css';
import musicsStyles from '@/styles/Musics.module.css';

import NavBar from '@/components/NavBar';
import { getItem } from '@/utils/localStorage';
import { IData, ILimit, IRecentMusics } from '@/interfaces/types';
import { validateTokenTime } from '@/utils/validToken';
import { fetchRecentMusicPlayed } from '@/utils/fetchs/spotify';
import Loading from '@/components/Loading';
import MusicCard from '@/components/MusicCard';

function Recent() {
  const [musics, setMusics] = useState<IRecentMusics>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  async function getMusics() {
    setIsLoading(true);
    const DATAUSER = getItem('slowfy');

    const response = await fetchRecentMusicPlayed(
      DATAUSER.access,
      ILimit.Fifity
    );

    if (response) {
      setMusics(response as IRecentMusics);
      setIsLoading(false);
    }
  }

  async function verifyToken(dataUser: IData) {
    const isValid = await validateTokenTime(dataUser);

    if (isValid) {
      getMusics();
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
          Músicas tocadas recentemente
        </h1>
      </nav>

      <section className={musicsStyles.box}>
        {
          isLoading ? <Loading /> : (
            <div className={musicsStyles['container-musics']}>
              {
                musics && musics.items.length > 0 ? (
                  musics.items.map((music, index) => (
                    <MusicCard
                      key={music.track.id + index}
                      music={music.track}
                      index={index}
                    />
                  ))
                ) : (
                  <p>Sem Músicas recentes</p>
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

export default Recent;