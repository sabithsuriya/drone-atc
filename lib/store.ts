import { create } from 'zustand';
import { DRONES, FLIGHTS, type Drone, type Flight } from './data';

export type Role = 'viewer' | 'operator';
export type ViewName = 'map' | 'drone' | 'atc' | 'intel';

interface GodsEyeState {
  // View
  activeView: ViewName;
  setActiveView: (v: ViewName) => void;

  // Role & Auth
  role: Role;
  setRole: (r: Role) => void;

  // Drone FPV
  activeDroneIndex: number;
  setActiveDroneIndex: (i: number) => void;
  cycleDrone: (delta: number) => void;

  // Override
  isOverridden: boolean;
  vipEscortActive: boolean;
  triggerOverride: () => void;
  dismissOverride: () => void;

  // Layers
  layers: { drones: boolean; flights: boolean; restricted: boolean; vip: boolean };
  setLayer: (key: keyof GodsEyeState['layers'], val: boolean) => void;

  // Panel collapse
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;

  // Selected object
  selectedId: string | null;
  selectedType: 'drone' | 'flight' | null;
  selectObject: (id: string, type: 'drone' | 'flight', droneIndex?: number) => void;
  clearSelection: () => void;

  // Live telemetry (mutable drone data)
  drones: Drone[];
  flights: Flight[];
  tickTelemetry: () => void;

  // Sliders
  sliders: { density: number; free: number; operate: number; threed: number; contain: number };
  setSlider: (key: keyof GodsEyeState['sliders'], val: number) => void;
}

export const useStore = create<GodsEyeState>((set, get) => ({
  activeView: 'map',
  setActiveView: (v) => set({ activeView: v }),

  role: 'viewer',
  setRole: (r) => set({ role: r }),

  activeDroneIndex: 0,
  setActiveDroneIndex: (i) => set({ activeDroneIndex: i }),
  cycleDrone: (delta) => {
    const next = (get().activeDroneIndex + delta + DRONES.length) % DRONES.length;
    set({ activeDroneIndex: next });
  },

  isOverridden: false,
  vipEscortActive: true,
  triggerOverride: () => {
    const drones = get().drones.map((d) => ({ ...d, status: 'DISRUPTED', sig: 'OVERRIDE' }));
    set({ isOverridden: true, vipEscortActive: false, drones });
  },
  dismissOverride: () => set({ isOverridden: false }),

  layers: { drones: true, flights: true, restricted: false, vip: true },
  setLayer: (key, val) => set((s) => ({ layers: { ...s.layers, [key]: val } })),

  leftCollapsed: false,
  rightCollapsed: false,
  toggleLeftPanel: () => set((s) => ({ leftCollapsed: !s.leftCollapsed })),
  toggleRightPanel: () => set((s) => ({ rightCollapsed: !s.rightCollapsed })),

  selectedId: null,
  selectedType: null,
  selectObject: (id, type, droneIndex) => {
    set({ selectedId: id, selectedType: type });
    if (type === 'drone' && droneIndex !== undefined) set({ activeDroneIndex: droneIndex });
  },
  clearSelection: () => set({ selectedId: null, selectedType: null }),

  drones: DRONES.map((d) => ({ ...d })),
  flights: FLIGHTS.map((f) => ({ ...f })),
  tickTelemetry: () => {
    const drones = get().drones.map((d) => {
      let alt = d.alt + Math.floor(Math.random() * 3) - 1;
      alt = Math.min(120, Math.max(30, alt));
      let spd = d.spd + Math.floor(Math.random() * 3) - 1;
      spd = Math.max(5, spd);
      const hdg = (d.hdg + Math.floor(Math.random() * 5) - 2 + 360) % 360;
      return { ...d, alt, spd, hdg };
    });
    const flights = get().flights.map((f) => {
      let x = f.x + Math.cos((f.hdg * Math.PI) / 180) * 0.05;
      let y = f.y + Math.sin((f.hdg * Math.PI) / 180) * 0.05;
      if (x < 5) x = 95;
      if (x > 95) x = 5;
      if (y < 5) y = 95;
      if (y > 95) y = 5;
      return { ...f, x, y };
    });
    set({ drones, flights });
  },

  sliders: { density: 75, free: 7, operate: 1, threed: 50, contain: 51 },
  setSlider: (key, val) => set((s) => ({ sliders: { ...s.sliders, [key]: val } })),
}));
