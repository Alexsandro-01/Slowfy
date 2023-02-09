import { IArtist } from "@/interfaces/types"
import Image from "next/image"

import styles from '@/styles/components/Artistscard.module.css';

function ArtistCard({ artist }: { artist: IArtist }) {
  return (
    <div className={styles.container}>
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
          <span>
            {
              artist.type
            }
          </span>
        </p>
      </div>

    </div>
  )
}

export default ArtistCard