import React from 'react';
import { useRouter } from 'next/router';

import styles from '@/styles/components/Navbar.module.css';
import { GiBackwardTime, GiMicrophone } from 'react-icons/gi';
import { FiMusic, FiUser } from 'react-icons/fi';
import { RiPlayListLine } from 'react-icons/ri';

function NavBar() {
  const router = useRouter();
  const path = router.pathname;

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="/user" className={
            path === '/user' ? styles.hover : ''
          }>
            <FiUser className={styles.icon} />
            <span>Perfil</span>
          </a>
        </li>
        <li>
          <a href="/artists" className={
            path === '/artists' ? styles.hover : ''
          }>
            <GiMicrophone className={styles.icon} />
            <span>Top Artistas</span>
          </a>
        </li>
        <li>
          <a href="/musics" className={
            path === '/musics' ? styles.hover : ''
          }>
            <FiMusic className={styles.icon} />
            <span>Top Músicas</span>
          </a>
        </li>
        <li>
          <a href="/recent" className={
            path === '/recent' ? styles.hover : ''
          }>
            <GiBackwardTime className={styles.icon} />
            <span>Recente</span>
          </a>
        </li>
        <li>
          <a href="/playlists" className={path === '/playlists' ? styles.hover : ''}>
            <RiPlayListLine className={styles.icon} />
            <span>Playlists</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;