<script>
    import '../app.css'
    import { onMount } from "svelte";

    // Show mobile icon and display menu
    let showMobileMenu = false;

    let isLogged = false
    function logout() {
        window.localStorage.clear();
        isLogged = false
        window.location.assign('/')
    }

    // Mobile menu click event handler
     const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

    // Media match query handler
    const mediaQueryHandler = e => {
        // Reset mobile state
        if (!e.matches) {
            showMobileMenu = false;
        }
    };

    // Attach media query listener on mount hook
    onMount(() => {
        isLogged = window.localStorage.length > 0
        const mediaListener = window.matchMedia("(max-width: 767px)");

        mediaListener.addListener(mediaQueryHandler);
    });

    // List of navigation items
    const navItems = [
        { label: "Smart Charging Stations", href: "/home" },
        { label: "Map", href: "/map" },
        { label: "QR Scanning", href: "/scanner" },
    ];
</script>

<nav>
    <div class="inner">
        <div on:click={handleMobileIconClick} class={`mobile-icon${showMobileMenu ? ' active' : ''}`}>
            <div class="middle-line"></div>
        </div>
        <ul class={`navbar-list${showMobileMenu ? ' mobile' : ''}`}>
            {#if isLogged}
                {#each navItems as item}
                    <li>
                        <a href={item.href}>{item.label}</a>
                    </li>
                {/each}
                <li>
                    <a on:click={logout}>Logout</a>
                </li>
            {:else}
                <li>
                    <a href="/">Smart Charging Stations</a>
                </li>
            {/if}

        </ul>
    </div>
</nav>

<slot/>