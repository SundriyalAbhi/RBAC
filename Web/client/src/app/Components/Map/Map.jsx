"use client";

import { useState } from "react";
import WorldMap from "react-svg-worldmap";

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
        cursor: "pointer",
      }
    : {
        width: "100%",
        height: "400px",
        borderRadius: "12px",
        backgroundColor: "#0c1b2a",
        overflow: "hidden",
        cursor: "pointer",
      };

  const data = [
    { country: "cn", value: 1389618778 },
    { country: "in", value: 1311559204 },
    { country: "us", value: 331883986 },
    { country: "id", value: 264935824 },
    { country: "pk", value: 210797836 },
    { country: "br", value: 210301591 },
    { country: "ng", value: 208679114 },
    { country: "bd", value: 161062905 },
    { country: "ru", value: 141944641 },
    { country: "mx", value: 127318112 },
  ];

  return (
    <div style={containerStyles} onClick={() => setIsOpen(!isOpen)}>
      <WorldMap
        title="Global Data Overview"
        valueSuffix=" people"
        color="#ff4c4c"
        //  color="#ef4444"
        backgroundColor="#0c1b2a"
//         title="Global Data Overview"
        size="responsive"
        data={data}
        style={{ width: "100%", height: "100%" }}
        onClickFunction={(event) =>
          alert(`${event.countryName} has ${event.value} people.`)
        }
      />
    </div>
  );
};


// // "use client";

// import WorldMap from "react-svg-worldmap";

// export const Map = () => {
//   const data = [
//     { country: "cn", value: 1389618778 },
//     { country: "in", value: 1311559204 },
//     { country: "us", value: 331883986 },
//     { country: "id", value: 264935824 },
//     { country: "pk", value: 210797836 },
//     { country: "br", value: 210301591 },
//     { country: "ng", value: 208679114 },
//     { country: "bd", value: 161062905 },
//     { country: "ru", value: 141944641 },
//     { country: "mx", value: 127318112 },
//   ];

//   return (
//     <div className="w-full h-full">
//       <WorldMap
//         color="#ef4444"
//         backgroundColor="#0c1b2a"
//         title="Global Data Overview"
//         size="responsive"
//         value-suffix=" people"
//         data={data}
//       />
//     </div>
//   );
// };

