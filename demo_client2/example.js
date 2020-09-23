L.TimeDimension.Layer.WMS.Rasdaman = L.TimeDimension.Layer.WMS.extend({

    _createLayerForTime:function(time){
        var wmsParams = this._baseLayer.options;
        var date = new Date(time);
        wmsParams.time = '"' + date.toISOString() + '"';
        return new this._baseLayer.constructor(this._baseLayer.getURL(), wmsParams);
    }

});

L.timeDimension.layer.wms.rasdaman = function(layer, options) {
    return new L.TimeDimension.Layer.WMS.Rasdaman(layer, options);
};

// example.js
var map = L.map('map', {
    zoom: 8,
    minZoom: 8,
    center: [45.705, 9],
    timeDimension: true,
    timeDimensionOptions: {
        timeInterval: "2020-06-01/2020-06-30",
        period: "P1D"
    },
    timeDimensionControl: true,
});

 var roma40GB = L.CRS.EPSG3003;

var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    

var wmsUrl = "http://10.10.0.28:8081/rasdaman/ows?"
var wmsLayer = L.tileLayer.wms(wmsUrl, {
    layers: 'fwi',
    version:'1.3.0',            
    //tiled: false,
    //opacity: 0.5,
    //identify: false,
    crs:roma40GB,
    styles: 'indici',
    format: 'image/png',
    transparent: true,
    attribution: 'Arpa Lombardia'
});

// Create and add a TimeDimension Layer to the map
var tdWmsLayer = L.timeDimension.layer.wms.rasdaman(wmsLayer);
tdWmsLayer.addTo(map);

