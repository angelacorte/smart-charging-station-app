<script>
    import { page } from '$app/stores';

    let id = $page.params.id;

    function startCharging() {
        console.log(`send request for charging car at the station with id ` + id);
    }
</script>

<h1>Charging page</h1>

<h3>Charging station ID: {id}</h3>

{#if id !== undefined}
    <p>Do you want to start charging your car at this charging station?</p>
    <button on:click={startCharging}>Yes</button>
{:else}
    <p>Charging station not found</p>
{/if}