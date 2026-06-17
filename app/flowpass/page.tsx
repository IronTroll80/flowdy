'use client'

import BottomNav from "../components/bottomNav";
import Header from "../components/header";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../components/mapComponent"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-xl" />,
});


export default function MapPage() {
    return (
        <>
        
        <Header />
        <div className="w-full h-[400px] rounded-xl overflow-hidden">
        <MapComponent
            hotspots={[
            { id: "1", name: "Faculty of Engineering", lat: 8.4841, lng: 4.5672, crowdLevel: "high" },
            { id: "2", name: "University Library", lat: 8.4829, lng: 4.5661, crowdLevel: "medium" },
            { id: "3", name: "Student Union", lat: 8.4855, lng: 4.5680, crowdLevel: "low" },
            ]}
        />
        </div>
        <BottomNav />
        
        </>
    );
}