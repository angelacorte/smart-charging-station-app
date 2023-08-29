<script>
    import {onMount} from "svelte";

    export let station;
    let address = ""

    onMount(() => {
        translateCoordinatesToAddress();
    });
    async function translateCoordinatesToAddress() {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${station.position[0]}&lon=${station.position[1]}`
            );
            const data = await response.json();
            if (data.display_name) {
                address = data.address.road + " " + data.address.house_number + " " + data.address.town;
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    }
</script>

<div style="width:100%;text-align:center;font-weight:600">
    <p>{station.provider} {station.name}</p>
    <p>Status is {station.state}</p>
    <p>Address is "{address}"</p>
    <br/>
    {#if station.state === "FREE"}
        <div>
            <a class="btn p-" href="reserve/{station.id}">Reserve</a>
       </div>
    {/if}
</div>
