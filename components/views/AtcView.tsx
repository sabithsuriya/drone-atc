'use client';
import { useStore } from '@/lib/store';
import { FLIGHTS } from '@/lib/data';
import styles from './AtcView.module.css';

const RUNWAYS = [
  { id: '28L', status: 'ACTIVE', detail: 'LANDING', active: true },
  { id: '28R', status: 'ACTIVE', detail: 'DEPARTURE', active: true },
  { id: '10',  status: 'STANDBY', detail: 'CLOSED', active: false },
  { id: 'VIP', status: 'RESERVED', detail: 'QE-0911', active: true, amber: true },
];

export default function AtcView() {
  const flights = useStore((s) => s.flights);

  return (
    <div className={styles.atcView}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>AIR TRAFFIC CONTROL</div>
          <div className={styles.sub}>HAWTHORNE INTERNATIONAL AIRPORT · SECTOR ALPHA · ATC FEED</div>
        </div>
        <div className={styles.liveInd}><span className={styles.liveDot} /> LIVE</div>
      </div>

      <div className={styles.body}>
        {/* Runway status */}
        <div className={styles.runwayPanel}>
          <div className={styles.rwyTitle}>RUNWAY STATUS</div>
          <div className={styles.rwyGrid}>
            {RUNWAYS.map((rwy) => (
              <div key={rwy.id} className={`${styles.rwyCard} ${rwy.active ? styles.rwyActive : styles.rwyStandby}`}>
                <div className={styles.rwyId}>{rwy.id}</div>
                <div className={`${styles.rwyStatus} ${rwy.amber ? styles.amber : ''}`}>{rwy.status}</div>
                <div className={styles.rwyDetail}>{rwy.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Flight table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>CALLSIGN</th>
                <th>TYPE</th>
                <th>ORIGIN</th>
                <th>DEST</th>
                <th>ALT ft</th>
                <th>SPD kts</th>
                <th>HDG</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((f) => (
                <tr key={f.callsign}>
                  <td><strong className={f.isVip ? styles.amber : styles.cyan}>{f.callsign}</strong></td>
                  <td>{f.type}</td>
                  <td>{f.origin}</td>
                  <td>{f.dest}</td>
                  <td>{f.alt}</td>
                  <td>{f.spd}</td>
                  <td>{f.hdg}°</td>
                  <td>
                    <span className={`${styles.badge} ${f.isVip ? styles.amber : styles.green}`}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.note}>
          <span className={styles.noteText}>SYS-STATUS: ATC RADAR TELEMETRY INTEGRATED · ADSB-RECV NOMINAL</span>
        </div>
      </div>
    </div>
  );
}
