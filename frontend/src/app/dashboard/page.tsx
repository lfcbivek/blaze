"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardCards from "@/components/DashboardCards";
import VisuzalizationContainer from "@/components/VisualizationContainer";
import KpiSummary from "@/components/KpiSummary";
import Summary from "@/components/Summary";
import Anamoly from "@/components/Anamoly";
import { AppSidebar } from "@/components/AppSidebar";
import { useAppStore } from "@/store/appStore";



import './page.scss';
export default function DashboardPage() {
    const { kpiData, file, lineChartData, rawData } = useAppStore();
    const visualizationData = kpiData["visualization"];
    console.log('viz ');
    console.log(visualizationData)
    console.log("raw data")
    console.log(rawData);
    return (
        <SidebarProvider>
            <AppSidebar />
                <SidebarTrigger />
                <div className="dashboard-page">
                    <div className="dashboard-cards">
                        <DashboardCards 
                            kpiData={kpiData}
                        />
                    </div>
                    <div className="visualization mt-10">
                        <VisuzalizationContainer 
                            data={rawData}
                            visualization={visualizationData}
                        />
                        <KpiSummary />
                    </div>
                    <div className="data-summary mt-10 mb-10">
                        <Summary />
                        <Anamoly />
                    </div>
                </div>
        </SidebarProvider>
    );
}