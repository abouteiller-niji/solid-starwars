import {lastPath} from "./helper";
import {starWarsApiBaseUrl} from "./constants";
import {createResource, Show} from "solid-js";
import {A, useParams} from "@solidjs/router";
import dayjs from "dayjs";
import {createPlanetDetailsStore, getPlanetDetailsStore, setPlanets} from "./store";

function Planet() {
    const params = useParams();
    const getPlanet = async () => {
        let planetDetailStore = getPlanetDetailsStore(params.id)
        let value = planetDetailStore && planetDetailStore[params.id]
        if (value) {
            return value
        }
        console.log("id",params.id)
        const response = await fetch(`${starWarsApiBaseUrl}/planets/${params.id}`)
        const data = await response.json()
        const { films, ...props } = data
        const filmIds = films.map(url => lastPath(url))
        console.log("filmIds", filmIds)
        const planetInfo = { ...props, filmIds }
        createPlanetDetailsStore(params.id)
        setPlanets({[params.id]: planetInfo})
        return planetInfo
    }

    const [planet] = createResource(() => params.id, getPlanet)

    return (
        <div className="container amber lighten-5">
            {planet.loading && <strong>Chargement en cours…</strong>}
            <Show
                when={planet()} keyed>
                <div className="row">
                    <div className="col s12">
                        <h5>Détails de la planète :</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input readOnly type="text" id="name" value={planet().name} />
                                <label className="active" htmlFor="name">Nom :</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input readOnly type="text" id="created" value={dayjs(planet().created).format('D/MM/YYYY')}/>
                                <label className="active" htmlFor="created">Date de création :</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input readOnly type="text" id="population" value={planet().population}/>
                                <label className="active" htmlFor="population">Population :</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input readOnly type="text" id="climate" value={planet().climate}/>
                                <label className="active" htmlFor="climate">Climat :</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input readOnly type="text" id="diameter" value={planet().diameter} />
                                <label className="active" htmlFor="diameter">Diamètre :</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <div id="films" className="collection">
                                    {planet().filmIds.map(filmId => (
                                        <A class="collection-item amber lighten-4 black-text" href={`/films/${filmId}`}>{filmId}</A>
                                    ))}
                                </div>
                                <label className="active" htmlFor="films">Films associés :</label>
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
        </div>
    )
}

export default Planet

