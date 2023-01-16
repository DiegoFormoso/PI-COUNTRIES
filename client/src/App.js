import './app.css';
import { Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Nav } from './components/Nav/Nav';
import CountryCardDetail from './components/CountryCardDetail/CountryCardDetail';
import { ActivityCreate } from './components/ActivityCreate/ActivityCreate';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <div className="App">
      <Route exact path = "/" component={LandingPage}/>
      <Route path = "/home"  component={Nav}/>
      <Route path ="/home"  component={Home}/>      
      <Route exact path ="/home/countries/:id"  component={CountryCardDetail}/>  
      <Route exact path ="/home/activities/create" component={ActivityCreate}/>
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

