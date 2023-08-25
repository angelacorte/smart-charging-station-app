<script>
  import Geolocation from "svelte-geolocation";
  import Map from './lib/Map.svelte';

  let getPosition = false;
  let coords = [];
</script>

<main>
  <button on:click={() => (getPosition = true)}> Get actual location </button>
  <Geolocation
          getPosition={getPosition}
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
