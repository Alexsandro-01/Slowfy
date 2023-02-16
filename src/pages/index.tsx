import Head from 'next/head'
import {useRouter} from 'next/router'
import styles from '@/styles/Home.module.css'
import { useEffect } from 'react';
import { getItem } from '@/utils/localStorage';
import Login from '@/components/Login';

export default function Home() {
  const router = useRouter();

  function checkIfHasToken() {
    const dataUser = getItem('slowfy');

    if (dataUser) {
      router.push('/user');
    }
  }
  
  useEffect(() => {
    checkIfHasToken();
  }, [])
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Slowfy, um aplicativo de informações do Spotify" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1db954">
        <link rel="icon" href="/spotify.ico" />
      </Head>
      <main className={styles.main}>
        <Login />
      </main>
    </>
  )
}
