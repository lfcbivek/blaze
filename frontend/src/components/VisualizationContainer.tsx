import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import { ChartComponent } from "@/common/LineChart";
import { use, useEffect, useState } from "react";
import { SelectScrollable } from "@/common/SelectButton";

export default function VisuzalizationContainer(props: any) {
    const { data, visualization } = props;
    const [chartData, setChartData] = useState([]);
    const [chartTitle, setChartTitle] = useState('');

    const getChartData = (visualizationIdx:number) => {
        const time = visualization[visualizationIdx]['time'];
        const value = visualization[visualizationIdx]['value'];
        const chart = data.map((d: any) => {
            const rawDate = d[time]; // example: "1/1/2022" or "2022-01-01"
            const parsed = new Date(rawDate);
        
            // Ensure it's a valid date
            if (isNaN(parsed.getTime())) {
              console.warn("Invalid date:", rawDate);
              return null;
            }
        
            return {
              time: Math.floor(parsed.getTime() / 1000), // UNIX timestamp (seconds)
              value: Number(d[value])
            };
          })
          .filter(Boolean) // remove nulls
          .sort((a, b) => a.time - b.time) // sort in ascending order by time to render in charts
          .filter((item, i, arr) => i === 0 || item.time !== arr[i - 1].time); // remove duplicates
        
        return chart;
    };

    const getDropdownOptions = () => {
        const dropdownOptions = visualization.map(d => d['title']);
        console.log("dropdown generated");
        console.log(dropdownOptions);
        return dropdownOptions;
    }
    useEffect (() => {
        if (!data || !visualization || visualization.length === 0) return;
        const chart = getChartData(0); // get the first chart
        setChartData(chart);
        setChartTitle(visualization[0]['title']);
    }, [data, visualization]);
    
    const handleChartDropdownChange = (chartLabel:string, newIdx:number) => {
        if (!data || !visualization || visualization.length === 0) return;
        const chart = getChartData(newIdx); // get the first chart
        setChartData(chart);
        setChartTitle(visualization[newIdx]['title']);
    }


    return (
        <Card className="h-100 w-200 relative card">
            <div className="chart-title ml-auto">
                <SelectScrollable 
                    width='350px'
                    dropdownOptions={getDropdownOptions()}
                    chartLabel="Charts"
                    handleDropdownChange={handleChartDropdownChange}
                    selectedTitle={chartTitle}
                />
            </div>        
            {/* <ChartComponent data={data.data}></ChartComponent> */}
            {chartData.length > 0 && 
                <div className="card-content">
                    <CardContent className="p-0 pt-2">
                        <ChartComponent data={chartData}></ChartComponent>
                    </CardContent>
                </div>
            }
        </Card>

    )
}