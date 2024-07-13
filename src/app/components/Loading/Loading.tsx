import React from "react";

export default function Loading() {
    return (
        <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
            <div
                className="p-2 bg-gradient-to-tr animate-spin from-pri to-sec via-inf rounded-full">
                <div className="bg-white rounded-full">
                    <div className="w-24 h-24 rounded-full">
                    </div>
                </div>
            </div>
        </div>
    );
}