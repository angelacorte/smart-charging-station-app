<script context="module">
    export async function load({session}) {
        let token = window.localStorage.getItem("accessToken")
        let user = JSON.parse(window.localStorage.getItem("user"))
        if (!token) {
            window.location.assign('unauthorized')
        }
        return {
            props: {
                name: user.name,
                email: user.email
            }
        };
    }
</script>

<script>
    import { onMount } from 'svelte';

    let email, name;

    onMount(async () => {
        const { props } = await load({}); // Passa un oggetto vuoto poiché load non richiede parametri
        email = props.email;
        name = props.name;
    });
</script>

<h1>Profile</h1>
<p>Hello {name} you are logged in with the email {email}</p>

<div class="container mt-3 align-self-auto">
    <a class="btn col-md-4 p-5" href="map">Click here to see stations nearby your position.</a>
    <br/>
    <a class="btn col-md-4 p-5" href="scanner">Click here to scan the QR code of a charging station.</a>
</div>


