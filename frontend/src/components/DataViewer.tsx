import React from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table';

import './DataViewer.scss';
    
const columnHelper = createColumnHelper<any>();

const generateColumns = (data: any[]) => {
    if (!data.length) return [];
    return Object.keys(data[0]).map((key) =>
        columnHelper.accessor(key, {
            header: () => key.charAt(0).toUpperCase() + key.slice(1),
            cell: (info) => info.getValue(),
        })
    );
};


export default function DataViewer(props) {
    const data = props.data;

    const columns = generateColumns(data);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

        
    return (
        <div>
            <h2>Data Viewer</h2>
            <div className="data-viewer p-2">
                <table>
                    <thead className="bg-gray-100 text-xs font-semibold text-gray-700 uppercase">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {table.getRowModel().rows.map((row, i) => (
                            <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border-r border-gray px-4 py-2">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}