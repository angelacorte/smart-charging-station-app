<script>
    import { page } from '$app/stores';
    import {charge, reserve} from "$lib/stores.ts";

    export let id = $page.params.id;

    function startCharging() {
        let user = JSON.parse(window.localStorage.getItem("user"))
        charge({
            userId: user._id,
            chargingStationId: parseInt(id)
        })
    }
</script>

<h1>Charging page</h1>

<h3>Charging station ID: {id}</h3>

{#if id !== undefined}
    <p>Do you want to start charging your car at this charging station?</p>
    <button class="btn" on:click={startCharging}>Yes</button>
{:else}
    <p>Charging station not found</p>
{/if}