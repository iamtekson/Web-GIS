var map = L.map('map', {
    zoomControl: false,
    // measureControl: true,
}).setView([28.2521, 83.9774], 18);
var scale = L.control.scale().addTo(map);

// leaflet controls
$('.zoom-in').click(function () {
    map.setZoom(map.getZoom() + 1)
});

$('.zoom-out').click(function () {
    map.setZoom(map.getZoom() - 1)
});
$('.extend').click(function () {
    map.setView([28.2521, 83.9774], 18);
});

function fullScreenTgl() {
    let doc = document, elm = doc.documentElement;
    if (elm.requestFullscreen) { (!doc.fullscreenElement ? elm.requestFullscreen() : doc.exitFullscreen()) }
    else if (elm.mozRequestFullScreen) { (!doc.mozFullScreen ? elm.mozRequestFullScreen() : doc.mozCancelFullScreen()) }
    else if (elm.msRequestFullscreen) { (!doc.msFullscreenElement ? elm.msRequestFullscreen() : doc.msExitFullscreen()) }
    else if (elm.webkitRequestFullscreen) { (!doc.webkitIsFullscreen ? elm.webkitRequestFullscreen() : doc.webkitCancelFullscreen()) }
    else { console.log("Fullscreen support not detected."); }
}

//View in full screen function
$('.full-browser').click(fullScreenTgl);

// content
$('.options').click(function () {
    $('.toggle-content').toggle();
});


//show coordinate in footer
function latlng() {
    map.on('mousemove', function (e) {
        return $('.latlng').text("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    });
    setTimeout(latlng, 1000);
}
latlng();


//print dialog box
// $(function() {
//     $('#print').dialog({
//         width: 800,
//         height: 500,
//     });
// });


var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 19,
    ext: 'jpg'
});

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
});

var mapBox = L.tileLayer('https://api.tiles.mapbox.com/styles/v1/{username}/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    username: 'iamtekson',
    id: 'cjwhym7s70tae1co8zf17a3r5',
    accessToken: 'pk.eyJ1IjoiaWFtdGVrc29uIiwiYSI6ImNqdjV4YzI4YjB0aXk0ZHBtNnVnNWxlM20ifQ.FjQJyCTodXASYtOK8IrLQA'
});

var baseLayer = {
    'Open Street Map': osm,
    'Open Topo Map': OpenTopoMap,
    'Stamen Water color': Stamen_Watercolor,
    'Dark matter': CartoDB_DarkMatter,
    'Map Box': mapBox
}
// L.control.layers(baseLayer).addTo(map);

// Add the marker on map
function clickMarker() {
    map.on('click', function (e) {
        var mp = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    });
};
function clearMarker() {
    $('.fa-map-marker-alt').off('click');
};
$('.fa-map-marker-alt').click(clickMarker);

//Street light control
var s_light_style = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var light1 = L.geoJSON(street, {
    onEachFeature: function (feature, layer) {
        // var popupContent = '<h4 class = "text-primary">Street Light</h4>' +
        //     '<div class="container"><table class="table table-striped">' +
        //     '<thead><tr><th>Properties</th><th>Value</th></tr></thead>' +
        //     '<tbody><tr><td> Name </td><td>' + feature.properties.Name + '</td></tr>' +
        //     '<tr><td>Elevation </td><td>' + feature.properties.ele + '</td></tr>' +
        //     '<tr><td> Power (watt) </td><td>' + feature.properties.Power_Watt + '</td></tr>' +
        //     '<tr><td> Pole Height </td><td>' + feature.properties.pole_hgt + '</td></tr>' +
        //     '<tr><td> Time </td><td>' + feature.properties.time + '</td></tr>';
        // layer.bindPopup(popupContent),
        layer.on({
            click: function(e) {
                $('.addsidebar-popup').slideDown();
                $('.lat').html('<b>Latitude : </b>'+ e.latlng.lat);
                $('.long').html('<b>longitude : </b>' + e.latlng.lng);
                $('.sidebar-info').html('<h4 class = "text-primary">Street Light</h4>' +
                '<div class="container"><table class="table table-striped">' +
                '<thead><tr><th>Properties</th><th>Value</th></tr></thead>' +
                '<tbody><tr><td> Name </td><td>' + feature.properties.Name + '</td></tr>' +
                '<tr><td>Elevation </td><td>' + feature.properties.ele + '</td></tr>' +
                '<tr><td> Power (watt) </td><td>' + feature.properties.Power_Watt + '</td></tr>' +
                '<tr><td> Pole Height </td><td>' + feature.properties.pole_hgt + '</td></tr>' +
                '<tr><td> Time </td><td>' + feature.properties.time + '</td></tr>');
            }
        }); 
    },
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, s_light_style);
    }
});

