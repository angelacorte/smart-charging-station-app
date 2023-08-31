<script>
    import { page } from '$app/stores';
    import '../../../app.css'
    import {reserve} from "../../../lib/stores";

    let id = $page.params.id;

    function askReserve() {
        let user = JSON.parse(window.localStorage.getItem("user"))
        reserve({
            userId: user._id,
            chargingStationId: id
        })
    }
</script>

<h1>Reserve page</h1>

<h3>Reserving station ID: {id}</h3>

{#if id !== undefined}
    <p>Do you want to reserve this charging station?</p>
    <button class="btn" on:click={askReserve}>Yes</button>
{:else}
    <p>Charging station not found</p>
{/if}