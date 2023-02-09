import { IMusic } from "@/interfaces/types"
import Image from "next/image"

function MusicCard({ music, index }: { music: IMusic, index: number }) {
  return (
    <div>
      <div>
        {
          index + 1
        }
      </div>
      <div>
        <div>
          <Image
            src={music.album.images[1].url}
            alt={music.album.name}
            width='300'
            height='300'
          />
        </div>
        <div>
          <p>
            <strong>
              {
                music.name
              }
            </strong>
          </p>
          <p>
            {
              music.artists.length > 1 ? (
                music.artists.map((artist, index) => {
                  if (index === 0) return <span key={artist.id}>{artist.name}</span>
                  if (index > 0) return <span key={artist.id}>, {artist.name}</span>
                })
              ) : (
                music.artists[0].name
              )
            }
          </p>
        </div>
      </div>
      <div>
        <p>
          <span>
            {
              music.album.name
            }
          </span>
        </p>
      </div>
      <div>
        <p>
          <span>
            tempo
          </span>
        </p>
      </div>
    </div>
  )
}

export default MusicCard