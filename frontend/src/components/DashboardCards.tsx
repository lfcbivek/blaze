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

import './DashboardCards.scss';

type DashboardCardsProps = {
    kpiData: KpiType[];
}
export default function DashboardCards(props: DashboardCardsProps) {
    const { kpiData } = props;


    const tempData = [
        { time: '2024-01-01', value: 120 },
        { time: '2024-01-02', value: 130 },
        { time: '2024-01-03', value: 125 },
        { time: '2024-01-04', value: 140 },
    ];
    return (
        <div className="dashboard-cards">
            {kpiData['totals'].map(data => (
                <div key={data.title} className="cards">
                    <Card className="h-40 w-70 relative card">
                        <div className="card-title">
                                <CardTitle className="font-normal">{ data.title }</CardTitle>
                            <div className="pt-2">
                                <SelectScrollable />
                            </div>
                        </div>        
                        {/* <ChartComponent data={data.data}></ChartComponent> */}
                        <div className="card-content">
                            <CardContent className="p-0 pt-2">
                                <p className="text-3xl font-bold text-gray-900">{ data.total }</p>
                            </CardContent>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
    
}