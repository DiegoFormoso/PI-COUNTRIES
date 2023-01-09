import './app.css';
import { Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Nav } from './components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Route path="/"  component={Nav}/>      
      <Route exact path="/"  component={Home}/>      
    </div>
  );
}

export default App;


// import React from "react";
// import { Route } from "react-router-dom";
// import Nav from "./components/Nav/Nav";
// import Home from "./components/Home/Home";
// import Ships from "./components/Ships/Ships";
// import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
// import CreateCharacter from "./components/CreateCharacter/CreateCharacter";

// function App() {
//   return (
//     <div>
//       <Route path="/" component={Nav}/>
//       <Route exact path="/"  component={Home}/>
//       <Route exact path="/ships" component={Ships}/>
//       <Route exact path="/character/:id" component={CharacterDetail}/>
//       <Route exact path="/character/create" component={CreateCharacter}/>
//     </div>
//   );
// }
// export default App;

