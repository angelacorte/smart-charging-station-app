<script>
    import { onMount } from 'svelte';
    import * as L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import { stations, ChargingStationStatus } from './Stations.svelte';
    import { redMarker, blueMarker, orangeMarker, greenMarker } from './Markers.svelte';

    export let coords;

    let map;

    function createMap(container) {
        let m = L.map(container).setView([coords[1], coords[0]], 17);
        L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
                attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
          &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
                subdomains: 'abcd',
                maxZoom: 23,
            }
        ).addTo(m);
        L.marker([coords[1], coords[0]])
            .addTo(m)
            .bindPopup('you are here')
            .openPopup();

        stations.forEach(station => {
            let icon
            switch(station.status) {
                case ChargingStationStatus.FREE:
                    icon = greenMarker;
                    break;
                case ChargingStationStatus.CHARGING:
                    icon = orangeMarker;
                    break;
                case ChargingStationStatus.RESERVED:
                    icon = blueMarker;
                    break;
                case ChargingStationStatus.UNAVAILABLE:
                    icon = redMarker;
                    break;
            }
            L.marker(station.location, {icon: icon}).addTo(m).bindPopup(station.provider + " " + station.name + "\nStatus is " + station.status);
        })

        return m;
    }

    let mapContainer;

    onMount(() => {
        map = createMap(mapContainer);
    });

    function resizeMap() {
        if (map) {
            map.invalidateSize();
        }
    }
</script>

<svelte:window on:resize={resizeMap} />

<h3>Charging Stations near your position</h3>
<div
    id="map"
    bind:this={mapContainer}
    style="height:600px;width:600px">
</div>
