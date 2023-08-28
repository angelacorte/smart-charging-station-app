<script>
    export let station;
</script>

<div style="width:100%;text-align:center;font-weight:600">
    <p>{station.provider} {station.name}</p>
    <p>Status is {station.status}</p>
    <br/>
    {#if station.status === "FREE"}
        <div>
            <a class="btn p-" href="reserve/{station.id}">Reserve this charging station.</a>
       </div>
    {/if}
</div>
