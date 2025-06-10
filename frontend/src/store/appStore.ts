import { create } from "zustand";

import { AppStoreType } from "@/constants";


console.log("zustanddddd")
export const useAppStore = create<AppStoreType>((set) => ({
    file: null,
    setFile: (file: File) => set({ file }),
    clearFile: () => set({file: null}),
    kpiData: [],
    setKpiData: (data) => set({ kpiData: data })
}));
const storeId = Math.random().toString(36).slice(2, 8);
console.log('🧠 Zustand store ID:', storeId);
