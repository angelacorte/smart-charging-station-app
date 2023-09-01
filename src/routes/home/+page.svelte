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
    import {fetchStations, removeFavourite, Stations} from "$lib/stores.ts";
    import IoMdRemoveCircle from 'svelte-icons/io/IoMdRemoveCircle.svelte'

    let name;
    export let favStations = []


    export async function removeFromFavourites(stationId) {
        let user = JSON.parse(window.localStorage.getItem("user"))
        let res = await removeFavourite({
            userId: user._id,
            chargingStationId: stationId
        })
        if (res) {
            user.chargingStations = user.chargingStations.filter(id => id !== stationId);
            window.localStorage.setItem("user", JSON.stringify(user))
            await updateFavourites()
        }
    }
    async function updateFavourites(){
        const { props } = await load({}); // Passa un oggetto vuoto poiché load non richiede parametri
        favStations = props.stations;
        await bindStations()
    }
    export async function bindStations(){
        await fetchStations()
        favStations.forEach((elem, index) => {
            favStations[index] = $Stations.find(station => {
                return station.id === elem
            });
        })
    }

    onMount(async () => {
        await fetchStations()
        const { props } = await load({}); // Passa un oggetto vuoto poiché load non richiede parametri
        name = props.name;
        favStations = props.stations;
        await bindStations()
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


<h3>Charging stations of interest:</h3>
{#if favStations.length > 0}
    <ul>
        {#each favStations as s}
            <li style="display: flex; align-items: center;">
                <p style="color: darkred; width: 32px; height: 32px" on:click={removeFromFavourites(s.id)}><IoMdRemoveCircle></IoMdRemoveCircle></p>
                <a style="color: #397367; flex: 1;" href="/charging/{s.id}">{s.name} {s.provider} is {s.state}</a>
            </li>
        {/each}
    </ul>

{:else }
    <p>There are no charging stations marked as favourite.</p>
    <p>Add more!</p>
{/if}