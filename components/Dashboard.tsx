'use client';
import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import ClassificationBar from './ClassificationBar';
import TopBar from './TopBar';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Viewport from './Viewport';
import BottomBar from './BottomBar';
import ScanlineOverlay from './ScanlineOverlay';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const tickTelemetry = useStore((s) => s.tickTelemetry);

  // Live telemetry simulation
  useEffect(() => {
    const id = setInterval(tickTelemetry, 1500);
    return () => clearInterval(id);
  }, [tickTelemetry]);

  // JWT auth from localStorage / URL + console helpers
  useEffect(() => {
    const store = useStore.getState();
    let token = localStorage.getItem('dronet_jwt');
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('jwt')) {
      const t = urlParams.get('jwt');
      if (t) { token = t; localStorage.setItem('dronet_jwt', t); }
    }
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
          if (payload.role === 'operator' || payload.role === 'admin') {
            store.setRole('operator');
          }
        }
      } catch (_) { /* invalid token */ }
    }

    // Console helpers
    (window as any).GodsEye = {
      setRole: (r: string) => { useStore.getState().setRole(r as any); console.log(`[GodsEye] Role: ${r}`); },
      setOperatorAccess: () => {
        const h = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const p = btoa(JSON.stringify({ sub: 'operator', role: 'operator', iat: Math.floor(Date.now() / 1000) }));
        const tok = `${h}.${p}.OPERATOR_TOKEN`;
        localStorage.setItem('dronet_jwt', tok);
        useStore.getState().setRole('operator');
        console.log('[GodsEye] Operator token:', tok);
        return tok;
      },
      override: () => {
        const s = useStore.getState();
        if (s.role !== 'operator') { console.warn('[GodsEye] Operator required'); return; }
        s.triggerOverride();
      },
      getStatus: () => useStore.getState(),
    };

    console.log(
      "%c[GOD'S EYE - SKYBREACH]%c Ops Console Online.",
      'color: #00e5ff; font-weight: bold; font-size: 14px;',
      'color: #ffb400;'
    );
  }, []);

  return (
    <>
      <ScanlineOverlay />
      <ClassificationBar />
      <TopBar />
      <div className={styles.mainLayout}>
        <LeftPanel />
        <Viewport />
        <RightPanel />
      </div>
      <BottomBar />
    </>
  );
}
