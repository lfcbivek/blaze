import { useState, useRef } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { KpiType } from "@/constants";
import { ChartComponent } from '@/common/LineChart';
import { v4 as uuidv4 } from 'uuid';
import { SelectScrollable } from "@/common/SelectButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

import './DashboardCards.scss';

type DashboardCardsProps = {
    kpiData: KpiType[];
}
export default function DashboardCards(props: DashboardCardsProps) {
    const { kpiData } = props;
    const kpi = kpiData["kpi"];
    const columns = Object.keys(kpi);

    const defaultCardIndex = {};
    columns.forEach(col => defaultCardIndex[col] = 0);


    const [cardIndex, setCardIndex] = useState(defaultCardIndex);

    const endCardIndex = columns.length >= 3 ? 2 : columns.length-1;
    const [cardStartIdx, setCardStartIdx] = useState(0);
    const [cardEndIdx, setCardEndIdx] = useState(endCardIndex);

    const scrollRef = useRef(null);

    const scroll = (direction:string) => {
        if (direction === 'left') {
            if (cardStartIdx === 0) return;
            // Move one card to the left
            setCardStartIdx(cardStartIdx-1);
            // End card is also one step left
            setCardEndIdx(cardEndIdx-1);
        } else {
            if(cardEndIdx === columns.length-1) return;
            // Move one card to the right
            setCardStartIdx(cardStartIdx+1);
            // End card is also one step right
            setCardEndIdx(cardEndIdx+1);
        }
    };

    const handleDropdownChange = (col:string, newIdx:number) => {
        console.log("handleDropdownChange")
        setCardIndex({
            ...cardIndex,
            [col]: newIdx
        })
    }
    console.log(cardIndex)
    const tempData = [
        { time: '2024-01-01', value: 120 },
        { time: '2024-01-02', value: 130 },
        { time: '2024-01-03', value: 125 },
        { time: '2024-01-04', value: 140 },
    ];
    return (
        <div className="relative w-full dashboard-cards">
            <button
                type="button"
                onClick={(e) => { 
                    e.preventDefault();
                    scroll('left')
                }}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 shadow-md rounded-full"
            >
                <ChevronLeft />
            </button>
            <button
                type="button"
                onClick={(e) => { 
                    e.preventDefault();
                    scroll('right')
                }}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 shadow-md rounded-full"
            >
                <ChevronRight />
            </button>
            <div
                ref={scrollRef} 
                className="cards flex ml-20 mr-20">
                    {columns.slice(cardStartIdx, cardEndIdx+1).map(column => (
                        <div key={column} className="flex-none w-[320px]">
                            <Card className="h-45 w-full relative card">
                                <div className="card-title">
                                        <CardTitle className="font-normal">{ column }</CardTitle>
                                    <div className="pt-2">
                                        <SelectScrollable 
                                            data={kpi[column]}
                                            column={column}
                                            handleDropdownChange={handleDropdownChange}
                                        />
                                    </div>
                                </div>        
                                {/* <ChartComponent data={data.data}></ChartComponent> */}
                                <div className="card-content">
                                    <CardContent className="p-0 pt-2">
                                        <p className="text-3xl font-bold text-gray-900">{kpi[column][cardIndex[column]]['prefix_symbol']}{kpi[column][cardIndex[column]]['value'].toFixed(2)}</p>
                                    </CardContent>
                                </div>
                            </Card>
                        </div>
                    ))}
            </div>
        </div>
    );
    
}