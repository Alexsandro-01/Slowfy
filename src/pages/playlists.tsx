import PlaylistCard from '@/components/PlaylistCard';
import { IData, ILimit, IPlaylists } from '@/interfaces/types';
import style from '@/styles/Artists.module.css';
import { fetchUserPlaylists } from '@/utils/fetchs/spotify';
import { getItem } from '@/utils/localStorage';
import { validateTokenTime } from '@/utils/validToken';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Playlists() {
  const [playlists, setPlaylists] = useState<IPlaylists>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  function publicPlaylists(userPlaylists: IPlaylists) {
    const result = userPlaylists.items.filter((playlist) => {
      if (playlist.public) return playlist;
    });

    return result;
  }

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
  }, [])

  return (
    <main className={style.main}>
      <nav className={style.nav}>
        <h1>
          Playlists
        </h1>
      </nav>

      <section>
        <div>
          {
            playlists && (
              publicPlaylists(playlists).map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                />
              ))
            )
          }
        </div>

      </section>
    </main>
  )
}

export default Playlists;