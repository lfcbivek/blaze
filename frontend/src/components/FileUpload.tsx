import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";
import FileUploadButton from "./FileUploadButton";

import './FileUpload.scss';
export default function FileUpload() {
    return (
        <div className="FileUpload">
            
            <Card>
                <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
                    <div>
                        <ArrowUpTrayIcon className="w-40 h-40" />
                    </div>
                    <FileUploadButton />
                </CardContent>
            </Card>

        </div>
    )
}