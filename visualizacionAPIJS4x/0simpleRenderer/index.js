import Map from 'https://js.arcgis.com/4.19/@arcgis/core/Map.js'
import MapView from "https://js.arcgis.com/4.19/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/FeatureLayer.js";
import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";

esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";

// incidencias DGT: https://www.arcgis.com/home/item.html?id=a64659151f0a42c69a38563e9d006c6b
// playas: https://www.arcgis.com/home/item.html?id=84ddbc8cf4104a579d579f6441fcaa8a

const map = new Map({
    basemap: "arcgis-dark-gray" // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-8.710888, 42.317804], // long y lat
    zoom: 10
});

const beachRenderer = {
    type: 'simple',
    symbol:
    // simple marker
    {
        type: "simple-marker",
        outline: { color: [255, 255, 255, 1] },
        angle: -52,
        size: 8,
        color: [40, 16, 229, 0.91]
    }

    // picture marker
    // { //https://img.icons8.com/bubbles/2x/4a90e2/beach.png
    //     type: "picture-marker",
    //     url: "https://img.icons8.com/bubbles/2x/4a90e2/beach.png",
    //     width: 200,
    //     height: 200
    //   }
};

const beachLayer = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Playas_2015/FeatureServer/0',
    renderer: beachRenderer
});

const railwayRenderers = {
    type: 'simple',
    symbol: {
        type: "simple-line",
        style: "dot",
        width: 1.25,
        color: [238, 37, 37, 1]
    }
}

const railwayNetworkLayer = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/RedFerrocarrilesIGN/FeatureServer/1',
    renderer: railwayRenderers
});

const provRenderer = {
    type: 'simple',
    symbol: {
        type: "simple-fill",
        outline: { width: 2, color: [205, 206, 3, 1] },
    }
};

const provLayer = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/CCAA_wgs1984_wm/FeatureServer/0',
    renderer: provRenderer
});

map.addMany([provLayer, railwayNetworkLayer, beachLayer]);