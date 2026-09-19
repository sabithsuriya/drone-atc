'use client';
import { useStore } from '@/lib/store';
import MapView from './views/MapView';
import DroneView from './views/DroneView';
import AtcView from './views/AtcView';
import IntelView from './views/IntelView';
import OverrideFlash from './OverrideFlash';
import styles from './Viewport.module.css';

export default function Viewport() {
  const activeView = useStore((s) => s.activeView);
  return (
    <main className={styles.viewport}>
      <div className={`${styles.view} ${activeView === 'map' ? styles.active : ''}`}>
        <MapView />
      </div>
      <div className={`${styles.view} ${activeView === 'drone' ? styles.active : ''}`}>
        <DroneView />
      </div>
      <div className={`${styles.view} ${activeView === 'atc' ? styles.active : ''}`}>
        <AtcView />
      </div>
      <div className={`${styles.view} ${activeView === 'intel' ? styles.active : ''}`}>
        <IntelView />
      </div>
      {/* Override flash lives inside viewport */}
      <OverrideFlash />
    </main>
  );
}
