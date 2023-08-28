<script>
    import {onMount} from 'svelte';
    import * as L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import { stations } from '../Stations.svelte';
    import {createMarker} from "../Markers.svelte"
    export let getPosition = false;
    export let mapContainer;
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
            .bindPopup('You are here.')
            .openPopup();

        stations.forEach(station => {
            createMarker(station).addTo(m)
        })
        return m;
    }

    onMount(() => {
        map = createMap(mapContainer);
    });

    export function resizeMap() {
        if (map) {
            map.invalidateSize();
        }
    }
</script>


<svelte:window on:resize={resizeMap} />
<div
        id="map"
        bind:this={mapContainer}
        style="height:600px;width:600px">
</div>
