import { useRouter } from 'next/router';

import Loading from '@/components/Loading';
import styles from '../styles/Login.module.css';
import { useState } from 'react';


function Login() {
  const [loadin, setLoadin] = useState(false);

  const router = useRouter();
  let login_url = process.env.NEXT_PUBLIC_LOGIN_URL;

  if (!login_url) {
    login_url = 'http://localhost:3000/api/login';
  }
  
  return (
    <main className={styles.login}>
      <div>
        <h1>Slowfy</h1>
        <p>Vamos agrupar os seus dados de uso do Spotify, como artistas e músicas mais ouvidas!</p>
        <button
          type='button'
          disabled={loadin}
          onClick={() => {
            setLoadin(true);
            router.push(login_url as string);
          }}
        >
          {
            loadin ? (<Loading />) : 'Spotify Login'
          }
        </button>
      </div>
    </main>
  )
}

export default Login