'use client';
import { useStore } from '@/lib/store';
import { FLIGHTS } from '@/lib/data';
import styles from './RightPanel.module.css';

export default function RightPanel() {
  const rightCollapsed = useStore((s) => s.rightCollapsed);
  const toggleRightPanel = useStore((s) => s.toggleRightPanel);
  const drones = useStore((s) => s.drones);
  const role = useStore((s) => s.role);
  const sliders = useStore((s) => s.sliders);
  const setSlider = useStore((s) => s.setSlider);
  const triggerOverride = useStore((s) => s.triggerOverride);
  const setActiveView = useStore((s) => s.setActiveView);
  const setActiveDroneIndex = useStore((s) => s.setActiveDroneIndex);
  const isOp = role === 'operator';

  const allObjects = [
    ...drones.map((d) => ({ id: d.id, type: 'DRONE', detail: `${d.alt}m · ${d.spd}kts`, dot: 'cyan' })),
    ...FLIGHTS.map((f) => ({ id: f.callsign, type: 'FLIGHT', detail: `${f.alt}ft · ${f.status}`, dot: f.isVip ? 'amber' : 'white' })),
  ];

  return (
    <aside className={`${styles.panel} ${rightCollapsed ? styles.collapsed : ''}`}>
      <button
        className={styles.collapseBtn}
        onClick={toggleRightPanel}
        title="Collapse"
      >
        {rightCollapsed ? '◀' : '▶'}
      </button>

      {/* Live Signals */}
      <div className={styles.section}>
        <div className={styles.sectionHdr}>
          LIVE SIGNALS
          <span className={`${styles.hdrCount} ${styles.cyan}`}>{drones.length}</span>
        </div>
        <div className={styles.signalsList}>
          {drones.map((d, idx) => (
            <div
              key={d.id}
              className={styles.signalItem}
              onClick={() => { setActiveDroneIndex(idx); setActiveView('drone'); }}
            >
              <div className={styles.siTop}>
                <span className={styles.siId}>{d.id} {d.name}</span>
                <span className={`${styles.siStatus} ${d.bat < 80 ? styles.amber : ''}`}>{d.sig}</span>
              </div>
              <div className={styles.siDetail}>{d.sector} · BAT: {d.bat}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Object List */}
      <div className={styles.section}>
        <div className={styles.sectionHdr}>
          OBJECT LIST
          <span className={styles.hdrCount}>{allObjects.length}</span>
        </div>
        <div className={styles.objectList}>
          {allObjects.map((obj) => (
            <div key={obj.id} className={styles.objItem}>
              <span className={`${styles.objDot} ${styles[obj.dot as keyof typeof styles]}`} />
              <span className={styles.objId}>{obj.id}</span>
              <span className={styles.objDetail}>{obj.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Operator Controls */}
      <div className={styles.section}>
        <div className={`${styles.sectionHdr} ${styles.opHdr}`}>
          ⚙ OPERATOR CONTROLS
          <span className={styles.lockIcon}>{isOp ? '🔓' : '🔒'}</span>
        </div>
        <div className={`${styles.operatorInner} ${!isOp ? styles.locked : ''}`}>
          {!isOp && (
            <div className={styles.lockOverlay}>
              <div className={styles.lockContent}>
                <div className={styles.lockIconBig}>🔒</div>
                <div className={styles.lockTitle}>RESTRICTED ACCESS</div>
                <div className={styles.lockHint}>Current Clearance: <code>Viewer</code></div>
                <div className={styles.lockSub}>Operator Clearance Required</div>
                <div className={`${styles.lockSub} ${styles.dim}`}>Authenticate via Operator Token</div>
              </div>
            </div>
          )}
          <div className={`${styles.opControls} ${!isOp ? styles.blurred : ''}`}>
            {/* Sliders */}
            {([
              ['DENSITY', 'density'],
              ['FREE', 'free'],
              ['OPERATE', 'operate'],
              ['3D', 'threed'],
              ['CONTAIN', 'contain'],
            ] as const).map(([label, key]) => (
              <div key={key} className={styles.ocRow}>
                <span className={styles.ocLabel}>{label}</span>
                <input
                  type="range"
                  className={styles.ocSlider}
                  min={0} max={100}
                  value={sliders[key]}
                  onChange={(e) => setSlider(key, parseInt(e.target.value))}
                  disabled={!isOp}
                />
                <span className={styles.slVal}>{sliders[key]}%</span>
              </div>
            ))}

            {/* Target units */}
            <div className={styles.ocSectionTitle}>TARGET UNITS</div>
            {['D-001 ALPHA','D-002 BRAVO','D-003 CHARLIE','D-004 DELTA','D-005 ECHO'].map((unit) => (
              <label key={unit} className={styles.dtCheck}>
                <input type="checkbox" defaultChecked disabled={!isOp} style={{ accentColor: 'var(--cyan)' }} />
                {' '}{unit}
              </label>
            ))}

            {/* Override */}
            <div className={styles.dangerZone}>
              <button
                className={styles.overrideBtn}
                onClick={() => {
                  if (!isOp) { alert('Clearance Denied: Operator role required.'); return; }
                  triggerOverride();
                }}
              >
                ⚡ SEND OVERRIDE COMMAND
              </button>
              <div className={styles.dangerHint}>FORMATION: BREAK · ESCORT: DISENGAGE</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
