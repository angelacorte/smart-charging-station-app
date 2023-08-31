<script>
    import '../app.css'
    import Login from "$lib/components/Login.svelte";
    import Register from '$lib/components/Register.svelte';

    // Redirection to /profile
    function redirectToHome() {
    window.location.assign('/home')
    }
</script>

<h1>Welcome to Smart Charging Stations!</h1>

<Login on:success={redirectToHome} />
<p>Or</p>
<Register on:success={redirectToHome} />
