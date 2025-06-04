"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/AppSidebar";
import { appStore } from "@/store/appStore";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


import './page.scss';
export default function DashboardPage() {
    const { kpiData } = appStore();
    console.log("kpi")
    console.log(kpiData);

    return (
        <SidebarProvider>
            <AppSidebar />
                <SidebarTrigger />
                <div className="dashboard-page">
                    <Card className="w-70 h-40 card">
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>
                    <Card className="w-70 h-40 card">
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>
                    <Card className="w-70 h-40 card">
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                    </Card>
                </div>
        </SidebarProvider>
    );
}