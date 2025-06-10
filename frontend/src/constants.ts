export const BASE_URL = "http://localhost:8000";
export const KPI_URL = BASE_URL+"/get-kpi-data";
export const ANALYZE_URL = BASE_URL+"/analyze-file";





export type KpiType = {
    totals: any[];
};

export type AppStoreType = {
    file: File | null,
    setFile: (file: File) => void,
    kpiData: KpiType[];
    setKpiData: (data: KpiType[]) => void;
};

export type DataPoint = {
    time: Time;
    value: number;
};
  
export type LineChartProps = {
    data: DataPoint[];
};