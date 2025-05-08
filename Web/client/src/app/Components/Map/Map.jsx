"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

export const Map = () => {
  const [isOpen, setIsOpen] = useState(false);

  const containerStyles = isOpen
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        background: "#0c1b2a",
        padding: "1rem",
      }
    : {
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        backgroundColor: "#0c1b2a",
        overflow: "hidden",
      };

  return (
    <div style={containerStyles} onClick={() => setIsOpen(!isOpen)}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    </div>
  );
};
