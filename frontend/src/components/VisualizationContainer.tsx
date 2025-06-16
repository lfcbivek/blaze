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

export default function VisuzalizationContainer(props: any) {
    const data = props.data;
    const vizData = data['totals']
    return (
        <Card className="h-100 w-200 relative card">
            <div className="card-title">
                <CardTitle className="font-normal">Title</CardTitle>
            </div>        
            {/* <ChartComponent data={data.data}></ChartComponent> */}
            <div className="card-content">
                <CardContent className="p-0 pt-2">
                    <ChartComponent data={vizData[1]['data']}></ChartComponent>
                </CardContent>
            </div>
        </Card>

    )
}