import Map from 'https://js.arcgis.com/4.19/@arcgis/core/Map.js'
import MapView from "https://js.arcgis.com/4.19/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/FeatureLayer.js";
import Legend from "https://js.arcgis.com/4.18/@arcgis/core/widgets/Legend.js";
import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";

esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";
const referenceScale = 9244650 * 2;


const renderer = {
    type: "simple",
    symbol: {
        type: "simple-marker",
        path: "M14.5,29 23.5,0 14.5,9 5.5,0z", // Arrow marker defined as SVG path
        color: [50, 50, 50],
        outline: {
            color: [255, 255, 255, 0.5],
            width: 0.5
        },
        angle: 180,
        size: "20px"
    },

    visualVariables: [
        {
            type: "size",
            field: "WIND_SPEED",
            minDataValue: 5,
            maxDataValue: 60,
            minSize: 4,
            maxSize: 24
        }, {
            type: "rotation",
            field: "WIND_DIRECT",
            rotationType: "geographic"
        }
    ]
};

// Set the renderer on the feature layer
const layer = new FeatureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/NOAA_METAR_current_wind_speed_direction_v1/FeatureServer/1',
    title: "Current weather conditions",
    renderer: renderer
});

const map = new Map({
    basemap: 'arcgis-light-gray',
    layers: [layer]
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    scale: referenceScale,
    center: [-95, 38.5],
});

view.ui.add(new Legend({
    view: view
}), "top-right");
