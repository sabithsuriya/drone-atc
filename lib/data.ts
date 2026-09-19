export interface Drone {
  id: string;
  name: string;
  sector: string;
  x: number;
  y: number;
  alt: number;
  spd: number;
  hdg: number;
  bat: number;
  sig: string;
  status: string;
  video: string;
}

export interface Flight {
  callsign: string;
  type: string;
  origin: string;
  dest: string;
  alt: number;
  spd: number;
  hdg: number;
  status: string;
  isVip: boolean;
  x: number;
  y: number;
}

export const DRONES: Drone[] = [
  {
    id: 'D-001', name: 'ALPHA', sector: 'RWY-28L-NORTH',
    x: 35, y: 30, alt: 52, spd: 14, hdg: 45, bat: 87, sig: 'STRONG', status: 'PATROL',
    video: '/assets/videos/drone1.mp4',
  },
  {
    id: 'D-002', name: 'BRAVO', sector: 'RWY-28R-SOUTH',
    x: 58, y: 35, alt: 68, spd: 18, hdg: 120, bat: 92, sig: 'STRONG', status: 'ESCORT',
    video: '/assets/videos/drone2.mp4',
  },
  {
    id: 'D-003', name: 'CHARLIE', sector: 'VIP-PATROL-CORRIDOR',
    x: 44, y: 58, alt: 45, spd: 11, hdg: 270, bat: 79, sig: 'NOMINAL', status: 'ESCORT',
    video: '/assets/videos/drone3.mp4',
  },
  {
    id: 'D-004', name: 'DELTA', sector: 'CARGO-TERMINAL-A',
    x: 22, y: 62, alt: 60, spd: 16, hdg: 180, bat: 94, sig: 'STRONG', status: 'PATROL',
    video: '/assets/videos/drone4.mp4',
  },
  {
    id: 'D-005', name: 'ECHO', sector: 'PERIMETER-EAST',
    x: 74, y: 52, alt: 80, spd: 22, hdg: 10, bat: 68, sig: 'NOMINAL', status: 'STANDBY',
    video: '/assets/videos/drone1.mp4',
  },
];

export const FLIGHTS: Flight[] = [
  { callsign: 'QE-0911',    type: 'B777-3ER',   origin: 'DOH', dest: 'HAW', alt: 1200,  spd: 160, hdg: 280, status: 'VIP ESCORT', isVip: true,  x: 48, y: 45 },
  { callsign: 'SK-401',     type: 'A320-200',   origin: 'JFK', dest: 'HAW', alt: 4500,  spd: 240, hdg: 110, status: 'APPROACH',   isVip: false, x: 18, y: 24 },
  { callsign: 'AI-202',     type: 'B787-9',     origin: 'DEL', dest: 'LAX', alt: 12000, spd: 380, hdg: 240, status: 'EN ROUTE',   isVip: false, x: 82, y: 22 },
  { callsign: '911-CARGO',  type: 'B767-3F',    origin: 'HAW', dest: 'MEM', alt: 800,   spd: 120, hdg: 90,  status: 'TAXIING',    isVip: false, x: 26, y: 76 },
  { callsign: '911-PATROL', type: 'C208',       origin: 'HAW', dest: 'HAW', alt: 1500,  spd: 110, hdg: 350, status: 'PATROL',     isVip: false, x: 64, y: 68 },
  { callsign: 'IND-88',     type: 'A321NEO',    origin: 'LHR', dest: 'HAW', alt: 8500,  spd: 290, hdg: 280, status: 'DESCENT',    isVip: false, x: 88, y: 62 },
  { callsign: 'SG-305',     type: 'B737-800',   origin: 'HAW', dest: 'ORD', alt: 18000, spd: 410, hdg: 45,  status: 'CLIMBING',   isVip: false, x: 12, y: 88 },
  { callsign: 'VT-HAW',     type: 'H145-COPTER',origin: 'HAW', dest: 'HAW', alt: 400,   spd: 75,  hdg: 160, status: 'HOVER',      isVip: false, x: 38, y: 40 },
];
