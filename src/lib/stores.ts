import {writable} from 'svelte/store'
import {createEventDispatcher} from "svelte";


const AKKA_SERVER = 'http://localhost:8080';
const EXPRESS_SERVER = 'http://localhost:5050';
// const dispatch = createEventDispatcher();
export const Stations = writable([])
export const FavouriteStations = writable([])
export async function charge(requestBody: { userId: string, chargingStationId: number}){
    try{
        const response = await fetch(AKKA_SERVER + '/charge', {
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
    const res = await fetch(AKKA_SERVER + `/chargingstations`)
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
        let response = await fetch(AKKA_SERVER + '/reserve-station', {
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

export const ChargingStationStatus = {
    FREE: "FREE",
    CHARGING: "CHARGING",
    RESERVED: "RESERVED",
    UNAVAILABLE: "UNAVAILABLE"
}

export async function addFavourite(requestBody: { userId: string, chargingStationId: number }) {
    try {
        let response = await fetch(EXPRESS_SERVER + '/addFavourite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        if (response.status === 200) {
            document.dispatchEvent(new Event("updateFavourites"))
            return response.ok;
        }
    } catch (err) {
        console.log(err);
        alert('An error occured ' + err)
    }
}

export async function removeFavourite(requestBody: { userId: string, chargingStationId: number }) {
    try {
        let response = await fetch(EXPRESS_SERVER + '/removeFavourite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        if (response.status === 200) {
            document.dispatchEvent(new Event("updateFavourites"))
            return response.ok;
        }
    } catch (err) {
        console.log(err);
        alert('An error occured ' + err)
    }
}