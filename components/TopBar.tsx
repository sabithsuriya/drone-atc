'use client';
import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import styles from './TopBar.module.css';

export default function TopBar() {
  const role = useStore((s) => s.role);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const update = () => {
      setTimestamp(new Date().toISOString().replace('T', ' ').substring(0, 19) + 'Z');
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const isOp = role === 'operator';

  return (
    <header id="top-bar" className={styles.topBar}>
      {/* Logo */}
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>◎</div>
        <div className={styles.logoWordmark}>
          <span className={styles.logoMain}>GOD&apos;S EYE</span>
          <span className={styles.logoSub}> VIEW</span>
        </div>
        <div className={styles.logoMeta}>
          <div className={styles.metaTag}>NO PLACE LEFT BEHIND</div>
          <div className={styles.metaTag}>
            ACCESS:{' '}
            <span className={isOp ? styles.badgeOperator : styles.badgeViewer}>
              {isOp ? 'OPERATOR' : 'VIEWER'}
            </span>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          <span className={styles.tickerInner}>
            REFRESHING LIVE DATA &nbsp;·&nbsp; MAPPED INSTALLATIONS &nbsp;·&nbsp; DroNet v2.3 ACTIVE &nbsp;·&nbsp;
            VIP ESCORT: ENGAGED &nbsp;·&nbsp; HAWTHORNE INTL SECTOR ALPHA &nbsp;·&nbsp;
            ADSB FEED: NOMINAL &nbsp;·&nbsp; ALL 5 DRONES IN FORMATION &nbsp;·&nbsp;&nbsp;
            REFRESHING LIVE DATA &nbsp;·&nbsp; MAPPED INSTALLATIONS &nbsp;·&nbsp; DroNet v2.3 ACTIVE &nbsp;·&nbsp;
            VIP ESCORT: ENGAGED &nbsp;·&nbsp; HAWTHORNE INTL SECTOR ALPHA &nbsp;·&nbsp;
            ADSB FEED: NOMINAL &nbsp;·&nbsp; ALL 5 DRONES IN FORMATION &nbsp;·&nbsp;
          </span>
        </div>
      </div>

      {/* REC */}
      <div className={styles.recArea}>
        <div className={styles.recDot} />
        <div className={styles.recBlock}>
          <div className={styles.recLabel}>REC</div>
          <div className={styles.recTimestamp}>{timestamp}</div>
          <div className={styles.recSub}>ORB: 47703 PASS: DESC-123</div>
        </div>
      </div>
    </header>
  );
}
