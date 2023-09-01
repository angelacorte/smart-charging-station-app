<script context="module">
    export async function load({session}) {
        let token = window.localStorage.getItem("accessToken")
        let user = JSON.parse(window.localStorage.getItem("user"))
        if (!token) {
            window.location.assign('unauthorized')
        }
        return {
            props: {
                name: user.name,
                stations: user.chargingStations
            }
        };
    }

</script>

<script>
    import { onMount } from 'svelte';
    import {fetchStations, Stations} from "$lib/stores.ts";

    let name;
    let stations = []

    onMount(async () => {
        await fetchStations()
        const { props } = await load({}); // Passa un oggetto vuoto poiché load non richiede parametri
        console.log("props ", props)
        name = props.name;
        stations = props.stations;
        stations.forEach((elem, index) => {
            stations[index] = $Stations.find(station => {
                return station.id === elem
            });
        })
        console.log("stations ", stations)
    });
</script>

<h1>Profile</h1>
<h2>Welcome {name}!</h2>

<div class="container">
    <a class="btn" href="map">See stations nearby your position.</a>
    <br/>
    <br/>
    <a class="btn" href="scanner">Scan the QR code of a charging station.</a>
</div>


<h3>Charging stations of interest</h3>
{#if stations.length > 0}
    <ul>
        {#each stations as s}
            <li>
                <a style="color: #397367"  href="charge/{s.id}">{s.name} {s.provider}</a>
                <br/>
                <br/>
            </li>
        {/each}
    </ul>

{:else }
    <p>There are no charging stations marked as favourite.</p>
    <p>Add more!</p>
{/if}