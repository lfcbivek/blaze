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
    const { kpiData, file, lineChartData } = useAppStore();
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
                            data={lineChartData}
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