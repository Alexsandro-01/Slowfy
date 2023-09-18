import React from 'react';
import Image from 'next/image';

import styles from '@/styles/components/PlaylistCard.module.css';
import { IPlaylist } from '@/interfaces/types';
import Link from 'next/link';

function PlaylistCard({ playlist }: { playlist: IPlaylist }) {
  return (
    <div className={styles.container}>
      <Link href={`/playlist/${playlist.id}`}>
        <div className={styles['img-container']}>
          <Image
            src={playlist.images[0].url}
            alt={playlist.name}
            width="140"
            height="140"
            loading='lazy'
            className={styles.img}
          />
        </div>
        <div className={styles.info}>
          <p>
            <strong>
              {
                playlist.name
              }
            </strong>
          </p>
          <p>
            <span>
              {`${playlist.tracks.total} músicas`}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PlaylistCard;
