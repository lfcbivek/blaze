"use client"
import React, { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DataViewer from "@/components/DataViewer";
import { AppSidebar } from "@/components/AppSidebar";
import { useAppStore } from "@/store/appStore";
import Papa from "papaparse";



// import './page.scss';
export default function DataPage() {
    const file = useAppStore((state) => state.file);
    
    const [data, setData] = useState([]);

    useEffect(() => {
        if(!file) return;

        Papa.parse(file, {
            header: true, // if your CSV has headers
            skipEmptyLines: true,
            complete: (results) => {
              setData(results.data);
            },
            error: (error) => {
              console.error("Error parsing CSV:", error);
            },
        });

    }, [file]);

    return (
        <SidebarProvider>
            <AppSidebar />
                <SidebarTrigger />
                <DataViewer 
                    data={data}
                />
        </SidebarProvider>
    );
}