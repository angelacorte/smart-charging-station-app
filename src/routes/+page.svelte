<script>
    import Login from "$lib/Login.svelte";
        import Register from '$lib/Register.svelte';

        // Redirection to /profile
        function redirectToHome() {
        window.location.assign('/home')
    }
</script>

<h1>Welcome to Smart Charging Stations!</h1>

<Login on:success={redirectToHome} />
