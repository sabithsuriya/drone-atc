'use client';
import { useState, useCallback } from 'react';
import { useStore } from '@/lib/store';
import styles from './MapView.module.css';

export default function MapView() {
  const drones = useStore((s) => s.drones);
  const flights = useStore((s) => s.flights);
  const layers = useStore((s) => s.layers);
  const vipEscortActive = useStore((s) => s.vipEscortActive);
  const selectObject = useStore((s) => s.selectObject);
  const selectedId = useStore((s) => s.selectedId);

  const [coords, setCoords] = useState({ lat: '13.1203', lng: '80.2525', mgrs: 'MGRS: 43P DC 3482 2293' });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    const lat = (13.12 + (1 - yPct / 100) * 0.05).toFixed(4);
    const lng = (80.25 + (xPct / 100) * 0.05).toFixed(4);
    setCoords({
      lat, lng,
      mgrs: `MGRS: 43P DC ${Math.floor(xPct * 100)} ${Math.floor(yPct * 100)}`,
    });
  }, []);

  return (
    <div className={styles.mapView} onMouseMove={handleMouseMove}>
      {/* Satellite background */}
      <div className={styles.satBg}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/satellite.jpeg" alt="Satellite View" className={styles.satImg} />
      </div>

      {/* Grid overlay */}
      <div className={styles.gridOverlay} />

      {/* VIP corridor SVG */}
      {layers.vip && (
        <svg className={styles.vipSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
          <line className={styles.vipLine} x1="22" y1="28" x2="60" y2="32" />
          <line className={styles.vipLine} x1="60" y1="32" x2="42" y2="62" />
          <line className={styles.vipLine} x1="42" y1="62" x2="18" y2="62" />
          <line className={styles.vipLine} x1="18" y1="62" x2="22" y2="28" />
          <line className={styles.vipLine} x1="74" y1="52" x2="60" y2="32" />
        </svg>
      )}

      {/* Drone layer */}
      {layers.drones && (
        <div className={styles.droneLayer}>
          {drones.map((d, idx) => (
            <div
              key={d.id}
              className={`${styles.droneIcon} ${selectedId === d.id ? styles.selected : ''}`}
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
              onClick={(e) => { e.stopPropagation(); selectObject(d.id, 'drone', idx); }}
            >
              <div className={styles.diPulse} />
              <div className={styles.diBracket}>
                <div className={styles.diInner} style={{ transform: `rotate(${d.hdg}deg)` }} />
              </div>
              <div className={styles.diLabel}>{d.id} · {d.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* ATC layer */}
      {layers.flights && (
        <div className={styles.atcLayer}>
          {flights.map((f) => (
            <div
              key={f.callsign}
              className={styles.flightIcon}
              style={{ left: `${f.x}%`, top: `${f.y}%` }}
              onClick={(e) => { e.stopPropagation(); selectObject(f.callsign, 'flight'); }}
            >
              <div className={styles.fiPlane} style={{ transform: `rotate(${f.hdg - 45}deg)` }}>✈</div>
              <div className={`${styles.fiLabel} ${f.isVip ? styles.vip : ''}`}>{f.callsign} · {f.alt}ft</div>
            </div>
          ))}
        </div>
      )}

      {/* Radar ring */}
      <div className={styles.radarRing} />

      {/* Map HUD bar */}
      <div className={styles.hudBar}>
        <div className={styles.hudLeft}>
          <span>{coords.mgrs}</span>
          <span>{coords.lat}°N {coords.lng}°E</span>
        </div>
        <div className={styles.hudCenter}>
          <div className={styles.hudStat}><span className={`${styles.msVal} ${styles.cyan}`}>5</span><span className={styles.msLbl}>DRONES</span></div>
          <div className={styles.hudSep}>|</div>
          <div className={styles.hudStat}><span className={`${styles.msVal} ${styles.white}`}>8</span><span className={styles.msLbl}>FLIGHTS</span></div>
          <div className={styles.hudSep}>|</div>
          <div className={styles.hudStat}>
            <span className={`${styles.msVal} ${vipEscortActive ? styles.amber : styles.red}`}>
              {vipEscortActive ? 'ACTIVE' : 'DISENGAGED'}
            </span>
            <span className={styles.msLbl}>VIP ESCORT</span>
          </div>
        </div>
        <div className={styles.hudRight}>ALT REF: MSL · DATUM: WGS84</div>
      </div>
    </div>
  );
}
