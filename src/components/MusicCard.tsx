import { IMusic } from "@/interfaces/types"
import Image from "next/image"

import styles from "@/styles/components/MusicCards.module.css"

function MusicCard({ music, index }: { music: IMusic, index: number }) {

  function getMinutes(duration: number): string {
    const ms = duration;

    const totalSeg = ms / 1000;
    const min = Math.floor(totalSeg / 60);
    const seg = Math.floor(totalSeg % 60);

    return `${min}:${seg}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles['music-info']}>
        <div className={styles['music-number']}>
          <span>
            {
              index + 1
            }
          </span>
        </div>
        <div className={styles['img-card']}>
          <Image
            src={music.album.images[0].url}
            alt={music.album.name}
            width='640'
            height='640'
            className={styles.img}
          />
        </div>
        <div className={styles.text}>
          <p>
            <strong>
              {
                music.name
              }
            </strong>
          </p>
          <p>
            <span>
              {
                music.artists.length > 1 ? (
                  music.artists.map((artist, index) => {
                    if (index === 0) return `${artist.name}`;
                    if (index > 0) return `, ${artist.name}`;
                  })
                ) : (
                  music.artists[0].name
                )
              }
            </span>
          </p>
        </div>
      </div>
      <div className={styles['album-name']}>
        <p>
          <span>
            {
              music.album.name
            }
          </span>
        </p>
      </div>
      <div className={styles.duration}>
        <p>
          <span>
            {
              getMinutes(music.duration_ms)
            }
          </span>
        </p>
      </div>
    </div>
  )
}

export default MusicCard