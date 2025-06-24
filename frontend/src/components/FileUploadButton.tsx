"use client";

import React, { useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useLoaderStore } from "@/store/loaderStore";
import { fetchKpiData, fetchKpis } from "@/api/kpi";
import { useAppStore } from '@/store/appStore';

import Papa from 'papaparse';

export default function FileUploadButton() {
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { showLoader, hideLoader } = useLoaderStore();
    const [dragging, setDragging] = useState(false);
    const { setKpiData, setFile, setLineChartData, setRawData } = useAppStore();
    
    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    const getRawData = (file: File) => {
        Papa.parse(file, {
            header: true, // converts rows to objects using the first row as keys
            skipEmptyLines: true,
            complete: function (results: object) {
              setRawData(results.data);
            },
          });
    }

    const onFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            showLoader();
            // TODO: handle files here, e.g., upload or process
            getRawData(files[0])
            const analyzedData = await fetchKpiData(files);
            const response = await fetchKpis();

            setFile(files[0]);
            setKpiData(analyzedData);
            setLineChartData(response);
            
            hideLoader();
            router.push("/dashboard");
        }
        
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
      };
    
    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
    };
    
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            console.log("Files dropped:", files);
            // Add your upload or processing logic here
        }
    };

    return (
        <div className="pt-10 w-100">
            <Card
                className={`rounded-md transition-colors duration-300
                    ${dragging ? "border-blue-500" : ""}`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={onFileChange}
                    accept=".xls,.csv"
                />
                <CardContent 
                    className={`flex flex-col items-center justify-center gap-10`}
                    onClick={onButtonClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <h3 className={dragging ? "text-blue-600" : ""}> Drag and Drop your files here, or </h3>
                    <Button 
                        className="cursor-pointer border-black" 
                        onClick={(e) => {
                            e.stopPropagation(); // prevent triggering CardContent onClick twice
                            onButtonClick();
                        }}
                    >
                        Upload File
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}