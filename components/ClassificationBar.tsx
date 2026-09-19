'use client';
import styles from './ClassificationBar.module.css';

export default function ClassificationBar() {
  return (
    <div id="classification-bar" className={styles.bar}>
      <span className={styles.seg}>⬛ TOP SECRET // SI-TK // NOFORN</span>
      <span className={`${styles.seg} ${styles.center}`}>
        SKYBREACH · COMPARTMENT: DRONET · OPS CLUSTER 4113 · HAWTHORNE INTL
      </span>
      <span className={styles.seg}>TOP SECRET // SI-TK // NOFORN ⬛</span>
    </div>
  );
}
