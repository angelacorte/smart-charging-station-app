<script context="module">

    import * as L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import redIcon from '../../static/red-icon.png';
    import orangeIcon from '../../static/orange-icon.png';
    import blueIcon from '../../static/blue-icon.png';
    import greenIcon from '../../static/green-icon.png';

    export let redMarker = L.icon({
        iconUrl: redIcon,
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [5, 5], // point of the icon which will correspond to marker's location
        popupAnchor:  [15, 5] // point from which the popup should open relative to the iconAnchor
    });
    export let blueMarker = L.icon({
        iconUrl: blueIcon,
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [5, 5], // point of the icon which will correspond to marker's location
        popupAnchor:  [15, 5] // point from which the popup should open relative to the iconAnchor
    });

    export let greenMarker = L.icon({
        iconUrl: greenIcon,
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [5, 5], // point of the icon which will correspond to marker's location
        popupAnchor:  [15, 5] // point from which the popup should open relative to the iconAnchor
    });
    export let orangeMarker = L.icon({
        iconUrl: orangeIcon,
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [5, 5], // point of the icon which will correspond to marker's location
        popupAnchor:  [15, 5] // point from which the popup should open relative to the iconAnchor
    });
</script>