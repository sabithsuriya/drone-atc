'use client';
import { useState } from 'react';
import styles from './IntelView.module.css';

export default function IntelView() {
  const [ssrfUrl, setSsrfUrl] = useState('http://127.0.0.1:8765/api/v1/internal/status');
  const [ssrfOutput, setSsrfOutput] = useState('Ready for request input...');

  const handleSsrf = () => {
    if (ssrfUrl.includes('status') || ssrfUrl.includes('dronet')) {
      setSsrfOutput(
        'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "status": "ONLINE",\n  "cluster": "DroNet-v2.3",\n  "active_units": 5,\n  "vip_escort": "ACTIVE"\n}'
      );
    } else {
      setSsrfOutput(
        `HTTP/1.1 200 OK\nContent-Type: text/plain\n\nResponse received from ${ssrfUrl} via SecureLift Proxy Gateway.`
      );
    }
  };

  return (
    <div className={styles.intelView}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>AEROWIKI · INTERNAL DOCUMENTATION</div>
          <div className={styles.sub}>SYSTEM GATEWAY: SECURELIFT COMMUNICATIONS PROXY · wiki.etherence.com</div>
        </div>
        <div className={styles.connBadge}>CONNECTED</div>
      </div>

      <div className={styles.body}>
        <div className={styles.wikiDoc}>
          <div className={styles.docHeader}>
            <div className={styles.docTitle}>📄 DOC-4113: DroNet v2.3 REST &amp; Webhook Specifications</div>
            <div className={styles.docMeta}>LAST UPDATED: 2026-09-11 · CLASSIFICATION: TOP SECRET // SI-TK</div>
          </div>

          <div className={styles.docContent}>
            <h3>1. Operational Overview</h3>
            <p>The DroNet v2.3 cluster monitors Hawthorne International Sector Alpha and handles active airborne VIP escort sequences for VIP Airliner (QE-0911).</p>

            <h3>2. Authentication &amp; System Access Controls</h3>
            <p>Drone command endpoints utilize JSON Web Tokens (JWT) signed by the central authorization authority. Operators must hold active Level-3 clearance tokens.</p>
            <div className={styles.codeBlock}>
              <strong>Endpoint:</strong> POST /api/v1/dronet/override<br />
              <strong>Header:</strong> Authorization: Bearer &lt;JWT&gt;<br />
              <strong>Payload Schema:</strong><br />
              {`{"sub": "operator@skybreach", "role": "operator", "target_units": ["D-001","D-002","D-003","D-004","D-005"], "cmd": "DISENGAGE_ESCORT"}`}
            </div>

            <h3>3. SecureLift Proxy Communications Gateway</h3>
            <p>
              For internal partner synchronization, SecureLift provides an HTTP Proxy Gateway endpoint at{' '}
              <code>http://security.etherence.com/api/v2/webhook-proxy</code>.
            </p>

            <div className={styles.ssrfSandbox}>
              <div className={styles.ssrfTitle}>SECURELIFT PROXY GATEWAY TESTER</div>
              <div className={styles.ssrfForm}>
                <input
                  type="text"
                  className={styles.ssrfInput}
                  value={ssrfUrl}
                  onChange={(e) => setSsrfUrl(e.target.value)}
                  placeholder="Enter endpoint URL..."
                />
                <button className={styles.ssrfBtn} onClick={handleSsrf}>SEND PROXY REQUEST</button>
              </div>
              <pre className={styles.ssrfOutput}>{ssrfOutput}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
