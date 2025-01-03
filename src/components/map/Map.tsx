'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cityData } from "@/utils/cities";
import { Feature, Geometry } from "geojson";
import { Layer } from 'leaflet';

type RegionProperties = {
  density: number;
  name: string;
};

// Helper function to get color based on density
const getColor = (density: number) => {
  if (density >= 75) return "#1F968BFF"; // Darkest color for highest density
  if (density >= 50) return "#3CBC75FF";
  if (density >= 25) return "#74D055FF";
  return "#94D840FF"; // Lightest color for lowest density
};

// Function to style each region based on its density
const getRegionStyle = (feature?: Feature<Geometry, RegionProperties>) => {
  if (!feature || !feature.properties) {
    return {
      fillColor: "gray",
      weight: 1,
      color: "white",
      fillOpacity: 0.6,
    };
  }
  const density = feature.properties.density;
  return {
    fillColor: getColor(density),
    weight: 1,
    color: "white",
    fillOpacity: 0.6,
  };
};

// Function to handle each feature (adds tooltip)
const onEachFeature = (feature: Feature<Geometry, RegionProperties> | undefined, layer: Layer) => {
  if (!feature || !feature.properties) {
    return;
  }
  const density = feature.properties.density;
  const color = getColor(density);

  // Tooltip content with a colored circle before the city name
  const tooltipContent = `
    <div style="display: flex; align-items: center;">
      <span style="display: inline-block; width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; margin-right: 6px;"></span>
      <strong>${feature.properties.name}</strong><br/>
      Density: ${density}%
    </div>
  `;

  // Bind tooltip to the feature
  layer.bindTooltip(tooltipContent, { direction: "center", permanent: false, opacity: 0.8 });
};

const Map = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Initialize map only if it hasn't been initialized yet
    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        center: [24.7136, 46.6753],
        zoom: 3,
      });

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Add GeoJSON data to the map
      L.geoJSON(cityData, {
        style: getRegionStyle,
        onEachFeature,
      }).addTo(mapRef.current);
    }
  }, []);

  return (
    <>
      <section className="flex flex-col justify-around gap-2">
        {/* Map Section */}
        <div className="w-full bg-white border rounded-lg">
          <div id="map" style={{ height: '250px', width: '100%' }}></div>
        </div>

        {/* List of Cities below the map */}
        <div className="w-full bg-white border rounded-lg p-4 overflow-auto ">
          <ul className="text-xs">
            {cityData.features.map((city) => (
              <li className="flex justify-between border-b my-2" key={city.properties?.name}>
                <span
                  className="inline-block w-[10px] h-[10px] rounded-full"
                  style={{ backgroundColor: getColor(city.properties?.density) }}
                ></span>
                <span>{city.properties?.name}</span>
                <span>{`${city.properties?.density}%`}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Map;
