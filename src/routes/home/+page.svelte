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

<div class="container">
    <a class="btn" href="map">See stations nearby your position.</a>
    <br/>
    <br/>
    <a class="btn" href="scanner">Scan the QR code of a charging station.</a>
</div>
