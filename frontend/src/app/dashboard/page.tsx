"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardCards from "@/components/DashboardCards";
import { AppSidebar } from "@/components/AppSidebar";
import { useAppStore } from "@/store/appStore";



import './page.scss';
export default function DashboardPage() {
    const { kpiData, file } = useAppStore();
    return (
        <SidebarProvider>
            <AppSidebar />
                <SidebarTrigger />
                <div className="dashboard-page">
                    <DashboardCards 
                        kpiData={kpiData}
                    />
                </div>
        </SidebarProvider>
    );
}