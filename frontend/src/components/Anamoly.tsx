import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

export default function Anamoly() {
    return (
        <Card className="h-100 w-140 relative card">
            <div className="card-title">
                <CardTitle className="font-normal">Anamolies</CardTitle>
            </div>        
            {/* <ChartComponent data={data.data}></ChartComponent> */}
            <div className="card-content">
                <CardContent className="p-0 pt-2">
                    {/* <ChartComponent data={vizData[1]['data']}></ChartComponent> */}
                </CardContent>
            </div>
        </Card>
    )

}