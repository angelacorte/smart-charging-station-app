<script>
    import {onMount} from "svelte";
    import FaRegStar from 'svelte-icons/fa/FaRegStar.svelte'
    import FaStar from 'svelte-icons/fa/FaStar.svelte'
    import {fetchStations, Stations, addFavourite, removeFavourite} from "../stores.ts";
    import {load} from "../../routes/home/+page.svelte";

    export let station;
    let address = ""

    export let favStations = []

    export async function bindStations(){
        await fetchStations()
        favStations.forEach((elem, index) => {
            favStations[index] = $Stations.find(station => {
                return station.id === elem
            });
        })
    }

    export async function addToFavourites() {
        let user = JSON.parse(window.localStorage.getItem("user"))
        let res = await addFavourite({
            userId: user._id,
            chargingStationId: station.id
        })
        console.log("res ", res)

        if (res){
            console.log("yes")
            user.chargingStations.push(station.id)
            window.localStorage.setItem("user", JSON.stringify(user))
            await updateFavourites()
        }
    }

    export async function removeFromFavourites() {
        let user = JSON.parse(window.localStorage.getItem("user"))
        let res = await removeFavourite({
            userId: user._id,
            chargingStationId: station.id
        })
        console.log("res ", res)
        if (res) {
            console.log("yes")
            user.chargingStations = user.chargingStations.filter(id => id !== station.id);
            window.localStorage.setItem("user", JSON.stringify(user))
            await updateFavourites()
        }
    }

    onMount(async () => {
        await translateCoordinatesToAddress();
        await updateFavourites()
    });

    async function updateFavourites(){
        const { props } = await load({}); // Passa un oggetto vuoto poiché load non richiede parametri
        favStations = props.stations;
        await bindStations()
    }
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

<div style="width:100%;text-align:center;font-weight:600" >
    {#if favStations.some(favStation => favStation.id === station.id)}
        <div style="color: orange; width: 32px; height: 32px" on:click={removeFromFavourites}><FaStar></FaStar></div>
    {:else }
        <div style="color: orange; width: 32px; height: 32px" on:click={addToFavourites}><FaRegStar></FaRegStar></div>
    {/if}
    <p>{station.provider} {station.name} ({station.voltage} kW)</p>
    <p>Status is {station.state}</p>
    <p>Address is "{address}"</p>
    <br/>
    {#if station.state === "FREE"}
        <div>
            <a class="btn p-" href="reserve/{station.id}">Reserve</a>
       </div>
    {/if}
</div>
