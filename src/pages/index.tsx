import Head from 'next/head'
import {useRouter} from 'next/router'
import styles from '@/styles/Home.module.css'
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';
import { getitem, saveitem } from '@/utils/localStorage';
import Login from '@/components/Login';

export default function Home() {
  const router = useRouter();

  function checkIfHasToken() {
    const dataUser = getitem('slowfy');

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
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Login />
      </main>
    </>
  )
}
