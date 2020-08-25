import React from 'react';
import './App.css';


import { TweetsComponent } from './tweets'
// Hooks -> useState and useEffect



function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tweet Me</h1>

        <div>
          <TweetsComponent />
        </div>

      </header>
    </div>
  );
}

export default App;
