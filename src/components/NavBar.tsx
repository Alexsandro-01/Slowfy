import styles from '@/styles/components/Navbar.module.css'
import {GiBackwardTime, GiMicrophone} from 'react-icons/gi'
import {FiMusic, FiUser} from 'react-icons/fi'
import {RiPlayListLine} from 'react-icons/ri'

function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="">
            <FiUser className={styles.icon}/>
            <span>Perfil</span>
          </a>
        </li>
        <li>
          <a href="">
            <GiMicrophone className={styles.icon}/>
            <span>Top Artistas</span>
          </a>
        </li>
        <li>
          <a href="">
            <FiMusic className={styles.icon}/>
            <span>Top Músicas</span>
          </a>
        </li>
        <li>
          <a href="">
            <GiBackwardTime className={styles.icon}/>
            <span>Recente</span>
          </a>
        </li>
        <li>
          <a href="">
            <RiPlayListLine className={styles.icon}/>
            <span>Playlists</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar