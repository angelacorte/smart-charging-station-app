<script>
    import '../app.css'
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="/">Smart Charging Stations</a>
        <!--<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>-->
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="map">Map</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="scanner">QR Code Scanner</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<slot/>
<!--
<div id="app"></div>
<script type="module" src="/src/main.ts"></script>-->