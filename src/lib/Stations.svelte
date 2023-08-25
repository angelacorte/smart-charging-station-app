<script context="module">
    export const ChargingStationStatus = {
        FREE: "FREE",
        CHARGING: "CHARGING",
        RESERVED: "RESERVED",
        UNAVAILABLE: "UNAVAILABLE"
    }

    export let stations = [{
        provider: "Enel",
        name: "X Charging Station",
        // voltage: ["type2", 20],
        location: [44.14757186518429, 12.23658150624628],
        status: ChargingStationStatus.FREE
    },
        {
            provider: "Enel",
            name: "X WAY Charging Station",
            // voltage: [["ccs", 50], ["type2",43]],
            location: [44.14523265977938, 12.260617176277155],
            status: ChargingStationStatus.FREE
        },
        {
            provider: "Enel",
            name: "X WAY Charging Station",
            // voltage: [20],
            location: [44.14506131431948, 12.25948270076121],
            status: ChargingStationStatus.FREE
        },
        {
            provider: "Enel",
            name: "X Charging Station",
            // voltage: ["type2", 20],
            location: [44.145612588232495, 12.238379768214596],
            status: ChargingStationStatus.CHARGING
        },{
            provider: "Neogy",
            name: "Charging Station",
            // voltage: [["css", 150], ["type2", 22]],
            location: [44.145554034484775, 12.226701099558664],
            status: ChargingStationStatus.FREE
        },{
            provider: "Enel",
            name: "X Charging Station",
            // voltage: [["css", 150]],
            location: [44.139899361053246, 12.240021789211541],
            status: ChargingStationStatus.FREE
        },
        {
            provider: "Evway",
            name: "Charging Station",
            // voltage: [["type2",20]],
            location: [44.14672422842581, 12.218455633179834],
            status: ChargingStationStatus.UNAVAILABLE
        },
        {
            provider: "E.CO",
            name: "Charging Station",
            // voltage: [["type2",20]],
            location: [44.136807640165884, 12.22721036271666],
            status: ChargingStationStatus.RESERVED
        },
        {
            provider: "Enel",
            name: "X Charging Station",
            // voltage: [20],
            location: [44.13775592395241, 12.241067840087673],
            status: ChargingStationStatus.CHARGING
        },
        {
            provider: "Be charge",
            name: "X Charging Station",
            location: [44.13716960989673, 12.269283127921085],
            status: ChargingStationStatus.RESERVED
        },
    ]
</script>

