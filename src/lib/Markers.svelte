<script context="module">

    import * as L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import redIcon from '../static/red-icon.png';
    import orangeIcon from '../static/orange-icon.png';
    import blueIcon from '../static/blue-icon.png';
    import greenIcon from '../static/green-icon.png';
    import {ChargingStationStatus} from "$lib/stores.ts";
    import MarkerPopup from "$lib/components/MarkerPopup.svelte";

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


    export function createMarker(station) {
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
        let marker = L.marker(station.location, {icon: icon})
        bindPopup(marker, (m) => {
            let c = new MarkerPopup({
                target: m,
                props: {
                    station
                }
            })
            return c
        });
        return marker
    }


    // Create a popup with a Svelte component inside it and handle removal when the popup is torn down.
    // `createFn` will be called whenever the popup is being created, and should create and return the component.
    function bindPopup(marker, createFn) {
        let popupComponent;
        marker.bindPopup(() => {
            let container = L.DomUtil.create('div');
            popupComponent = createFn(container);
            return container;
        });

        marker.on('popupclose', () => {
            if(popupComponent) {
                let old = popupComponent;
                popupComponent = null;
                // Wait to destroy until after the fadeout completes.
                setTimeout(() => {
                    old.$destroy();
                }, 500);

            }
        });
    }
</script>
