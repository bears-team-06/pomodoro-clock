import React  from "react";
import PomodoroClock from "./PomodoroClock";
import About from "./About";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Pomodoro Clock</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={PomodoroClock} />
        <Route path="/about/" component={About} />
      </div>
    </Router>
  );
};

export default App;
