'use client';
import { useStore } from '@/lib/store';
import styles from './DroneView.module.css';

export default function DroneView() {
  const drones = useStore((s) => s.drones);
  const activeDroneIndex = useStore((s) => s.activeDroneIndex);
  const setActiveDroneIndex = useStore((s) => s.setActiveDroneIndex);
  const cycleDrone = useStore((s) => s.cycleDrone);
  const setActiveView = useStore((s) => s.setActiveView);
  const role = useStore((s) => s.role);

  const drone = drones[activeDroneIndex];
  const isOp = role === 'operator';


  const hdgStr = String(drone?.hdg ?? 0).padStart(3, '0');
  const compassShift = ((drone?.hdg ?? 0) / 360) * 120;

  return (
    <div className={styles.droneView}>
      {/* key forces full remount when drone changes — most reliable way to swap video src */}
      <video
        key={drone?.video}
        className={styles.feed}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={drone?.video} type="video/mp4" />
      </video>

      {/* FPV HUD */}
      <div className={styles.hud}>
        {/* Top telem bar */}
        <div className={styles.fpvTop}>
          {[
            { lbl: 'ALT', val: `${String(drone?.alt ?? 0).padStart(3, '0')} m`, cls: '' },
            { lbl: 'HDG', val: `${hdgStr}°`, cls: styles.large },
            { lbl: 'SPD', val: `${drone?.spd ?? 0} kts`, cls: '' },
            { lbl: 'BAT', val: `${drone?.bat ?? 0}%`, cls: styles.green },
            { lbl: 'SIG', val: drone?.sig ?? '', cls: styles.green },
          ].map((item, i, arr) => (
            <div key={item.lbl} style={{ display: 'contents' }}>
              <div className={styles.telemBlock}>
                <span className={styles.ftLabel}>{item.lbl}</span>
                <span className={`${styles.ftVal} ${item.cls}`}>{item.val}</span>
              </div>
              {i < arr.length - 1 && <div className={styles.divider} />}
            </div>
          ))}
        </div>

        {/* ID badge */}
        <div className={styles.idBadge}>
          <div className={styles.droneId}>{drone?.id}</div>
          <div className={styles.droneName}>{drone?.name}</div>
          <div className={styles.droneSector}>{drone?.sector}</div>
        </div>

        {/* Role badge */}
        <div className={`${styles.roleBadge} ${isOp ? styles.roleOp : styles.roleViewer}`}>
          {isOp ? '⚡ OPERATOR ACTIVE' : '👁 VIEWER MODE'}
        </div>

        {/* Corner brackets */}
        <div className={`${styles.bracket} ${styles.tl}`} />
        <div className={`${styles.bracket} ${styles.tr}`} />
        <div className={`${styles.bracket} ${styles.bl}`} />
        <div className={`${styles.bracket} ${styles.br}`} />

        {/* Horizon */}
        <div className={styles.horizon} />

        {/* Crosshair */}
        <div className={styles.crosshair}>
          <div className={styles.chH} />
          <div className={styles.chV} />
          <div className={styles.chCircle} />
        </div>

        {/* Compass */}
        <div className={styles.compassWrap}>
          <div
            className={styles.compassStrip}
            style={{ transform: `translateX(-${compassShift}px)` }}
          >
            <span>N 000</span><span>045</span><span>NE 090</span><span>135</span>
            <span>S 180</span><span>225</span><span>SW 270</span><span>315</span>
            <span>N 360</span><span>045</span><span>NE 090</span>
          </div>
          <div className={styles.compassTick}>▾</div>
        </div>

        {/* Locked notice */}
        {!isOp && (
          <div className={styles.lockedNotice}>
            🔒 OPERATOR CLEARANCE REQUIRED — CONTROL PANEL DISABLED
          </div>
        )}
      </div>

      {/* Drone nav bar */}
      <div className={styles.navBar}>
        <button className={styles.dnavBtn} onClick={() => cycleDrone(-1)}>◀ PREV</button>
        <div className={styles.thumbStrip}>
          {drones.map((d, idx) => (
            <div
              key={d.id}
              className={`${styles.thumb} ${idx === activeDroneIndex ? styles.thumbActive : ''}`}
              onClick={() => setActiveDroneIndex(idx)}
            >
              <div className={styles.thumbId}>{d.id}</div>
              <div className={styles.thumbSub}>{d.name}</div>
            </div>
          ))}
        </div>
        <button className={styles.dnavBtn} onClick={() => cycleDrone(1)}>NEXT ▶</button>
      </div>

      {/* Back button */}
      <button className={styles.backBtn} onClick={() => setActiveView('map')}>⬡ BACK TO MAP</button>
    </div>
  );
}
