<script>

    import { createEventDispatcher } from 'svelte';

    // Dispatcher for future usage in /index.svelte
    const dispatch = createEventDispatcher();

    // Variables bound to respective inputs via bind:value
    let email;
    let password;
    let name;
    let error;

    const register = async () => {
        // Reset error from previous failed attempts
        error = undefined;

        try {
            // POST method to src/routes/auth/register.js endpoint
            const result = await fetch('http://localhost:5050/auth/signup', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    name
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let json = await result.json()
            if (result.ok) {
                dispatch('success');
                window.localStorage.setItem("email", json.user.email)
                window.localStorage.setItem("accessToken", json.accessToken)
                window.localStorage.setItem("refreshToken", json.refreshToken)
                window.localStorage.setItem("user", JSON.stringify(json.user))
            } else {
                error = 'An error occured';
            }
        } catch (err) {
            console.log(err);
            error = 'An error occured';
        }
    };
</script>

<h1>Register</h1>
<input type="text" name="name" placeholder="Enter your name" bind:value={name} />
<input type="email" name="email" placeholder="Enter your email" bind:value={email} />
<input type="password" name="password" placeholder="Enter your password" bind:value={password} />
{#if error}
    <p>{error}</p>
{/if}
<button class="btn" on:click={register}>Register</button>