var light = L.markerClusterGroup().addLayer(light1);


// map.addLayer(light);
light.addTo(map);
var streetLight = new L.layerGroup().addLayer(light);
var overlays = {
    'Street Lights': streetLight,
}

//Layer control
L.control.layers(baseLayer, overlays).addTo(map);


// print function
L.control.browserPrint({
    title: 'Print current Layer',
    documentTitle: 'Utility Management System',
    printModes: [
        L.control.browserPrint.mode.landscape("Tabloid VIEW", "Tabloid"),
        L.control.browserPrint.mode.landscape(),
        "PORTrait",
        L.control.browserPrint.mode.auto("Auto", "B4"),
        L.control.browserPrint.mode.custom("Selected area", "B5")
    ],
    manualMode: false,
    closePopupsOnPrint: true, //default value
}).addTo(map);

$('.print').click(function () {
    var modeToUse = L.control.browserPrint.mode.landscape();
    map.printControl.print(modeToUse);
});








//Add vector layer functionality
$('.addVectorLayer_btn').click(function(){
    $('.addVectorLayer').toggle();
});

map.on('click', function() {
    $('.addVectorLayer').hide();
});

// $('#input_files').change(function() {
//     $('.vector').submit();
//   });

  var fileInput = document.getElementById('input_files');

  function geojsonData() {
    fileInput.addEventListener('change', function(event) {
        var file = fileInput.files[0],
        fr = new FileReader();
        fileInput.value = ''; // Clear the input.
        fr.onload = function() {
        console.log(fr.result);
        var layer = omnivore.geojson(fr.result).addTo(map); // Executed synchronously, so no need to use the .on('ready') listener.
        map.fitBounds(layer.getBounds());
    };
    fr.readAsDataURL(file);
  });
  };

  function csvData() {
    fileInput.addEventListener('change', function(event) {
        var file = fileInput.files[0],
        fr = new FileReader();
        fileInput.value = ''; // Clear the input.
        fr.onload = function() {
        console.log(fr.result);
        var layer = omnivore.csv.parse(fr.result).addTo(map); // Executed synchronously, so no need to use the .on('ready') listener.
        map.fitBounds(layer.getBounds());
    };
    fr.readAsText(file);
  });
  };

//   $(fileInput).change(function(e){
//     var fileName = e.target.files[0].name;
//     console.log(fileName);
//     if(fileName.endsWith("csv")) {
//         csvData();
//     } else {
//         geojsonData();
//     }
// });
geojsonData();

// omnivore.csv('a.csv').addTo(map);
// omnivore.gpx('a.gpx').addTo(map);
// omnivore.kml('a.kml').addTo(map);
// omnivore.wkt('a.wkt').addTo(map);
// omnivore.topojson('a.topojson').addTo(map);
// omnivore.geojson('data/try.geojson').addTo(map);
// omnivore.polyline('a.txt').addTo(map);




//Leaflet measure
$(".measure-btn").click(function() {
    $(".leaflet-control-measure").toggle();
    $('.leaflet-control-measure-interaction').show();
    $('.leaflet-control-measure-toggle').hide();
});

$('.js-cancel').click(function(){
    $(".leaflet-control-measure").hide();
});

$('.js-finish').click(function () {
    $(".leaflet-control-measure").hide();
  });

  var measureControlOption = {
    primaryLengthUnit: 'meters', 
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters', 
    secondaryAreaUnit: undefined,
    activeColor: '#ed3833',
    completedColor: '#63aabc',
  }
  var measureControl = L.control.measure(measureControlOption);
    measureControl.addTo(map);


// Info tool
$('.fa-info-circle').click(function(){
        $('*').toggleClass('help');
});












// sidebar-popup
$('.sidebar-close').click(function(){
    $('.addsidebar-popup').hide();
});


