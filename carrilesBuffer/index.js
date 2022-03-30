var map;
require([
    "esri/map", "esri/layers/FeatureLayer",
    "esri/tasks/query", "esri/geometry/Circle", "esri/symbols/PictureMarkerSymbol",
    "esri/graphic", "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/renderers/SimpleRenderer",
    "esri/config", "esri/Color", "dojo/dom", "dojo/domReady!"
], function (
    Map, FeatureLayer,
    Query, Circle, PictureMarkerSymbol,
    Graphic, SimpleMarkerSymbol,
    SimpleLineSymbol, SimpleFillSymbol, SimpleRenderer,
    esriConfig, Color, dom
) {
    map = new Map("divMap", {
        basemap: "streets-vector",
        center: [-3.696404, 40.438854],
        zoom: 14,
        slider: false
    });

    // Estaciones biciMad
    var estacionesLayer = new FeatureLayer("https://services3.arcgis.com/lnFkorfBb3ma2riJ/arcgis/rest/services/Aparcabicis/FeatureServer/0/", {
        outFields: ["DIRECCION"]
    });

    // Simbología marcado
    var marker = new PictureMarkerSymbol();
    marker.setHeight(15);
    marker.setWidth(20);
    marker.setUrl("http://cdn.onlinewebfonts.com/svg/img_538285.png");
    estacionesLayer.setSelectionSymbol(marker);

    // Make unselected features invisible
    var nullSymbol = new SimpleMarkerSymbol().setSize(0);
    estacionesLayer.setRenderer(new SimpleRenderer(nullSymbol));

    map.addLayer(estacionesLayer);

    var circleSymb = new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_NULL,
        new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
            new Color([105, 105, 105]),
            2
        ), new Color([255, 255, 0, 0.25])
    );
    var circle;

    // When the map is clicked create a buffer around the click point of the specified distance
    map.on("click", function (evt) {
        circle = new Circle({
            center: evt.mapPoint,
            geodesic: true,
            radius: 500,
            radiusUnit: "esriMeters"
        });
        map.graphics.clear();
        var graphic = new Graphic(circle, circleSymb);
        map.graphics.add(graphic);

        var query = new Query();
        query.geometry = circle.getExtent();
        // Use a fast bounding box query. It will only go to the server if bounding box is outside of the visible map.
        estacionesLayer.queryFeatures(query, selectInBuffer);
    });

    function selectInBuffer(response) {
        var feature;
        var features = response.features;
        var inBuffer = [];
        // Filter out features that are not actually in buffer, since we got all points in the buffer's bounding box
        for (var i = 0; i < features.length; i++) {
            feature = features[i];
            if (circle.contains(feature.geometry)) {
                inBuffer.push(feature.attributes[estacionesLayer.objectIdField]);
            }
        }
        var query = new Query();
        query.objectIds = inBuffer;
        // Use an objectIds selection query (should not need to go to the server)
        estacionesLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW);
    }
});