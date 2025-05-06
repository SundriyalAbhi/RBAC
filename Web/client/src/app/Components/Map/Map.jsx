// import React from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// export const Map = () => (
//   <div style={{ backgroundColor: "#0c1b2a", padding: "10px", borderRadius: "10px" }}>
//     <ComposableMap
//       projectionConfig={{ scale: 140 }}
//       style={{ width: "100%", height: "auto" }}
//     >
//       <Geographies geography={geoUrl}>
//         {({ geographies }) =>
//           geographies.map((geo) => (
//             <Geography
//               key={geo.rsmKey}
//               geography={geo}
//               style={{
//                 default: {
//                   fill: "#1f2937",
//                   stroke: "#f59e0b",
//                   strokeWidth: 0.5,
//                 },
//                 hover: {
//                   fill: "#2563eb",
//                   stroke: "#fff",
//                 },
//               }}
//             />
//           ))
//         }
//       </Geographies>
//     </ComposableMap>
//   </div>
// );



"use client"; // If using Next.js App Router

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import L from "leaflet";

export const Map = () => {
  const mapRef = useRef(null);

  // Optional: Fix resizing bug on sidebar toggle
  useEffect(() => {
    const handleResize = () => {
      const map = mapRef.current;
      if (map) {
        map.invalidateSize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        height: "100%",         // Flexible height
        minHeight: "250px",     // Minimum height for small screens
        width: "100%",          // Full width of parent
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#0c1b2a",
      }}
    >
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    </div>
  );
};





