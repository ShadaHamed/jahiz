// 'use client'

// import React, { createContext, useContext } from 'react';
// import { cityData } from "@/utils/cities"; // import city data
// import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// // Define the context data type
// type MapContextType = {
//   cityData: any;
// };

// const MapContext = createContext<MapContextType | undefined>(undefined);

// export const useMapContext = () => {
//   const context = useContext(MapContext);
//   if (!context) {
//     throw new Error('useMapContext must be used within a MapProvider');
//   }
//   return context;
// };

// // MapProvider component
// export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <MapContext.Provider value={{ cityData }}>
//       {children}
//     </MapContext.Provider>
//   );
// };
