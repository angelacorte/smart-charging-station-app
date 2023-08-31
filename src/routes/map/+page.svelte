<script>
    import Geolocation from "svelte-geolocation";
    import Map from "../../lib/components/Map.svelte";
    import {onMount} from "svelte";

    let coords = [];
    async function load({session}) {
        let user = JSON.parse(window.localStorage.getItem("user"))
        if (!user) {
            window.location.assign('/unauthorized')
        }
    }

    onMount(async () => {
        await load({});
    });
</script>

<h1>Charging Stations near your position</h1>

<main>
    <button class="btn" on:click={() => (Map.getPosition = true)}> Get actual position </button>
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
