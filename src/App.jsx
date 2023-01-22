import MenuBar from "./MenuBar";
import {Route, Routes} from "@solidjs/router";
import Intro from "./Intro";
import Planets from "./Planets";
import Planet from "./Planet";

function App() {
  return (
      <div className="amber-text">
          <h1 className="center-align">Star Wars</h1>
          <MenuBar/>
          <main className="section amber lighten-4 black-text">
              <Routes>
                  <Route path="/" component={Intro} />
                  <Route path="/planets" component={Planets} />
                  <Route path="/planets/:id" component={Planet} />
              </Routes>
          </main>
      </div>
  );
}

export default App;
