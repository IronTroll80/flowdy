// components/MapComponent.tsx
"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon broken in webpack
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface Hotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  crowdLevel: "low" | "medium" | "high";
}

interface MapComponentProps {
  hotspots: Hotspot[];
  center?: [number, number];
  zoom?: number;
}

export default function MapComponent({
  hotspots,
  center = [8.4833, 4.5667], // UNILORIN coordinates
  zoom = 15,
}: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Init map
    const map = L.map(containerRef.current).setView(center, zoom);
    mapRef.current = map;

    // Tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add hotspot markers
    hotspots.forEach((spot) => {
      const color =
        spot.crowdLevel === "high"
          ? "#ef4444"
          : spot.crowdLevel === "medium"
          ? "#f59e0b"
          : "#22c55e";

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width: 14px; height: 14px;
          background: ${color};
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(0,0,0,0.4);
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      L.marker([spot.lat, spot.lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${spot.name}</strong><br/>Crowd: ${spot.crowdLevel}`);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}