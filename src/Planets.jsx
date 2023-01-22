import {A} from "@solidjs/router";
import {starWarsApiBaseUrl} from "./constants";
import {createResource, createSignal, For} from "solid-js";
import {lastPath} from "./helper";
import {planetsStore, setPlanets} from "./store";

function Planets() {
    const getPlanets = async () => {
        if (planetsStore) {
            return planetsStore
        }
        const response = await fetch(`${starWarsApiBaseUrl}/planets`)
        const data = await response.json()
        const newPlanets = data.results.map(item => {
            const {url, ...props} = item
            const id = lastPath(url)
            return {...props, id}
        })
        setPlanets(newPlanets)
        return newPlanets
    }

    const [planets] = createResource(getPlanets);
    return (
        <div className="container amber lighten-5">
            <div className="row">
                <div className="col s12">
                    <span>{planets.loading && "Chargement en cours…"}</span>
                    <h5>Liste des planètes :</h5>
                    <div className="collection">
                        <For each={planets()}>{(planet, i) => (
                            <A class="collection-item amber lighten-4 black-text" href={`/planets/${planet.id}`}>
                                {planet.name}
                            </A>
                        )}</For>
                    </div>
                    {planets.error && <h6>Oops… quelque chose s'est mal passé :-(</h6>}
                    </div>
                </div>
            </div>
    )
}

export default Planets
