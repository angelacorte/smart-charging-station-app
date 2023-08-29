import {writable} from 'svelte/store'

const SERVER_URL = 'http://localhost:8080';
export const Stations = writable([])
export async function charge(id: number){
    const res = await fetch(SERVER_URL + `/charge/:${id}`)
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

export async function reserve(id: number){
    const res = await fetch(SERVER_URL + `/reserve/:${id}`)
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

export const ChargingStationStatus = {
    FREE: "FREE",
    CHARGING: "CHARGING",
    RESERVED: "RESERVED",
    UNAVAILABLE: "UNAVAILABLE"
}