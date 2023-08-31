import {writable} from 'svelte/store'

const SERVER_URL = 'http://localhost:8080';
export const Stations = writable([])
export async function charge(requestBody: { userId: string, chargingStationId: number}){
    const response = await fetch(SERVER_URL + '/charge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    if (response.ok) {
        alert('Charging is available.');
        window.location.assign("/home")
    } else {
        alert('Something went wrong.');
    }
}

export async function fetchStations(){
    const res = await fetch(SERVER_URL + `/chargingstations`)
    const data = await res.json()
    const newStations = data.map((d: { id: number, name: string, position: {latitude: number, longitude: number}, provider: string, state: string, voltage: number }) => {
        return {
            id: d.id,
            name: d.name,
            position: [d.position.latitude , d.position.longitude],
            provider: d.provider,
            state: d.state,
            voltage: d.voltage,
        }
    })
    Stations.set(newStations)
}

export async function reserve(requestBody: { userId: string, chargingStationId: number}){
    console.log("req ", requestBody)

    const response = await fetch(SERVER_URL + '/reserve-station', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    if (response.ok) {
        alert('Charging station reserved.');
        window.location.assign("/home")
    } else {
        alert('Something went wrong.');
    }
}

export const ChargingStationStatus = {
    FREE: "FREE",
    CHARGING: "CHARGING",
    RESERVED: "RESERVED",
    UNAVAILABLE: "UNAVAILABLE"
}