'use client'

import BottomNav from "../components/bottomNav";
import FlowPassContent from "../components/flowpassContent";
import Header from "../components/header";
import dynamic from "next/dynamic";



export default function MapPage() {
    return (
        <>
        <Header />
        <FlowPassContent />
        <BottomNav />
        
        </>
    );
}