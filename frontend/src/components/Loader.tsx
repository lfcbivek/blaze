'use client';

import { useLoaderStore } from "@/store/loaderStore";

export default function Loader() {
    const loading = useLoaderStore((state) => state.loading);

    if (!loading) return null;

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="p-4 bg-white rounded shadow border-2 border-gray-500">
        <div className="animate-spin h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full shadow-lg shadow-blue-400/30"></div>
        <p className="mt-2 text-center text-black">Loading...</p>
        </div>
    </div>
    );
}