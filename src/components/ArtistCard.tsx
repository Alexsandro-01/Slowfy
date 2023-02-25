import React from 'react';
import { IArtist } from '@/interfaces/types';
import Image from 'next/image';

import styles from '@/styles/components/Artistscard.module.css';
import Link from 'next/link';

function ArtistCard({ artist }: { artist: IArtist }) {
  return (
    <div className={styles.container}>
      <Link href={`/artist/${artist.id}`}>
        <div className={styles['img-container']} >
          <Image
            src={artist.images[0].url}
            alt={artist.name}
            width='300'
            height='300'
            className={styles.img}
          />
        </div>
        <div>
          <p>
            <strong>
              {
                artist.name
              }
            </strong>
          </p>
          <p>
            <span className={styles.followers}>
              {
                `${artist.followers.total.toLocaleString()} seguidores`
              }
            </span>
            <span className={styles.type}>
              {
                artist.type
              }
            </span>
          </p>
        </div>
      </Link>
    </div>

  );
}

export default ArtistCard;