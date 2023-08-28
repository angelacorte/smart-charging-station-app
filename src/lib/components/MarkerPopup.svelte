<script>
    import {onMount} from "svelte";

    export let station;
    let address = ""
    const API_KEY = "AIzaSyDCXOG2GJZJYPPhGPwWTvpC6rM97XgJ_5A"

    onMount(() => {
        // Qui puoi chiamare la funzione per tradurre le coordinate in indirizzo
        translateCoordinatesToAddress();
    });
    async function translateCoordinatesToAddress() {
        try {
            let coords = station.location
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}`
            );
            const data = await response.json();
            console.log(data)
            // Estrai l'indirizzo dalla risposta
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
    <p>Status is {station.status}</p>
    <p>Address is "{address}"</p>
    <br/>
    {#if station.status === "FREE"}
        <div>
            <a class="btn p-" href="reserve/{station.id}">Reserve this charging station.</a>
       </div>
    {/if}
</div>
