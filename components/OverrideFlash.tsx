'use client';
import { useStore } from '@/lib/store';
import styles from './OverrideFlash.module.css';

export default function OverrideFlash() {
  const isOverridden = useStore((s) => s.isOverridden);
  const dismissOverride = useStore((s) => s.dismissOverride);

  if (!isOverridden) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <div className={styles.icon}>⚡</div>
        <div className={styles.title}>COMMAND TRANSMITTED</div>
        <div className={styles.sub}>OVERRIDE SEQUENCE CONFIRMED</div>
        <div className={styles.details}>
          <div className={styles.row}><span>DRONES AFFECTED</span><span className={styles.cyan}>5 / 5</span></div>
          <div className={styles.row}><span>VIP ESCORT STATUS</span><span className={styles.red}>DISENGAGED</span></div>
          <div className={styles.row}><span>FORMATION</span><span className={styles.red}>BROKEN</span></div>
          <div className={styles.row}><span>CMD TYPE</span><span className={styles.amber}>DIRECT OPERATOR OVERRIDE</span></div>
        </div>
        <div className={styles.code}>
          {`{"type":"override_confirmed","vip_escort_status":"DISENGAGED","drones_affected":5}`}
        </div>
        <button className={styles.dismiss} onClick={dismissOverride}>ACKNOWLEDGE</button>
      </div>
    </div>
  );
}
