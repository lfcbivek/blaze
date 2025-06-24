import { create } from "zustand";

import { AppStoreType } from "@/constants";


export const useAppStore = create<AppStoreType>((set:any) => ({
    file: null,
    setFile: (file: File) => set({ file }),
    clearFile: () => set({file: null}),
    rawData: [],
    setRawData: (data:object) => set({ rawData: data }),
    kpiData: [],
    setKpiData: (data:object) => set({ kpiData: data }),
    lineChartData: [],
    setLineChartData: (data:object) => set({ lineChartData: data})
}));
const storeId = Math.random().toString(36).slice(2, 8);
