'use client';
import styles from './ScanlineOverlay.module.css';

export default function ScanlineOverlay() {
  return (
    <>
      <div className={styles.scanline} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
    </>
  );
}
