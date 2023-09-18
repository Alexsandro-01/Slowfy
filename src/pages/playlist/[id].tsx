import { IData, IMusics, IPlaylistContentItems } from '@/interfaces/types';
import { fetchUserPlaylistContent } from '@/utils/fetchs/spotify';
import { getItem } from '@/utils/localStorage';
import { validateTokenTime } from '@/utils/validToken';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Playlist() {
  const [musics, setMusics] = useState<IPlaylistContentItems[]>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  async function getPlaylistTracks(playlistId: string) {
    setIsLoading(true);
    const DATAUSER = getItem('slowfy');

    const responsePlaylistTracks = await fetchUserPlaylistContent(
      DATAUSER.access,
      playlistId
    );

    if (responsePlaylistTracks) {
      setMusics(responsePlaylistTracks);
      setIsLoading(false);
    }

  }

  async function verifyToken(dataUser: IData) {
    const isValid = await validateTokenTime(dataUser);

    if (isValid) {
      getPlaylistTracks(router.query.id as string);
    }
  }

  useEffect(() => {
    const DATAUSER = getItem('slowfy');

    if (DATAUSER) {
      if (router.query.id) verifyToken(DATAUSER);
    } else {
      router.push('/');
    }
  }, [router.query]);

  return (
    <main>
      <h1>Playlist&apos;s musics</h1>
    </main>
  );
}

export default Playlist;