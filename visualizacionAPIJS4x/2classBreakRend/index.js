import Map from 'https://js.arcgis.com/4.19/@arcgis/core/Map.js'
import MapView from "https://js.arcgis.com/4.19/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/FeatureLayer.js";
import Legend from "https://js.arcgis.com/4.19/@arcgis/core/widgets/Legend.js";

import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";

esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";

const map = new Map({
    basemap: "arcgis-light-gray"
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-122.3487846, 47.58907],
    zoom: 11
});

const less35 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#fffcd4",
    style: "solid",
    outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5]
    }
};

const less50 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#b1cdc2",
    style: "solid",
    outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5]
    }
};

const more50 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#38627a",
    style: "solid",
    outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5]
    }
};

const more75 = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#0d2644",
    style: "solid",
    outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5]
    }
};


const renderer = {
    type: "class-breaks", // autocasts as new ClassBreaksRenderer()
    field: "COL_DEG",
    normalizationField: "EDUCBASECY",
    legendOptions: {
        title: "% of adults (25+) with a college degree"
    },
    defaultSymbol: {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "black",
        style: "backward-diagonal",
        outline: {
            width: 0.5,
            color: [50, 50, 50, 0.6]
        }
    },
    defaultLabel: "no data",
    classBreakInfos: [
        {
            minValue: 0,
            maxValue: 0.3499,
            symbol: less35,
            label: "< 35%"
        },
        {
            minValue: 0.35,
            maxValue: 0.4999,
            symbol: less50,
            label: "35 - 50%"
        },
        {
            minValue: 0.5,
            maxValue: 0.7499,
            symbol: more50,
            label: "50 - 75%"
        },
        {
            minValue: 0.75,
            maxValue: 1.0,
            symbol: more75,
            label: "> 75%"
        }
    ]
};


const educationLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Puget_Sound_BG_demographics/FeatureServer/0',
    renderer
});

map.add(educationLayer);


const legend = new Legend({
    view: view
});

view.ui.add(legend, "bottom-left");