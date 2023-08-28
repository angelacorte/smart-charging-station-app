<script>
    import Geolocation from "svelte-geolocation";
    import Map from "../../lib/components/Map.svelte";

    // let getPosition = false;
    let coords = [];
</script>


<h1>Charging Stations near your position</h1>

<main>
    <button on:click={() => (Map.getPosition = true)}> Get actual position </button>
    <Geolocation
            getPosition={Map.getPosition}
            bind:coords
            let:loading
            let:success
            let:error
            let:notSupported>
        {#if notSupported}
            Your browser does not support the Geolocation API.
        {:else}
            {#if loading}
                Loading...
            {:else if success}
                <Map {coords} />
            {:else if error}
                An error occurred. {error.code} {error.message}
            {/if}
        {/if}
    </Geolocation>
</main>
