import React, { useEffect, useState } from 'react';

import Loading from '@/components/Loading';
import PlaylistCard from '@/components/PlaylistCard';
import { IData, ILimit, IPlaylist } from '@/interfaces/types';
import style from '@/styles/Artists.module.css';
import { fetchUserPlaylists } from '@/utils/fetchs/spotify';
import { getItem } from '@/utils/localStorage';
import { validateTokenTime } from '@/utils/validToken';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';

function Playlists() {
  const [playlists, setPlaylists] = useState<IPlaylist[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [showAllplaylists, setShowAllPlaylists] = useState(true);

  const router = useRouter();

  async function getPlaylists() {
    const DATAUSER = getItem('slowfy');

    const response = await fetchUserPlaylists(DATAUSER.access, ILimit.Fifity);

    if (response) {
      setPlaylists(response);
      setIsLoading(false);
    }
  }

  async function verifyToken(dataUser: IData) {
    const isValid = await validateTokenTime(dataUser);

    if (isValid) getPlaylists();
  }

  useEffect(() => {
    const DATAUSER = getItem('slowfy');

    DATAUSER ? verifyToken(DATAUSER) : router.push('/');
  }, []);

  return (
    <main className={style.main}>
      <nav className={style.nav}>
        <h1>
          Playlists
        </h1>
        <div>
          <button
            type='button'
            className={!showAllplaylists ? style['btn-hover'] : ''}
            onClick={() => setShowAllPlaylists(false)}
          >
            Publicas
          </button>
          <button
            type='button'
            className={showAllplaylists ? style['btn-hover'] : ''}
            onClick={() => setShowAllPlaylists(true)}
          >
            Todas
          </button>
        </div>
      </nav>

      <section className={style.box}>
        {
          isLoading ? <Loading /> : (
            playlists && playlists.length > 0 && (
              <div className={style.container}>
                {
                  playlists && (
                    playlists
                      .filter((playlist) => {
                        if (showAllplaylists) return playlist;

                        return playlist.public !== showAllplaylists;
                      })
                      .map((playlist) => (
                        <PlaylistCard
                          key={playlist.id}
                          playlist={playlist}
                        />
                      ))
                  )
                }
              </div>
            )
          )
        }
        {
          playlists && (
            playlists.length === 0 && <p className={style.warning}>Ops! Parece que você não tem nenhuma playlsit...</p>
          )
        }
      </section>

      <NavBar />
    </main>
  );
}

export default Playlists;