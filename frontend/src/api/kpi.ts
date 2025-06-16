import { ANALYZE_URL, KPI_URL } from "../constants"; 


export async function fetchKpis() {
    const response = await fetch(KPI_URL);
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = response.json()
    return data;
}

export async function fetchKpiData(files: FileList): Promise<any> {
    const formData = new FormData();
    formData.append('file', files[0]);

    try {
        const response = await fetch(ANALYZE_URL, {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Failed to fetch CSV analysis:', error);
        throw error;
      }
}