import {writable} from 'svelte/store'

const SERVER_URL = 'localhost/8080';
export const Stations = writable([])
export async function charge(id: number){
    const res = await fetch(SERVER_URL + `/charge/:${id}`)
    const data = await res.json()
    const newStations = data.map((d: { _id: number, _name: string, _provider: string, _state: any, _location: [number, number] }) => {
        return {
            id: d._id,
            name: d._name,
            provider: d._provider,
            state: d._state,
            location: d._location,
        }
    })
    Stations.set(newStations)
}

export async function reserve(id: number){
    const res = await fetch(SERVER_URL + `/reserve/:${id}`)
    const data = await res.json()
    const newStations = data.map((d: { _id: number, _state: any, _location: [number, number] }) => {
        return {
            id: d._id,
            state: d._state,
            location: d._location,
        }
    })
    Stations.set(newStations)
}

export async function fetchStations(){
    const res = await fetch(SERVER_URL + `/}`)
    const data = await res.json()
    const newStations = data.map((d: { _id: number, _state: any, _location: [number, number] }) => {
        return {
            id: d._id,
            state: d._state,
            location: d._location,
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