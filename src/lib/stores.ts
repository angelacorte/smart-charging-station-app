import {writable} from 'svelte/store'

const SERVER_URL = 'http://localhost:8080';
export const Stations = writable([])
export async function charge(requestBody: { userId: string, chargingStationId: number}){
    try{
        const response = await fetch(SERVER_URL + '/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        alert(await response.text());
        if (response.status === 200) {
            window.location.assign("/home")
        }
    }catch (err) {
        console.log(err);
        alert('An error occured ' + err)
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
    try{
        let response = await fetch(SERVER_URL + '/reserve-station', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        /*console.log("resp ", await response)
        console.log("text ", await response.text())
        console.log("json ", await response.json())*/
        alert(await response.text());
        if (response.status === 200) {
            window.location.assign("/home")
        }
    }catch (err) {
        console.log(err);
        alert('An error occured ' + err)
    }
}

export const ChargingStationStatus = {
    FREE: "FREE",
    CHARGING: "CHARGING",
    RESERVED: "RESERVED",
    UNAVAILABLE: "UNAVAILABLE"
}