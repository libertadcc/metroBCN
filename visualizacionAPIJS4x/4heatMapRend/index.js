import Map from 'https://js.arcgis.com/4.19/@arcgis/core/Map.js'
import MapView from "https://js.arcgis.com/4.19/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/FeatureLayer.js";
import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";
import Legend from "https://js.arcgis.com/4.19/@arcgis/core/widgets/Legend.js";


esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";

const map = new Map({
    basemap: "topo"
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.5134, 34.9904], // long y lat
    zoom: 7
});



const heatmapRenderer = {
    type: 'heatmap',
    field: 'mag',
    colorStops: [
        { color: "rgba(63, 40, 102, 0)", ratio: 0 },
        { color: "#7139d4", ratio: 0.400 },
        { color: "#ffff00", ratio: 1 }
    ],
    maxPixelIntensity: 25,
    minPixelIntensity: 0
};

const earthquakesLayer = new FeatureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/USGS_Seismic_Data_v1/FeatureServer/0',
    renderer: heatmapRenderer
});

const simpleRenderer = {
    type: "simple",
    symbol: {
        type: "simple-marker",
        color: "fuchsia",
        size: 15
    }
};

map.add(earthquakesLayer);

view.ui.add(new Legend({ view: view }), 'bottom-right');


view.watch("scale", function (newValue) {
    earthquakesLayer.renderer = newValue <= 100000 ? simpleRenderer : heatmapRenderer;
});