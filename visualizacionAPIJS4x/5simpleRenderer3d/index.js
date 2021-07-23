import Map from 'https://js.arcgis.com/4.19/@arcgis/core/Map.js'
import SceneView from "https://js.arcgis.com/4.19/@arcgis/core/views/SceneView.js";
import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";
import SceneLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/SceneLayer.js";
import FeatureLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/FeatureLayer.js";
import WebStyleSymbol from "https://js.arcgis.com/4.19/@arcgis/core/symbols/WebStyleSymbol.js";

esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";

const map = new Map({
  basemap: "arcgis-dark-gray", // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
  ground: "world-elevation"
  //ground: "world-topobathymetry"
});

const view = new SceneView({
  container: "viewDiv",
  map: map,
  camera: {
    // Chamartín
    // position: [
    //   -3.6742, //long
    //   40.4770, //lat
    //   865 // meters
    // ],

    // Galicia
    position: [
      -9.1433, //long
      42.9097, //lat
      86 // meters
    ],

    heading: 0, // Orienteación en grados (0-Norte/180-Sur)
    tilt: 10 // Inclinación de la cámara
  }
});

const madrid = new SceneLayer({
  url: 'https://tiles.arcgis.com/tiles/lnFkorfBb3ma2riJ/arcgis/rest/services/EdificiosMadrid_LOD1v2/SceneServer'
})

madrid.renderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: {
    type: "mesh-3d",  // autocasts as new MeshSymbol3D() /// MESH???
    symbolLayers: [{
      type: "fill",  // autocasts as new FillSymbol3DLayer()
      material: { color: "pink" }
    }]
  }
};


const beachLayer = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Playas_2015/FeatureServer/0',
  renderer: {
    type: 'simple',
    symbol: {
      // webstyle https://developers.arcgis.com/javascript/latest/visualization/symbols-color-ramps/esri-web-style-symbols-3d/#basic-shapes
      type: "web-style", // autocasts as new WebStyleSymbol()
      // name: "Chilopsis",
      // styleName: "EsriThematicTreesStyle"

      // styleName: "EsriRealisticTreesStyle"
      
      // ---- Icono 2D ---
      name: "Standing Star",
      styleName: "EsriIconsStyle"
    }
  }
});

map.addMany([madrid, beachLayer]);

view.on('click', () => console.log(view))