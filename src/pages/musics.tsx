import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '@/styles/Artists.module.css';
import musicsStyles from '@/styles/Musics.module.css';
import { IData, ILimit, IMusics, IPeriod } from '@/interfaces/types';
import NavBar from '@/components/NavBar';

import { getItem } from '@/utils/localStorage';
import { validateTokenTime } from '@/utils/validToken';
import { fetchTopMusics } from '@/utils/fetchs/spotify';
import Loading from '@/components/Loading';
import MusicCard from '@/components/MusicCard';

function Musics() {
  const [musics, setMusics] = useState<IMusics>();
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('short');

  const router = useRouter();

  async function getMusics(period: IPeriod) {
    setIsLoading(true);
    const DATAUSER = getItem('slowfy');

    const response = await fetchTopMusics(
      DATAUSER.access,
      period,
      ILimit.Fifity
    );

    if (response) {
      setMusics(response as IMusics);
      setIsLoading(false);
    }
  }

  async function verifyToken(dataUser: IData) {
    const isValid = await validateTokenTime(dataUser);

    if (isValid) {
      getMusics(IPeriod.Short);
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
          Principais músicas
        </h1>
        <div>
          <button
            type='button'
            className={period === 'short' ? styles['btn-hover'] : ''}
            onClick={() => {
              getMusics(IPeriod.Short);
              setPeriod('short');
            }}
          >
            Últimas 4 semanas
          </button>
          <button
            type='button'
            className={period === 'medium' ? styles['btn-hover'] : ''}
            onClick={() => {
              getMusics(IPeriod.Medium);
              setPeriod('medium');
            }}
          >
            Últimos 6 meses
          </button>
          <button
            type='button'
            className={period === 'long' ? styles['btn-hover'] : ''}
            onClick={() => {
              getMusics(IPeriod.Long);
              setPeriod('long');
            }}
          >
            Desde sempre
          </button>
        </div>
      </nav>

      <section className={musicsStyles.box}>
        {
          isLoading ? <Loading /> : (
            <div className={musicsStyles['container-musics']}>
              {
                musics && musics.items.length > 0 ? (
                  musics.items.map((music, index) => (
                    <MusicCard
                      key={music.id}
                      music={music}
                      index={index}
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

export default Musics;