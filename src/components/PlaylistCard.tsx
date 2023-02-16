import Image from "next/image"

import styles from '@/styles/components/PlaylistCard.module.css'
import { IPlaylist } from "@/interfaces/types"

function PlaylistCard({ playlist }: { playlist: IPlaylist }) {
  return (
    <div className={styles.container}>
      <div className={styles['img-container']} >
        <Image
          src={playlist.images[0].url}
          alt={playlist.name}
          width='300'
          height='300'
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
            { `${playlist.tracks.total} músicas`}
          </span>
        </p>
      </div>
    </div>
  )
}

export default PlaylistCard