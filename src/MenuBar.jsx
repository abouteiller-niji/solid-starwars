import {A} from "@solidjs/router";

function MenuBar() {
    return (
        <header>
            <nav className="amber black-text">
                <ul>
                    <li>
                        <A  href="/">Accueil</A>
                    </li>
                    <li>
                        <A  href="/planets">Planètes</A>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MenuBar
