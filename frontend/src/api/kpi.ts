import { KPI_URL } from "../constants"; 


export async function fetchKpis() {
    const response = await fetch(KPI_URL);
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = response.json()
    console.log(data);
    return data;
}