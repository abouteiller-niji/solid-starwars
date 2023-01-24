import {createStore} from "solid-js/store";

const [planetsStore, setPlanets] = createStore({list: []})

const details = {
    planets: {},
}

export const getPlanetDetailsStore = (id) => details.planets[id]

export const createPlanetDetailsStore = (id) => {
    const [planetsDetail, setPlanetsDetail] = createStore()
    setPlanetsDetail({[id]: planetsDetail})
    return planetsDetail
}

export {planetsStore,setPlanets};
