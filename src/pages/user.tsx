import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image';

import { getitem, saveitem } from '@/utils/localStorage';
import { data, playlists, UserProfile } from '@/interfaces/types';

import { user } from '../mocks/user';
import Aside from '@/components/Aside';
import styles from '@/styles/User.module.css';
import { fetchUserPlaylists, fetchRefreshToken } from '@/utils/fetchs/spotify';

function User() {
  const [profile, setprofile] = useState<UserProfile>()
  const [playlists, setPlaylists] = useState<playlists>();

  
  const ROUTER = useRouter();
  let refreshTokenUrl = process.env.REFRESH_TOKEN_IRL;

  if (process.env.NODE_ENV !== 'production') {
    refreshTokenUrl = 'http://localhost:3000/api/refresh-token'
  }


  

  

  async function getUser() {
    const DATAUSER = getitem('slowfy');

    // const user = await fetchProfile(dataUser.access);
    setprofile(user);
    // console.log(user);

    if (user) {
      const response = await fetchUserPlaylists(DATAUSER.access, profile?.id as string);

      setPlaylists(response);
    }
  }

  


  function saveToken(token: string, refreshToken: string) {
    const DATAUSER = getitem('slowfy');

    if (!DATAUSER) {
      const data = {
        access: token,
        refresh: refreshToken,
        date: new Date()
      }

      saveitem('slowfy', data);
    }

    getUser();
  }

  function updateLocalToken(refreshedToken: string) {
    const DATAUSER = getitem('slowfy');
    DATAUSER.access = refreshedToken;
    DATAUSER.date = new Date();

    saveitem('slowfy', DATAUSER);
    getUser();
  }

  async function validateTokenTime(dataUser: data) {
    const timeGap = new Date().getTime() - new Date(dataUser.date).getTime();
      const requiredTimeGap = 3600 * 1000;

      // console.log(timeGap)
      // console.log(requiredTimeGap)
      // console.log(timeGap >= requiredTimeGap)
      if (timeGap >= requiredTimeGap) {
        const newToken =  await fetchRefreshToken(dataUser.refresh, refreshTokenUrl as string);

        updateLocalToken(newToken.access_token);
      } else {
        getUser();
      }
  }

  useEffect(() => {
    const DATAUSER = getitem('slowfy');

    if (ROUTER.query.access) {
      saveToken(
        ROUTER.query.access as string,
        ROUTER.query.refresh as string
      );
    }
    
    // remover essa complexidade do useEffect
    if (DATAUSER) {
      validateTokenTime(DATAUSER);
    }
    DATAUSER.date = new Date('2023-02-04');
    // saveitem('slowfy', DATAUSER);
  }, [ROUTER.query])

  return (
    <div className={styles.container}>
      <Aside />
      <main>
        <section className={styles.header}>
          <div className={styles.thumb}>
            <Image
              src={profile?.images[0].url as string} 
              alt={`Imagem de perfil de ${profile?.display_name}`}
              width="300"
              height="300"
            />
          </div>

          <div className={styles.info}>
            <p>
              Perfil
            </p>
            <h1>
              {
                profile?.display_name
              }
            </h1>
            <p>
              { `Playlists: ${playlists?.items.length}` }
            </p>
          </div>
        </section>
        <section>

        </section>
      </main>
    </div>
  )
}

export default User