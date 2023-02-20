import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import styles from '@/styles/Home.module.css';
import { getItem } from '@/utils/localStorage';
import Login from '@/components/Login';
import Loading from '@/components/Loading';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	function checkIfHasToken() {
		const dataUser = getItem('slowfy');

		if (dataUser) {
			router.push('/user');
		} else {
			setIsLoading(false);
		}
	}
  
	useEffect(() => {
		checkIfHasToken();
	}, []);
  
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Slowfy, um aplicativo de informações do Spotify" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#1db954" />
				<link rel="icon" href="/spotify.ico" />
			</Head>
			<main className={styles.main}>
				{
					isLoading ? <Loading /> : <Login />
				}
			</main>
		</>
	);
}
