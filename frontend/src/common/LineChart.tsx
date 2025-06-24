
import { AreaSeries, createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {
    const {
        data,
        colors: {
            backgroundColor = '#f9f9f9f9',
            lineColor = '#9575CD',
            textColor = 'black',
            areaTopColor= 'rgba(149, 117, 205, 0.5)',   // 50% opacity of line color
            areaBottomColor= 'rgba(149, 117, 205, 0.05)',
        } = {},
    } = props;
    console.log("chart data")
    console.log(data)
    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: 700,
                height: 300,
                rightPriceScale: {
                    visible: true,
                },
                timeScale: {
                    visible: true,
                },
                grid: {
                    vertLines: { visible: true },
                    horzLines: { visible: true },
                },
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addSeries(AreaSeries, { lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};