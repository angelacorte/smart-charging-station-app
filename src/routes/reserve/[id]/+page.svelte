<script>
    import { page } from '$app/stores';
    // import {reserve} from "$lib/stores.ts";

    let id = $page.params.id;

    function askReserve() {
        console.log(`send request for reserving the station with id ` + id);
        // reserve(id)
    }
</script>

<h1>Reserve page</h1>

<h3>Reserving station ID: {id}</h3>

{#if id !== undefined}
    <p>Do you want to reserve this charging station?</p>
    <button on:click={askReserve}>Yes</button>
{:else}
    <p>Charging station not found</p>
{/if}