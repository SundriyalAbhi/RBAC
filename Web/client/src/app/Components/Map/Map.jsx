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


"use client"; // If you're using Next.js App Router

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export const Map = () => {
  useEffect(() => {
    import("leaflet/dist/leaflet.css");
  }, []);

  return (
    <div
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#0c1b2a", // fallback background
      }}
    >
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Dark tile layer with country outlines */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    </div>
  );
};




