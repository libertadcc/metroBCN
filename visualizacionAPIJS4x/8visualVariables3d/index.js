import Map from 'https://js.arcgis.com/4.19/@arcgis/core/Map.js'
import SceneView from "https://js.arcgis.com/4.19/@arcgis/core/views/SceneView.js";
import FeatureLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/FeatureLayer.js";
import Legend from "https://js.arcgis.com/4.18/@arcgis/core/widgets/Legend.js";
import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";

esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";


const renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
        type: "web-style", // autocasts as new WebStyleSymbol()
        styleName: "esriRealisticTreesStyle",
        name: "Other"
    },
    label: "tree",
    visualVariables: [
        {
            type: "size",
            axis: "height",
            field: "Height",
            valueUnit: "feet"
        },
        {
            type: "color",
            field: "C_Storage", // Carbon storage
            stops: [
                {
                    value: 0, // features with zero carbon
                    color: "#f7fcb9"
                }, 
                {
                    value: 10000,
                    color: "#31a354"
                }
            ],
            legendOptions: {
                title: "Carbon Storage"
            }
        }
    ]
};

// https://www.arcgis.com/home/item.html?id=9e042400ee234459bd352f430b5264e6
const treesLayer = new FeatureLayer({
    url:
        "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
    renderer: renderer,
    outFields: ["*"],
    popupTemplate: { // autocasts as new PopupTemplate()
        title: "{Cmn_Name}",
        content:
            "<i>{Sci_Name}</i><br>" +
            "This tree is in {Condition} condition and is {Height} feet in height."
    }
});

const map = new Map({
    basemap: "osm",
    ground: "world-elevation",
    layers: [treesLayer]
});

const view = new SceneView({
    container: "viewDiv",
    map: map,
    camera: {
        position: {
            x: -9177356,
            y: 4246783,
            z: 723,
            spatialReference: {
                wkid: 3857
            }
        },
        heading: 0,
        tilt: 83
    }
});

const legend = new Legend({
    view: view
});
view.ui.add(legend, "top-right");
