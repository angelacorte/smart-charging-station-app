<script>
    import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'

    let scanning = false

    let html5Qrcode

    async function load({session}) {
        let user = JSON.parse(window.localStorage.getItem("user"))
        if (!user) {
            window.location.assign('/unauthorized')
        }
        return {
            props: {
                ok: true
            }
        }
    }

    onMount(async () => {
        const {props} = await load({});
        if(props.ok){
            init()
        }
    });

    function init() {
        html5Qrcode = new Html5Qrcode('reader')
    }

    export function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            onScanSuccess,
            onScanFailure
        )
        scanning = true
    }

    export async function stop() {
        await html5Qrcode.stop()
        scanning = false
    }

    function onScanSuccess(decodedText, decodedResult) {
        const shouldNavigate = confirm(`Code matched = ${decodedText}. Do you want to navigate to charging page?`);
        if (shouldNavigate) {
            stop();
            window.location.assign(`/charging/${decodedText}`);
        }else{
            window.location.assign(`/`);
        }
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`)
    }

</script>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    reader {
        width: 90%;
        min-height: 400px;
        background-color: black;
    }
</style>

<h1>QR code scanning</h1>

<main>
    <reader id="reader"/>
    {#if scanning}
        <button on:click={stop}>stop</button>
    {:else}
        <button on:click={start}>start</button>
    {/if}
</main>


