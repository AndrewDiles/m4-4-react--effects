import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import GlobalStyles from './GlobalStyles';
import Home from './Home';
import Game from './Game';

function App(props) {
  // const refIndex = React.useRef(null);
  // React.useEffect(() => {
  //   ref.current.focus();
  // }, []);
  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game 
          // refIndex = {refIndex}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
