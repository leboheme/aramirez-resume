import React, {useEffect, useState} from 'react';
import './App.css';
import './css/style.css';
import Title from "./components/Title";
import Footer from "./components/Footer";
import GameArea from "./components/GameArea";
import Terminal from "./components/Terminal";
import intro from './data/intro.json';
import {EventsService, GameEvent, GameEventType} from "./game/Events";

function App() {
  const [terminalItems, setTerminalItems] = useState(intro);
  useEffect(() => {
    EventsService.subscribe(GameEventType.Pick, (event: GameEvent) => {
      const jsonPath = `./data/${event.value}.json`
      const data = require(`${jsonPath}`)

      setTerminalItems(data);
    });
  }, []);

  return (
    <div className="App">
      <Title/>
      <div className="frame-box">
        <GameArea/>
        <Terminal items={terminalItems}/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
