'use client';
import { useStore } from '@/lib/store';
import styles from './BottomBar.module.css';

export default function BottomBar() {
  const activeView = useStore((s) => s.activeView);
  const setActiveView = useStore((s) => s.setActiveView);
  const role = useStore((s) => s.role);
  const isOp = role === 'operator';

  const tabs = [
    { view: 'map', label: '⬡ MAP' },
    { view: 'drone', label: '◈ DRONES' },
    { view: 'atc', label: '✈ ATC' },
    { view: 'intel', label: '⚡ INTEL' },
  ] as const;

  return (
    <footer id="bottom-bar" className={styles.bar}>
      <div className={styles.left}>
        <span>MGRS: 43P DC 3482 2293</span>
        <span>13°07&apos;12.93&quot;N 080°16&apos;33.08&quot;E</span>
      </div>

      <nav className={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t.view}
            className={`${styles.tab} ${activeView === t.view ? styles.active : ''}`}
            onClick={() => setActiveView(t.view)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className={styles.right}>
        <span className={styles.jwt}>
          JWT: <span className={isOp ? styles.roleOp : styles.roleViewer}>{isOp ? 'OPERATOR' : 'VIEWER'}</span>
        </span>
        <span className={styles.heartbeat}>
          <span className={styles.hbDot} /> SIGNAL STRONG
        </span>
      </div>
    </footer>
  );
}
