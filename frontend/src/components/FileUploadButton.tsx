"use client";

import React, { useRef, useState } from "react";
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

export default function FileUploadButton() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { showLoader, hideLoader } = useLoaderStore();
    const [dragging, setDragging] = useState(false);

    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    const onFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            console.log("Files selected:", files);
            // TODO: handle files here, e.g., upload or process
        }
        showLoader();
        await new Promise((res) => setTimeout(res, 2000)); // simulate delay
        hideLoader();
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
                className={`border-2 rounded-md transition-colors duration-300
                    ${dragging ? "border-blue-500" : "border-gray-400"}`}
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
                        className="cursor-pointer bg-white text-black hover:bg-white" 
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