import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import './styles.css'

mapboxgl.accessToken =
    "pk.eyJ1Ijoicm9ibGFicyIsImEiOiJwVlg0cnZnIn0.yhekddtKwZohGoORaWjqIw";

let map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v9", // stylesheet location
    center: [-64.75, 32.3], // starting position [lng, lat]
    zoom: 10 // starting zoom
});
console.log('test')
// Original ES6 Class— https://github.com/tobinbradley/mapbox-gl-pitch-toggle-control
// export default class PitchToggle {
class PitchToggle {
    constructor({ bearing = -20, pitch = 70, minpitchzoom = null }) {
        this._bearing = bearing;
        this._pitch = pitch;
        this._minpitchzoom = minpitchzoom;
    }

    onAdd(map) {
        this._map = map;
        let _this = this;

        this._btn = document.createElement("button");
        this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
        this._btn.type = "button";
        this._btn["aria-label"] = "Toggle Pitch";
        this._btn.onclick = function() {
            if (map.getPitch() === 0) {
                let options = { pitch: _this._pitch, bearing: _this._bearing };
                if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
                    options.zoom = _this._minpitchzoom;
                }
                map.easeTo(options);
                _this._btn.className =
                    "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d";
            } else {
                map.easeTo({ pitch: 0, bearing: 0 });
                _this._btn.className =
                    "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
            }
        };

        this._container = document.createElement("div");
        this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
        this._container.appendChild(this._btn);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

/* Idea from Stack Overflow https://stackoverflow.com/a/51683226  */
class MapboxGLButtonControl {
    constructor({
                    className = "",
                    title = "",
                    eventHandler = evtHndlr
                }) {
        this._className = className;
        this._title = title;
        this._eventHandler = eventHandler;
    }

    onAdd(map) {
        this._btn = document.createElement("button");
        this._btn.className = "mapboxgl-ctrl-icon" + " " + this._className;
        this._btn.type = "button";
        this._btn.title = this._title;
        this._btn.onclick = this._eventHandler;

        this._container = document.createElement("div");
        this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
        this._container.appendChild(this._btn);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

/* Event Handlers */
function one(event) {
    alert("Event handler when clicking on \r\n" + event.target.className);
    console.log("event number 1", event);
}

function two(event) {
    alert("Event handler when clicking on \r\n" + event.target.className);
    console.log("event number 2", event);
}

function three(event) {
    alert("Event handler when clicking on \r\n" + event.target.className);
    console.log("event number 3", event);
}

/* Instantiate new controls with custom event handlers */
const ctrlPoint = new MapboxGLButtonControl({
    className: "mapbox-gl-draw_point",
    title: "Draw Point",
    eventHandler: one
});

const ctrlLine = new MapboxGLButtonControl({
    className: "mapbox-gl-draw_line",
    title: "Draw Line",
    eventHandler: two
});

const ctrlPolygon = new MapboxGLButtonControl({
    className: "mapbox-gl-draw_polygon",
    title: "Draw Polygon",
    eventHandler: three
});

/* Add Controls to the Map */
map.addControl(new mapboxgl.NavigationControl(), "top-left");
map.addControl(new PitchToggle({ minpitchzoom: 11 }), "top-left");
map.addControl(ctrlPoint, "bottom-left");
map.addControl(ctrlLine, "bottom-right");
map.addControl(ctrlPolygon, "top-right");
