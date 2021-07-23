import Map from 'https://js.arcgis.com/4.19/@arcgis/core/Map.js';
import MapView from "https://js.arcgis.com/4.19/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/FeatureLayer.js";
import Legend from "https://js.arcgis.com/4.19/@arcgis/core/widgets/Legend.js";

import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";

esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";

const map = new Map({
    basemap: "arcgis-dark-gray"
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.5134, 34.9904], // long y lat
    zoom: 8
});

const popRenderer = {
    type: 'dot-density',
    dotValue: 100,
    outline: null,
    legendOptions: {
        unit: "people"
    },
    attributes: [
        {
            field: "B03002_003E",
            color: "#f23c3f",
            label: "White (non-Hispanic)"
        },
        {
            field: "B03002_012E",
            color: "#e8ca0d",
            label: "Hispanic"
        },
        {
            field: "B03002_004E",
            color: "#00b6f1",
            label: "Black or African American"
        },
        {
            field: "B03002_006E",
            color: "#32ef94",
            label: "Asian"
        },
        {
            field: "B03002_005E",
            color: "#ff7fe9",
            label: "American Indian/Alaskan Native"
        },
        {
            field: "B03002_007E",
            color: "#e2c4a5",
            label: "Pacific Islander/Hawaiian Native"
        },
        {
            field: "B03002_008E",
            color: "#ff6a00",
            label: "Other race"
        },
        {
            field: "B03002_009E",
            color: "#96f7ef",
            label: "Two or more races"
        }
    ]
};

const populationLayer = new FeatureLayer({ // polígonos
    url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ACS_Population_by_Race_and_Hispanic_Origin_Boundaries/FeatureServer/2/',
    renderer: popRenderer
});

map.add(populationLayer);

view.ui.add(new Legend({ view: view }), 'bottom-right');

// censo 2011 españa

const censusRenderer = {
    type: 'dot-density',
    dotValue: 100,
    outline: null,
    referenceScale: 577790, // 1:577,790 view scale
    legendOptions: {
        unit: "people"
    },
    attributes: [
        {
            field: "Total_Viv_Ppales",
            color: "fuchsia",
            label: "Total viviendas"
        }
    ]
};

const censusLayer = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/viviendas2/FeatureServer/0',
    renderer: censusRenderer
});

map.add(censusLayer);