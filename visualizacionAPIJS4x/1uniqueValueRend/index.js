import Map from 'https://js.arcgis.com/4.19/@arcgis/core/Map.js'
import MapView from "https://js.arcgis.com/4.19/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/FeatureLayer.js";
import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";

esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";

const map = new Map({
    basemap: "arcgis-light-gray"
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-3.70325, 40.4167], // long y lat
    zoom: 10
});

const dgtRenderer = {
    type: 'unique-value',
    defaultSymbol: {
        type: 'simple-marker',
        color: 'pink'
    },
    field: 'nivel',
    uniqueValueInfos: [
        {
            value: 'AMARILLO',
            symbol: {
                type: 'simple-marker',
                color: 'yellow'
            }
        },
        {
            value: 'NEGRO',
            symbol: {
                type: 'simple-marker',
                color: 'black'
            }
        },
        {
            value: 'ROJO',
            symbol: {
                type: 'simple-marker',
                color: 'red'
            }
        },
        {
            value: 'VERDE',
            symbol: {
                type: 'simple-marker',
                color: 'green'
            }
        }
    ]
};

const dgtLayer = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/incidencias_DGT/FeatureServer/0',
    renderer: dgtRenderer
});

map.add(dgtLayer);

