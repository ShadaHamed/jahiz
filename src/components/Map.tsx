import {cityData} from "@/utils/cities"
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { color } from "chart.js/helpers";

const getColor = (density:number) => {
  if (density >= 75) return "#1F968BFF"; // Darkest color for highest density
  if (density >= 50) return "#3CBC75FF";
  if (density >= 25) return "#74D055FF";
  return "#94D840FF"; // Lightest color for lowest density
};

// Define a function to style each feature based on its density
const getRegionStyle = (feature:any) => {
  const density = feature.properties.density;

  // Choose color based on density
  let fillColor;
  if (density >= 75) fillColor = "#1F968BFF"; // Darkest color for highest density
  else if (density >= 50) fillColor = "#3CBC75FF";
  else if (density >= 25) fillColor = "#74D055FF";
  else fillColor = "#94D840FF"; // Lightest color for lowest density

  return {
    fillColor,
    weight: 1,
    color: "white",
    fillOpacity: 0.6,
  };
};

const onEachFeature = (feature:any, layer:any) => {
  const density = feature.properties.density;
  let color = getColor(density);

  // Create tooltip content with a colored circle before the city name
  const tooltipContent = `
    <div style="display: flex; align-items: center;">
      <span style="display: inline-block; width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; margin-right: 6px;"></span>
      <strong>${feature.properties.name}</strong><br/>
      Density: ${density}%
    </div>
  `;

  // Bind the tooltip to each feature
  layer.bindTooltip(tooltipContent, { direction: "center", permanent: false, opacity: 0.8 });

};

const Map = () => {
  return (
    <>
    <h1 className="text-xl font-bold my-4 ms-4">Orders By Cities</h1>
    <div className="flex">
      {/* List of cities */}
      <div className="w-1/3 me-4">
        <ul className="text-xs my-4 ms-4">
          {cityData.features.map((city) =>
           (
            <li className="flex justify-between border-b my-2" key={city.properties?.name}>
              <span className={`inline w-[10px] h-[10px] rounded-lg ms-[6px]`} style={{ backgroundColor: getColor(city.properties?.density) }}></span>
              <span>{city.properties?.name}</span>
              <span>{`${city.properties?.density}%`}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Map section */}
      <div className="w-2/3 me-2">
      <MapContainer center={[24.7136, 46.6753]} zoom={3} style={{ height: '200px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render GeoJSON data */}
      <GeoJSON data={cityData} style={getRegionStyle} onEachFeature={onEachFeature} />
    </MapContainer>
      </div>
    </div>
  </>  )
}

export default Map


