'use client';
import { useStore } from '@/lib/store';
import { DRONES, FLIGHTS } from '@/lib/data';
import styles from './LeftPanel.module.css';
import { type Drone, type Flight } from '@/lib/data';

export default function LeftPanel() {
  const leftCollapsed = useStore((s) => s.leftCollapsed);
  const toggleLeftPanel = useStore((s) => s.toggleLeftPanel);
  const layers = useStore((s) => s.layers);
  const setLayer = useStore((s) => s.setLayer);
  const role = useStore((s) => s.role);
  const selectedId = useStore((s) => s.selectedId);
  const selectedType = useStore((s) => s.selectedType);
  const setActiveView = useStore((s) => s.setActiveView);
  const setActiveDroneIndex = useStore((s) => s.setActiveDroneIndex);
  const drones = useStore((s) => s.drones);
  const isOverridden = useStore((s) => s.isOverridden);

  const selectedDrone: Drone | undefined = selectedType === 'drone'
    ? drones.find((d) => d.id === selectedId)
    : undefined;
  const selectedFlight: Flight | undefined = selectedType === 'flight'
    ? FLIGHTS.find((f) => f.callsign === selectedId)
    : undefined;

  return (
    <aside className={`${styles.panel} ${leftCollapsed ? styles.collapsed : ''}`}>
      <button
        className={styles.collapseBtn}
        onClick={toggleLeftPanel}
        title="Collapse"
      >
        {leftCollapsed ? '▶' : '◀'}
      </button>

      {/* Classification */}
      <div className={styles.section}>
        <div className={styles.sectionHdr}>
          <span className={styles.hdrTag}>TS</span>CLASSIFICATION
        </div>
        <div className={styles.clsBlock}>
          <div className={`${styles.clsLine} ${styles.amber}`}>TOP SECRET // SI-TK // NOFORN</div>
          <div className={styles.clsCode}>KH11-4074 OPS-4113</div>
          <div className={styles.clsStatusBadge}>
            {isOverridden ? <span className={styles.red}>OVERRIDE CONFIRMED</span> : 'NORMAL'}
          </div>
        </div>
        <div className={styles.infoRows}>
          <div className={styles.infoRow}><span className={styles.irLabel}>DOMAIN</span><span className={styles.irVal}>HAWTHORNE INTL · SECTOR A</span></div>
          <div className={styles.infoRow}><span className={styles.irLabel}>OPERATOR</span><span className={styles.irVal}>SKYBREACH OPS</span></div>
          <div className={styles.infoRow}><span className={styles.irLabel}>DRONES</span><span className={`${styles.irVal} ${styles.cyan}`}>5 ACTIVE</span></div>
          <div className={styles.infoRow}><span className={styles.irLabel}>JWT</span><span className={`${styles.irVal} ${role === 'operator' ? styles.green : styles.cyan}`}>{role.toUpperCase()}</span></div>
        </div>
      </div>

      {/* Data Layers */}
      <div className={styles.section}>
        <div className={styles.sectionHdr}>DATA LAYERS</div>
        <div className={styles.layerList}>
          {([
            { key: 'drones', label: 'DRONE UNITS (5)', dot: 'cyan' },
            { key: 'flights', label: 'ATC FLIGHTS (8)', dot: 'white' },
            { key: 'restricted', label: 'RESTRICTED ZONES', dot: 'red' },
            { key: 'vip', label: 'VIP CORRIDORS', dot: 'amber' },
          ] as const).map(({ key, label, dot }) => (
            <label key={key} className={styles.layerItem}>
              <input
                type="checkbox"
                checked={layers[key]}
                onChange={(e) => setLayer(key, e.target.checked)}
                className={styles.checkbox}
              />
              <span className={`${styles.layerDot} ${styles[dot]}`} />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Contact section */}
      {selectedId && (
        <div className={styles.section}>
          <div className={styles.sectionHdr}>CONTACT</div>
          <div className={styles.contactContent}>
            {selectedDrone && (
              <>
                <div className={styles.contactRow}><strong>UNIT:</strong> <span className={styles.cyan}>{selectedDrone.id} ({selectedDrone.name})</span></div>
                <div className={styles.contactRow}><strong>SECTOR:</strong> {selectedDrone.sector}</div>
                <div className={styles.contactRow}><strong>ALTITUDE:</strong> {selectedDrone.alt} m</div>
                <div className={styles.contactRow}><strong>SPEED:</strong> {selectedDrone.spd} kts</div>
                <div className={styles.contactRow}><strong>HEADING:</strong> {selectedDrone.hdg}°</div>
                <div className={styles.contactRow}><strong>BATTERY:</strong> <span className={styles.green}>{selectedDrone.bat}%</span></div>
                <div className={styles.contactRow}><strong>STATUS:</strong> <span className={isOverridden ? styles.red : styles.amber}>{selectedDrone.status}</span></div>
                <button
                  className={styles.fpvBtn}
                  onClick={() => {
                    const idx = drones.findIndex((d) => d.id === selectedDrone.id);
                    setActiveDroneIndex(idx);
                    setActiveView('drone');
                  }}
                >
                  🎥 SWITCH TO FPV FEED
                </button>
              </>
            )}
            {selectedFlight && (
              <>
                <div className={styles.contactRow}><strong>CALLSIGN:</strong> <span className={selectedFlight.isVip ? styles.amber : styles.white}>{selectedFlight.callsign}</span></div>
                <div className={styles.contactRow}><strong>TYPE:</strong> {selectedFlight.type}</div>
                <div className={styles.contactRow}><strong>ROUTE:</strong> {selectedFlight.origin} ➔ {selectedFlight.dest}</div>
                <div className={styles.contactRow}><strong>ALT / SPD:</strong> {selectedFlight.alt} ft / {selectedFlight.spd} kts</div>
                <div className={styles.contactRow}><strong>STATUS:</strong> <span className={styles.green}>{selectedFlight.status}</span></div>
              </>
            )}
          </div>
        </div>
      )}

      {/* System Status */}
      <div className={styles.section}>
        <div className={styles.sectionHdr}>SYSTEM STATUS</div>
        <div className={styles.statusGrid}>
          {[
            { dot: 'green', lbl: 'DroNet WS', val: 'ONLINE', valColor: 'green' },
            { dot: 'green', lbl: 'ATC FEED', val: 'ACTIVE', valColor: 'green' },
            { dot: 'amber', lbl: 'VIP ESCORT', val: 'ENGAGED', valColor: 'amber', blink: true },
            { dot: 'green', lbl: 'SATELLITE', val: 'LOCKED', valColor: 'green' },
            { dot: 'green', lbl: 'CARGO INT.', val: 'ACTIVE', valColor: 'green' },
            { dot: 'green', lbl: 'AUTH', val: 'SECURE', valColor: 'green' },
          ].map((item) => (
            <div key={item.lbl} className={styles.sgItem}>
              <span className={`${styles.sgDot} ${styles[item.dot]} ${item.blink ? styles.blinkSlow : ''}`} />
              <span className={styles.sgLbl}>{item.lbl}</span>
              <span className={`${styles.sgVal} ${styles[item.valColor]}`}>{item.val}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
