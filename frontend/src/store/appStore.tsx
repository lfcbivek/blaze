import { create } from "zustand";


type Kpi = {
    totals: any[];
}

type AppStore = {
    kpiData: Kpi[];
    setKpiData: (data: Kpi[]) => void;
}

export const appStore = create<AppStore>((set) => ({
    kpiData: [],
    setKpiData: (data) => set({ kpiData: data })
}));
