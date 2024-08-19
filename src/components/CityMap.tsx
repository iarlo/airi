import { defaults, PinchZoom } from 'ol/interaction';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map.js';
import { OSM } from 'ol/source';
import View from 'ol/View.js';
import { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const view = new View({
      center: [-4394823.365239241, -1100081.7091714295],
      zoom: 0,
      extent: [-4396839.404906, -1101753.771074, -4393629.049718, -1099154.912112],
    });

    const map = new Map({
      target: 'map',
      layers: [osmLayer],
      interactions: defaults({}).extend([new PinchZoom()]),
      view,
    });
    return () => map.setTarget();
  }, []);
  return (
    <div
      style={{ height: 'calc(100% + 32px)', width: 'calc(100% + 32px)', margin: '-16px' }}
      id="map"
      className="map-container"
    />
  );
};

export default MapComponent;
